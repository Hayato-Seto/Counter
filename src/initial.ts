export const trustArray: Array<string> = ["99%", "95%", "90%", "80%", "50%", "区間推定をしない"]

const perdot: number[] = [2.576, 1.96, 1.645, 1.282, 0.674]

function align(num: number): number {
    var a = num * 100000
    a = Math.round(a)
    a = a / 100000
    return a
}

export type Value = {
    id: number,
    title: string,
    count: number,
    probability: number,
    intervalLow: number,
    intervalHigh: number,
}

export type HandleFunc = {
    handleTitleChange: React.ChangeEventHandler<HTMLInputElement>,
    handleCountUp: (count: number) => void,
    handleCountDown: (count: number) => void,
    handleCountReset: (count: number) => void,
}

export type SettingHandleFunc = {
    handleNameChange: React.ChangeEventHandler<HTMLInputElement>,
    handleAmountChange: React.ChangeEventHandler<HTMLInputElement>,
    handleTrustChange: React.ChangeEventHandler<HTMLSelectElement>,
    handlePasswordChange: React.ChangeEventHandler<HTMLInputElement>,
}


export const initialValueArray: Value[] = [{
    id: 0,
    title: '',
    count: 0,
    probability: 0,
    intervalLow: 0,
    intervalHigh: 0,
}, {
    id: 1,
    title: '',
    count: 0,
    probability: 0,
    intervalLow: 0,
    intervalHigh: 0,
}]

export const initialSettingObject = {
    name: "",
    amount: 2,
    trust: 101,
    password: ""
}

export const initialAlert = {
    display: false,
    type: "warning",
    message: "予期していない操作です",
    submessage: ""
}

export function standardAndInterval(src: Array<Value>, trust: number): Array<Value> {
    var n: number = 0, m: number = 0
    const total: number = src.reduce((a, b) => a + b.count, 0) === 0 ? 1 : src.reduce((a, b) => a + b.count, 0)

    const rtn: Array<Value> = src.map(a => {
        const p: number = align(a.count / total)
        if (trust !== 101) {
            const c: number = align(perdot[trust] * Math.sqrt(p * (1 - p) / total))
            n = align(p - c) < 0 ? 0 : align(p - c) * 100
            m = align(p + c) > 1 ? 100 : align(p + c) * 100
        }
        return ({
            id: a.id,
            title: a.title,
            count: a.count,
            probability: p * 100,
            intervalLow: n,
            intervalHigh: m,
        })
    })
    return rtn
}
