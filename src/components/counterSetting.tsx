import React from 'react';
import '../styles/components/counterSetting.css'
import { SettingHandleFunc } from '../initial'

type Props = {
    handleFunc: SettingHandleFunc
}

const CounterSetting: React.FC<Props> = ({ handleFunc }) => {
    return (
        <div className='counterSetting'>
            <input
                type='text'
                className='name'
                placeholder='Counter name'
                onChange={handleFunc.handleNameChange}
            />
            <input
                type='text'
                className='password'
                placeholder='あいことば'
                onChange={handleFunc.handlePasswordChange}
            />
            <span>
                カウンターの数
                <input
                    type='number'
                    name='amount'
                    className='amount'
                    min='2'
                    max='15'
                    onChange={handleFunc.handleAmountChange}
                />
            </span>
            <span>
                信頼区間
                <select name='trust' className='trust' onChange={handleFunc.handleTrustChange}>
                    <option value='101'>区間推定をしない</option>
                    <option value='0'>99%</option>
                    <option value='1'>95%</option>
                    <option value='2'>90%</option>
                    <option value='3'>80%</option>
                    <option value='4'>50%</option>
                </select>
            </span>
        </div>
    );
}

export default CounterSetting;