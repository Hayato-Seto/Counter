import React, { useState, useEffect } from 'react';
import '../styles/pages/detail.css'
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';
import CounterList from '../components/counterList';
import Alert from 'react-bootstrap/esm/Alert';
import {
    initialAlert, initialSettingObject, initialValueArray, standardAndInterval, trustArray,
    HandleFunc, Value
} from '../initial';
import Graph from '../components/graph';

const Detail: React.FC = () => {
    const [values, setValues] = useState(initialValueArray)
    const [setting, setSetting] = useState(initialSettingObject)
    const [global, setGlobal] = useState(false)
    const [alert, setAlert] = useState(initialAlert)
    const [password, setPassword] = useState("")

    const { name } = useParams<{ name: string, }>();

    const trustOption: string = trustArray[setting.trust !== 101 ? setting.trust : 5]

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

    /* firebaseの設定 */

    /* 初回mount時のみ実行 */
    //firebaseからデータを持ってきてStateに保存
    useEffect(() => {
        async function loading() {
            const snap = await getDoc(doc(collection(firestore, "counterValue"), name))
            if (snap.exists() && snap.data !== undefined) {
                const data = snap.data()

                var d: Array<Value> = []
                for (let i = 0; i < Object.keys(data.values).length; i++) {
                    const c: Value = data.values[`index${i}`]
                    d[i] = c
                }
                setValues(d)
                typeof (data.setting) === typeof (setting) && setSetting(data.setting)
                typeof (data.global) === typeof (global) && setGlobal(data.global)

            } else {
                setAlert({
                    display: true, type: "danger", message: "Counterが見つかりません",
                    submessage: "名前を間違えていませんか？　ネットワークは安定していますか？"
                });
            }
        }
        loading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //firestoreのデータをupdateする関数
    async function save() {
        if (setting.password === "" || setting.password === password) {
            const setObject = Object.assign({}, ...values.map((a, b) => ({ [`index${b}`]: a })))
            try {
                await setDoc(doc(collection(firestore, "counterValue"), setting.name), {
                    values: setObject,
                    setting: setting,
                    global: global,
                    update: true
                });
                setAlert({
                    display: true, type: "info", message: "保存に成功しました！",
                    submessage: ""
                })
            } catch (e) {
                const eMes: string = String(e.code) === "permission-denied"
                    ? "予期していない操作が行われました。" : String(e.code)
                setAlert({
                    display: true, type: "danger", message: "保存に失敗しました",
                    submessage: eMes
                })
            }
        } else {
            setAlert({
                display: true, type: "danger", message: "保存に失敗しました",
                submessage: "あいことばが違います。"
            })
        }
    }

    return (
        <div className='detail'>
            {alert.display &&
                <Alert
                    variant={alert.type}
                    dismissible
                    onClose={() => { setAlert(initialAlert) }}>
                    <Alert.Heading>{alert.message}！</Alert.Heading>
                    <p>{alert.submessage}</p>
                </Alert>}
            <div className="update">
                <button onClick={save}>保存する！</button>
                <label id="global-checkbox">
                    <input
                        type="checkbox"
                        id="global-checkbox"
                        checked={global}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setGlobal(!global) }}
                    />公開して保存
                </label>
                <input
                    type='text'
                    className='password'
                    placeholder='あいことばを入力'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                />
            </div>
            <div className="setting">
                <span className="name">Counterの名前：{setting.name}</span>
                <span className="trust">信頼区間：{trustOption}</span>
            </div>
            <CounterList values={values} handleFunc={handleFunc} />
            <Graph values={values} />
        </div>
    );
}

export default Detail;