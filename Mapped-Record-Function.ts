const t = {
    k1: null,
    k2: null,
}

// simple 

type A = Record<keyof typeof t, (...args : any[]) => any>;
const a: A = {
    k1: () => null,
    k2: (arg1: number) => null,
    k3: 1, // err now
}

a.k1()
a.k2()  // err now, but no parameter tips


// complex
// !! Record<Exclude<keyof U, keyof T>, never>
function wrapperFN<T>() {
    return <U extends Record<keyof T, (...args: any[]) => void>>(o: U & Record<Exclude<keyof U, keyof T>, never>) => o
}
const b = wrapperFN<typeof t>()({
    k1: () => null,
    k2: (arg1: number) => null,
    k3: 1, // err now
});
b.k1()
b.k2() // err now, with parameter tips
