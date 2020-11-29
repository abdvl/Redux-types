const t = {
    k1: null,
    k2: null,
}

function wrapperFN<T>() {
    return <U extends Record<keyof T, (...args: any[]) => void>>(o: U & Record<Exclude<keyof U, keyof T>, never>) => o
}
const a = wrapperFN<typeof t>()({
    k1: () => null,
    k2: (arg1: number) => null,
    k3: 1, // err now
});
a.k1()
a.k2() // err now
