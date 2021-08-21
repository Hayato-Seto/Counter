import { Value } from './values'

type init = {
    titleArray: string[]
    countArray: number[]
    valueArray: Value[]
    intervalArray: Array<Array<number>>
    standard: (src: Array<number>) => Array<number>
    stringReset: (src: Array<string>, idx: number, ward: string) => Array<string>
    numberReset: (src: Array<number>, idx: number, num: number) => Array<number>
    interval: (src: Array<number>, trust: number) => Array<Array<number>>
}

const values: Value[] = [{
    id: 0,
    title: '',
    count: 0,
    probability: 0,
    interval: [0, 0]
}, {
    id: 1,
    title: '',
    count: 0,
    probability: 0,
    interval: [0, 0]
}
]

function align(num: number): number {
    var a = num * 100000
    a = Math.round(a)
    a = a / 1000
    return a
}

function standard(src: Array<number>): Array<number> {
    var rtn: Array<number> = [...src]
    const total: number = src.reduce((a, b) => a + b, 0)
    if (total > 0) {
        rtn = src.map(a => align(a / total))
        return rtn
    } else {
        return rtn
    }
}

function stringReset(src: Array<string>, idx: number, ward: string): Array<string> {
    var copy = [...src]
    if ((idx < copy.length) && (idx >= 0)) {
        for (let i = idx; i < copy.length; i++) {
            copy[i] = ward
        }
    }
    return copy
}
function numberReset(src: Array<number>, idx: number, num: number): Array<number> {
    var copy = [...src]
    if ((idx < copy.length) && (idx >= 0)) {
        for (let i = idx; i < copy.length; i++) {
            copy[i] = num
        }
    }
    return copy
}

const perdot: number[] = [2.576, 1.96, 1.645, 1.282, 0.674]

function interval(src: Array<number>, trust: number): Array<Array<number>> {
    var a: number = 0
    var b: number = 0
    const probability = standard([...src]).map(a => a / 100)
    var total: number = src.reduce((a, b) => a + b, 0) === 0 ? 1 : src.reduce((a, b) => a + b, 0)
    var rtn: Array<Array<number>> = new Array(probability.length).fill([0, 0])

    for (let i = 0; i < probability.length; i++) {
        var c = align(perdot[trust] * Math.sqrt(probability[i] * (1 - probability[i]) / total)) / 100
        a = align(probability[i] - c)
        b = align(probability[i] + c)
        if (a < 0) {
            a = 0
        }
        if (b > 100) {
            b = 100
        }
        rtn[i] = [a, b]
    }
    return rtn
}

export const initial: init = {
    titleArray: new Array(15).fill(''),
    countArray: new Array(15).fill(0),
    valueArray: values,
    intervalArray: new Array(15).fill([0, 0]),
    standard: standard,
    stringReset: stringReset,
    numberReset: numberReset,
    interval: interval
}