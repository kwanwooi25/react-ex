import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(({ user }) => {
  const { username, email, id, active } = user;
  const [, dispatch] = useContext(UserDispatch);

  return (
    <li>
      <b
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => dispatch({ type: 'TOGGLE_USER', id })}
      >{ username }</b>
      <span>({ email })</span>
      <button onClick={() => dispatch({ type: 'REMOVE_USER', id })}>
        Delete
      </button>
    </li>
  )
})

const UserList = () => {
  const [ state ] = useContext(UserDispatch);
  return (
    <ul>
      {state.users.map(user => <User user={user} key={user.id} />)}
    </ul>
  )
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users,
);