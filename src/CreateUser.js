import React, { useRef, useCallback, useContext } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';

const CreateUser = () => {
  const [, dispatch] = useContext(UserDispatch);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  })
  const { username, email } = form;
  const nextId = useRef(3);

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
    reset();
  }, [dispatch, username, email, reset]);

  return (
    <div>
      <input
        name="username"
        placeholder="username"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="email"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>Create</button>
    </div>
  )
}

export default React.memo(CreateUser);