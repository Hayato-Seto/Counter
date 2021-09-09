import React, { useState } from 'react';
import '../styles/pages/create.css'
import Alert from 'react-bootstrap/Alert';
import CounterList from '../components/counterList';
import CounterSetting from '../components/counterSetting';
import { firestore } from '../Firebase'
import { collection, doc, setDoc } from "firebase/firestore";
import {
    initialAlert, initialSettingObject, initialValueArray, standardAndInterval,
    HandleFunc, SettingHandleFunc
} from '../initial';
import Graph from '../components/graph';

const Create: React.FC = () => {
    const [values, setValues] = useState(initialValueArray)
    const [setting, setSetting] = useState(initialSettingObject)
    const [global, setGlobal] = useState(false)
    const [alert, setAlert] = useState(initialAlert)

    /* 関数の定義 */
    // counterListの関数
    const handleFunc: HandleFunc = {
        handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            values[Number(e.target.name)].title = e.target.value
            setValues(standardAndInterval(values, setting.trust))
        },
        handleCountUp: (id: number) => {
            values[id].count += 1
            setValues(standardAndInterval(values, setting.trust))
        },
        handleCountDown: (id: number) => {
            if (values[id].count >= 1) {
                values[id].count -= 1
                setValues(standardAndInterval(values, setting.trust))
            }
        },
        handleCountReset: (id: number) => {
            values[id].count = 0
            setValues(standardAndInterval(values, setting.trust))
        },
    }
    // counterSettingの関数
    const settingHandleFunc: SettingHandleFunc = {
        handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setting.name = e.target.value
            setSetting(setting)
        },
        handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setting.amount = parseInt(e.target.value)
            setSetting(setting)

            if (values.length > setting.amount) {
                values.splice(setting.amount, values.length - setting.amount)
                setValues(standardAndInterval(values, setting.trust))

            } else if (values.length < setting.amount) {
                for (let i = values.length; i < setting.amount; i++) {
                    values.push({
                        id: i,
                        title: '',
                        count: 0,
                        probability: 0,
                        intervalLow: 0,
                        intervalHigh: 0
                    })
                }
                setValues(standardAndInterval(values, setting.trust))
            }
        },
        handleTrustChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            setting.trust = parseInt(e.target.value)
            setSetting(setting)

            setValues(standardAndInterval(values, setting.trust))
        },
        handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setting.password = e.target.value
            setSetting(setting)
        },
    }

    /* firebaseの設定 */
    // 保存の関数
    async function save() {
        if (setting.name !== "" && setting.name !== undefined && setting.name !== null) {
            const setObject = Object.assign({}, ...values.map((a, b) => ({ [`index${b}`]: a })))
            try {
                await setDoc(doc(collection(firestore, "counterValue"), setting.name), {
                    values: setObject,
                    setting: setting,
                    global: global,
                    update: false
                });
                setAlert({
                    display: true, type: "info", message: "保存に成功しました！",
                    submessage: "保存したCounterはこちらから編集出来ます -> "
                })
            } catch (e) {
                const eMes: string = String(e.code) === "permission-denied"
                    ? "すでに同じ名前のCounterが存在するか、予期していない操作が行われました。" : String(e.code)
                setAlert({
                    display: true, type: "danger", message: "保存に失敗しました",
                    submessage: eMes
                })
            }
        } else {
            setAlert({
                display: true, type: "danger", message: "保存に失敗しました",
                submessage: "Counterの名前を設定してください"
            })
        }
    }

    //renderされるJSX
    return (
        <div className='create'>
            {alert.display &&
                <Alert
                    variant={alert.type}
                    dismissible
                    onClose={() => { setAlert(initialAlert) }}>
                    <Alert.Heading>{alert.message}！</Alert.Heading>
                    <p>
                        {alert.submessage}
                        {alert.type === "info" &&
                            <Alert.Link href={`/detail/${setting.name}`}>
                                {setting.name}
                            </Alert.Link>}
                    </p>
                </Alert>}
            <div className="save">
                <button onClick={save}>保存する！</button>
                <label id="global-checkbox">
                    <input
                        type="checkbox"
                        id="global-checkbox"
                        checked={global}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setGlobal(!global) }}
                    />公開して保存
                </label>
            </div>
            <CounterSetting handleFunc={settingHandleFunc} />
            <CounterList values={values} handleFunc={handleFunc} />
            <Graph values={values} />
        </div>
    );
}

export default Create;