import React, { useState, useRef, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import './App.css';

const countActiveUsers = users => {
  return users.filter(({ active }) => active).length
}

const App = () => {
  const [users, setUsers] = useState([
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
  ]);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs

  const onChange = useCallback(e => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }, [inputs])

  const nextId = useRef(3);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active: false,
    }
    setUsers(users => [ ...users, user ])
    setInputs({
      username: '',
      email: '',
    })
    nextId.current += 1;
  }, [username, email])

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id))
  }, [])

  const onToggle = useCallback(id => {
    setUsers(users => users.map(user => (
      user.id === id ?
      user = { ...user, active: !user.active } :
      user
    )))
  }, [])

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="App">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <div>Active Users: {count}</div>
    </div>
  );
}

export default App;
