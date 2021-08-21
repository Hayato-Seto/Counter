import React, { useState, useEffect } from 'react';
import Counter from './counter';
import CounterSetting from './counterSetting';
import { Value, HandleFunc } from './values'
import { initial } from './initial';

const values: Value[] = initial.valueArray

// type Props = {
//   parts: number
// }

const CounterList: React.FC = () => {

  const [titleState, setTitleState] = useState(initial.titleArray)
  const [countState, setCountState] = useState(initial.countArray)
  const [probability, setProbability] = useState(initial.countArray)
  const [interval, setInterval] = useState(initial.intervalArray)
  const [amount, setAmount] = useState(2)
  const [trust, setTrust] = useState(101)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy: Array<string> = [...titleState]
    copy[Number(e.target.name)] = e.target.value
    setTitleState(copy)
  }

  const handleCountUp = (id: number) => {
    const copy: Array<number> = [...countState]
    copy[id] += 1
    setCountState(copy)
    setProbability(initial.standard(copy))
    if (trust !== 101) { setInterval(initial.interval(copy, trust)) }
  }
  const handleCountDown = (id: number) => {
    const copy: Array<number> = [...countState]
    copy[id] -= 1
    setCountState(copy)
    setProbability(initial.standard(copy))
    if (trust !== 101) { setInterval(initial.interval(copy, trust)) }
  }
  const handleCountReset = (id: number) => {
    const copy: Array<number> = [...countState]
    copy[id] = 0
    setCountState(copy)
    setProbability(initial.standard(copy))
    if (trust !== 101) { setInterval(initial.interval(copy, trust)) }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value))
  }

  const handleTrustChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrust(parseInt(e.target.value))
  }

  useEffect(() => {
    if (values.length > amount) {
      values.splice(amount, values.length - amount)
      setTitleState(initial.stringReset(titleState, amount, ''))
      setCountState(initial.numberReset(countState, amount, 0))
      setProbability(initial.standard(initial.numberReset(countState, amount, 0)))
      setInterval(initial.interval(initial.numberReset(countState, amount, 0), trust))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  useEffect(() => {
    if (trust === 101) {
      setInterval(initial.intervalArray)
    } else {
      setInterval(initial.interval(countState, trust))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trust])

  for (let i = 0; i < amount; i++) {
    const part: Value = {
      id: i,
      title: titleState[i],
      count: countState[i],
      probability: probability[i],
      interval: interval[i]
    }
    values.splice(i, 1, part)
  }

  const handleFunc: HandleFunc = {
    handleTitleChange: handleTitleChange,
    handleCountUp: handleCountUp,
    handleCountDown: handleCountDown,
    handleCountReset: handleCountReset
  }

  return (
    <div className='ctrList'>
      <div className='ctrSetting'>
        <CounterSetting
          handleAmountChange={handleAmountChange}
          handleTrustChange={handleTrustChange} />
      </div>
      <div className='ctrs'>
        {
          values.map(value => (
            <Counter
              key={value.id}
              value={value}
              handleFunc={handleFunc}
            />
          ))
        }
      </div>
    </div>
  );
}

export default CounterList;
