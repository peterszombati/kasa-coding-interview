# [kasa.com](https://kasa.com) nodejs coding tasks
more details in the js files
### first task
```js
function wrapFunc(logic, callback) {
    if (callback && typeof callback != 'function') {
        throw new Error('callback defined but not as a function')
    }
    return callback ? logic()
        .then((result) => callback(null, result))
        .catch((e) => callback(e)) : logic()
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
```
### second task
```js
function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

function duration(startMs) {
    return Date.now() - startMs
}

async function callInterval0(interval, callback) {
    while(true) {
        const start = Date.now()
        if (await callback() === true) {
            return
        }
        const elapsedMs = duration(start)
        elapsedMs < interval && await sleep(interval - elapsedMs)
    }
}

// more accurate solution
async function callInterval1(interval, callback) {
    let mainStart = Date.now()
    while(true) {
        const start = Date.now()
        if (await callback() === true) {
            return
        }
        const elapsedMs = duration(start)
        if (elapsedMs < interval) {
            await sleep(interval - duration(mainStart) % interval)
        } else {
            mainStart = Date.now()
        }
    }
}
```