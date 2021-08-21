export type Value = {
    id: number,
    title: string,
    count: number,
    probability: number,
    interval: Array<number>
}

export type HandleFunc = {
    handleTitleChange: React.ChangeEventHandler<HTMLInputElement>,
    handleCountUp: (count: number) => void,
    handleCountDown: (count: number) => void,
    handleCountReset: (count: number) => void,
}