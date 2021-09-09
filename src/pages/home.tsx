import React, { useState, useEffect } from 'react';
import '../styles/pages/home.css'
import { query, where, limit, collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { firestore } from '../Firebase';
import { Value } from '../initial';
import Graph from '../components/graph';

type globalCounter = {
    name: string
    values: Array<Value>
}

const Home: React.FC = () => {
    const [globalCounter, setGlobalCounter] = useState<Array<globalCounter>>([])

    /* firebaseの設定 */

    /* 初回mount時のみ実行 */
    //firebaseからデータを持ってきてStateに保存
    useEffect(() => {
        async function getCounter() {
            const rtn: Array<globalCounter> = []
            const q = query(collection(firestore, "counterValue"), where("global", "==", true), limit(3));
            const snaps = await getDocs(q)
            snaps.forEach((doc) => {
                if (doc.exists() && doc.data !== undefined) {
                    var d: Array<Value> = []
                    for (let i = 0; i < Object.keys(doc.data().values).length; i++) {
                        const c: Value = doc.data().values[`index${i}`]
                        d[i] = c
                    }
                    rtn.push({ name: doc.id, values: d })
                }
            })
            setGlobalCounter(rtn)
        }
        getCounter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='home'>
            <div className="content">新規作成・保存しないで使う</div>
            <Link className="toCreate" to="/create">新規での作成保存、または保存しないで使う場合はこちらから！</Link>
            <div className="description">保存の際はCounterの名前、あいことば（任意）の設定が必要です</div>
            <div className="description">あいことばを設定しなければだれでも編集できるようになります</div>
            <div className="description">保存したCounterを呼び出すにはページ上部からCounterの名前を入力することで呼び出せます</div>
            <div className="description">また公開して保存するとみんなのCounterの欄に表示されることがあります</div>
            <div className="content">みんなのCounter</div>
            <div className="description">公開して保存するとここに表示されます</div>
            <div className="description">あいことばを共有してみんなで編集しよう！</div>
            {globalCounter.map(value => (
                <div className="globalCounter" key={value.name}>
                    <Link className="toDetail" to={`/detail/${value.name}`}>{value.name}</Link>
                    <Graph values={value.values} />
                </div>
            ))}
        </div>
    );
}

export default Home;