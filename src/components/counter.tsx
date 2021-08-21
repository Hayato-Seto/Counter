import React from 'react';
import { Value, HandleFunc } from './values';

type Props = {
  value: Value
  handleFunc: HandleFunc
}

const Counter: React.FC<Props> = ({ value, handleFunc }) => {
  return (
    <div className='btnCom'>
      <div className='btnName'>
        <input
          type='text'
          className='name'
          placeholder='button name'
          name={value.id.toString()}
          value={value.title}
          onChange={handleFunc.handleTitleChange}
        />
      </div>
      <div className='btn'>
        <span><button
          className='up'
          onClick={() => { handleFunc.handleCountUp(value.id) }}
        >UP</button></span>
        <span><button
          className='down'
          onClick={() => { handleFunc.handleCountDown(value.id) }}
        >DOWN</button></span>
        <span><button
          className='reset'
          onClick={() => { handleFunc.handleCountReset(value.id) }}
        >RESET</button></span>
      </div>
      <div className='btnValue'>
        <span className='spCount'>Count：{value.count}</span>
        <span className='spProb'>確率：{value.probability}%</span>
        <span className='spInterval'>区間：{value.interval[0]}% ~ {value.interval[1]}%</span>
      </div>
    </div>
  );
}

export default Counter;
