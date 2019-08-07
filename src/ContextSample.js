import React, { createContext, useContext } from 'react';

const MyContext = createContext('defaultValue');

const Child = () => {
  const text = useContext(MyContext);
  return <div>Hi, {text}!</div>
}

const Parent = ({ text }) => {
  return <Child text={text} />
}

const GrandParent = ({ text }) => {
  return <Parent text={text} />
}

const ContextSample = () => {
  return (
    <MyContext.Provider value="Maaaan">
      <GrandParent />
    </MyContext.Provider>
  )
}

export default ContextSample;