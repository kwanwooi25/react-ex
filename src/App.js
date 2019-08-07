import React, { useReducer, useMemo, createContext } from 'react';
import produce from 'immer';
import CreateUser from './CreateUser';
import UserList from './UserList';
import './App.css';

window.produce = produce;

const countActiveUsers = users => {
  return users.filter(({ active }) => active).length
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'Kwanwoo',
      email: 'kwanwoo.jeong@gmail.com',
      active: false,
    },
    {
      id: 2,
      username: 'Yeonjung',
      email: 'yeonjung.im@gmail.com',
      active: false,
    },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { users: [ ...state.users, action.user ] }
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return { users: state.users.filter(({ id }) => id !== action.id) };
    default:
      throw new Error('unhandled input')
  }
}

export const UserDispatch = createContext(null);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <UserDispatch.Provider value={[state, dispatch]}>
      <CreateUser />
      <UserList />
      <div>Active Users: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
