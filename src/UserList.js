import React from 'react';

const User = React.memo(({ user, onRemove, onToggle }) => {
  const { username, email, id, active } = user;
  
  return (
    <li>
      <b
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => onToggle(id)}
      >{ username }</b>
      <span>({ email })</span>
      <button onClick={() => onRemove(id)}>
        Delete
      </button>
    </li>
  )
})

const UserList = ({ users, onRemove, onToggle }) => {
  return (
    <ul>
      {
        users.map(user => (
          <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))
      }
    </ul>
  )
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users,
);