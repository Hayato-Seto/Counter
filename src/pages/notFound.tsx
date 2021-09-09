import React from 'react';
import '../styles/pages/notFound.css'
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className='notFound'>
            <div>Not Found</div>
            <Link className="toHome" to="/">homeに戻る</Link>
            <svg viewBox="0 0 80 30">
                <path id="target" d="M 0,100 C 0,70 20,40 100,0" fill="none" />
                <path id="targetBack" d="M 100,0 C 180,40 200,70 200,100" fill="none" />
                <text x="-95" y="15" fontSize="10" fill="#19beff">
                    N
                    <animateMotion id="N" dur="0.5s" begin="0s;bd.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bN" dur="0.5s" begin="d.end+2s" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-85" y="15" fontSize="10" fill="#19beff">
                    o
                    <animateMotion id="o1" dur="0.5s" begin="N.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bo1" dur="0.5s" begin="bN.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-75" y="15" fontSize="10" fill="#19beff">
                    t
                    <animateMotion id="t" dur="0.5s" begin="o1.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bt" dur="0.5s" begin="bo1.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-95" y="25" fontSize="10" fill="#19beff">
                    F
                    <animateMotion id="F" dur="0.5s" begin="t.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bF" dur="0.5s" begin="bt.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-85" y="25" fontSize="10" fill="#19beff">
                    o
                    <animateMotion id="o2" dur="0.5s" begin="F.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bo2" dur="0.5s" begin="bF.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-75" y="25" fontSize="10" fill="#19beff">
                    u
                    <animateMotion id="u" dur="0.5s" begin="o2.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bu" dur="0.5s" begin="bo2.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-65" y="25" fontSize="10" fill="#19beff">
                    n
                    <animateMotion id="n2" dur="0.5s" begin="u.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bn2" dur="0.5s" begin="bu.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
                <text x="-55" y="25" fontSize="10" fill="#19beff">
                    d
                    <animateMotion id="d" dur="0.5s" begin="n2.end" fill="freeze">
                        <mpath xlinkHref="#target" />
                    </animateMotion>
                    <animateMotion id="bd" dur="0.5s" begin="bn2.end" fill="freeze">
                        <mpath xlinkHref="#targetBack" />
                    </animateMotion>
                </text>
            </svg>
        </div>
    );
}

export default NotFound;