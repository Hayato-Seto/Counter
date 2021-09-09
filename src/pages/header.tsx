import React, { useState } from 'react';
import '../styles/pages/header.css'
import { Link, useHistory } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

const Header: React.FC = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [alert, setAlert] = useState(false)

    const handleAlert = () => {
        async function existenceCheck() {
            if (name !== "" && name !== undefined) {
                const snap = await getDoc(doc(collection(firestore, "counterValue"), name))
                if (snap.exists() && snap.data() !== undefined) {
                    if (history.location.pathname.slice(0, 8) === "/detail/") {
                        history.push("/notFound")
                    }
                    history.push(`detail/${name}`)
                } else {
                    setAlert(true)
                }
            } else {
                setAlert(true)
            }
        }
        existenceCheck()

    }

    return (
        <div className='headMenu'>
            <Link className="title" to="/">Counter</Link>
            <span className="partition">|</span>
            <input
                type='text'
                className='name'
                placeholder='Counterを検索する'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
            />
            <button className="serch" onClick={handleAlert}>検索</button>
            <span className="partition">|</span>
            <Link className="toHome" to="/">HOME</Link>
            <span className="partition">|</span>
            <Link className="toCreate" to="/create">新規作成</Link>
            <span className="partition">|</span>
            <span className={`check${alert ? "Active" : ""}`}>
                <button className="alertButton" onClick={() => { setAlert(false) }}>✕</button>
                Counterが見つかりません
            </span>
        </div>
    );
}

export default Header;