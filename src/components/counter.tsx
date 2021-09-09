import React from 'react';
import '../styles/components/counter.css'
import { Value, HandleFunc } from '../initial';

type Props = {
  value: Value
  handleFunc: HandleFunc
}

const Counter: React.FC<Props> = ({ value, handleFunc }) => {
  return (
    <div className='counter'>
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
        <button
          className='up'
          onClick={() => { handleFunc.handleCountUp(value.id) }}
        >UP</button>
        <button
          className='down'
          onClick={() => { handleFunc.handleCountDown(value.id) }}
        >DOWN</button>
        <button
          className='reset'
          onClick={() => { handleFunc.handleCountReset(value.id) }}
        >RESET</button>
      </div>
      <div className='btnValue'>
        <span className='spCount'>Count：{value.count}</span>
        <span className='spProb'>確率：{value.probability}%</span>
        <span className='spInterval'>区間：{value.intervalLow}% ~ {value.intervalHigh}%</span>
      </div>
    </div>
  );
}

export default Counter;
