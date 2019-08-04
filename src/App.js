import React, { useReducer, useRef, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import './App.css';

const countActiveUsers = users => {
  return users.filter(({ active }) => active).length
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
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
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: [ ...state.users, action.user ]
      }
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ?
            { ...user, active: !user.active } :
            user
          )
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(({ id }) => id !== action.id)
      }
    default:
      throw new Error('unhandled input')
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(3);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email])

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        />
      <UserList
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
      />
      <div>Active Users: {count}</div>
    </>
  );
}

export default App;
