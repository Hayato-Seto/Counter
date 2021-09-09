import React from 'react';
import '../styles/components/graph.css'
import { Value } from '../initial';

type Props = {
    values: Array<Value>
}

type SvgValue = {
    probability: number
    high: number
    low: number
}

const graphStandard = (values: Array<Value>, view: number): Array<SvgValue> => {
    var most: number = 0
    var rtn: Array<SvgValue> = []
    for (let i = 0; i < values.length; i++) {
        if (most < values[i].intervalHigh) {
            most = values[i].intervalHigh
        }
        rtn[i] = {
            probability: values[i].probability,
            high: values[i].intervalHigh,
            low: values[i].intervalLow
        }
    }
    most = most === 0 ? 100 : most
    rtn = rtn.map(a => ({
        probability: Math.round(a.probability * view / most),
        high: Math.round(a.high * view / most),
        low: Math.round(a.low * view / most),
    }))
    return rtn
}

const serchMost = (values: Array<Value>): number => {
    var most: number = 0
    for (let i = 0; i < values.length; i++) {
        if (most < values[i].intervalHigh) {
            most = values[i].intervalHigh
        }
    }
    most = most === 0 ? 100 : most

    return most
}

const Axis: React.FC<{ most: number }> = ({ most }) => {
    return (
        <g>
            <text y="8" textAnchor="end" fontSize="8">0</text>
            <text x="125" y="8" textAnchor="end" fontSize="8">{most}％</text>
            <text x="250" y="8" textAnchor="end" fontSize="8">{most * 2}％</text>
            <text x="375" y="8" textAnchor="end" fontSize="8">{most * 3}％</text>
            <text x="500" y="8" textAnchor="end" fontSize="8">{most * 4}％</text>
            <g stroke="black" strokeWidth="1">
                <line
                    y1="9" x2="500" y2="9"
                />
                <line
                    y1="9" y2="18"
                />
                <line
                    x1="500" y1="9" x2="500" y2="18"
                />
                <line
                    x1="250" y1="9" x2="250" y2="15"
                />
                <line
                    x1="125" y1="9" x2="125" y2="15"
                />
                <line
                    x1="375" y1="9" x2="375" y2="15"
                />
            </g>
        </g>
    )
}

//
//
/* ---------------このファイルの本体はここから--------------- */
//
//
const Graph: React.FC<Props> = ({ values }) => {
    const buttonNames: Array<string> = values.map(a => a.title)
    const intervalPoints: Array<SvgValue> = graphStandard(values, 500)
    const graphProbs: Array<number> = intervalPoints.map(a => a.probability)
    const most: number = serchMost(values) / 4

    return (
        <div className='graph'>
            <svg
                viewBox={`-210 0 750 ${values.length * 50 + 20}`}
            >
                <Axis most={most} />
                {buttonNames.map((a, b) => (
                    <text
                        key={b}
                        x="0"
                        y={45 + 50 * b}
                        textAnchor="end"
                        fontSize="15"
                    >
                        {a}：
                    </text>
                ))}
                {graphProbs.map((a, b) => (
                    <rect
                        key={b}
                        x="0"
                        y={25 + 50 * b}
                        width={a}
                        height="30"
                        fill="#56adff"
                    />
                ))}
                {intervalPoints.map((a, b) => {
                    if (a.high !== 0 || a.low !== 0) {
                        return (
                            <g key={b} stroke="red" strokeWidth="2">
                                <line
                                    x1={a.low}
                                    y1={31 + 50 * b}
                                    x2={a.low}
                                    y2={49 + 50 * b}
                                />
                                <line
                                    x1={a.high}
                                    y1={31 + 50 * b}
                                    x2={a.high}
                                    y2={49 + 50 * b}
                                />
                                <line
                                    x1={a.low}
                                    y1={40 + 50 * b}
                                    x2={a.high}
                                    y2={40 + 50 * b}
                                />
                            </g>
                        )
                    } else {
                        return (<g key={b}></g>)
                    }
                })}
            </svg>
        </div>
    );
}

export default Graph;