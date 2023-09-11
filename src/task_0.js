/* use javascript
write a sum function which has 3 input last one is optional
expected input:
a: number, b: number, callback?: (result: number) => any | undefined
validate a, b, callback input
if the function has callback use callback to return if no use promise to return the result */

function wrapFunc(logic, callback) {
    if (callback && typeof callback != 'function') {
        throw new Error('callback defined but not as a function')
    }
    const promise = logic()
    if (callback) {
        return Promise.race([
            promise.then((result) => callback(null, result)),
            promise.catch((e) => callback(e)),
        ])
    }
    return promise
}

function sum(a, b, callback) {
    return wrapFunc(async () => {
        if (typeof a != 'number') {
            throw new Error('"a" is not a number')
        }
        if (typeof b != 'number') {
            throw new Error('"b" is not a number')
        }
        return a + b
    }, callback)
}