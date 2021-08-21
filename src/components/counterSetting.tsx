import React from 'react';

type Props = {
    handleAmountChange: React.ChangeEventHandler<HTMLInputElement>
    handleTrustChange: React.ChangeEventHandler<HTMLSelectElement>
}

const CounterSetting: React.FC<Props> = ({ handleAmountChange, handleTrustChange }) => {
    return (
        <div>
            <div className='setting'>
                <span className='spAmount'>
                    カウンターの数
                    <input
                        type='number'
                        name='amount'
                        min='2'
                        max='15'
                        onChange={handleAmountChange}
                    />
                </span>
                <span className='spTrust'>
                    信頼区間
                    <select name='trust' onChange={handleTrustChange}>
                        <option value='101'>区間推定をしない</option>
                        <option value='0'>99%</option>
                        <option value='1'>95%</option>
                        <option value='2'>90%</option>
                        <option value='3'>80%</option>
                        <option value='4'>50%</option>
                    </select>
                </span>
            </div>
        </div>
    );
}

export default CounterSetting;