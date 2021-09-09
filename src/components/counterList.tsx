import React from 'react';
import { HandleFunc, Value } from '../initial';
import Counter from './counter';

type Props = {
    values: Array<Value>
    handleFunc: HandleFunc
}

const CounterList: React.FC<Props> = ({ values, handleFunc }) => {

    return (
        <div className='counterList'>
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
    );
}

export default CounterList;
