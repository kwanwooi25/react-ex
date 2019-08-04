import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

const Counter = () => {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => dispatch({ type: 'INCREMENT' });
  const onDecrease = () => dispatch({ type: 'DECREMENT' });

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>plus</button>
      <button onClick={onDecrease}>minus</button>
    </div>
  )
}

export default Counter;