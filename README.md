# [kasa.com](https://kasa.com) nodejs coding tasks
more details in the js files
### first task
```js
function wrapFunc(logic, callback) {
    if (callback && typeof callback != 'function') {
        throw new Error('callback defined but not as a function')
    }
    return callback ? logic().then((result) => {
        try {
            callback(null, result)
        } catch (e) {}
    }).catch((e) => {
        try {
            callback(e)
        } catch (e) {}
    }) : logic()
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

function duration(date) {
    return new Date().getTime() - date.getTime()
}

async function callInterval(interval, callback) {
    while(true) {
        const start = new Date()
        const result = await callback()
        if (result === true) {
            return
        }
        const elapsedMs = duration(start)
        elapsedMs < interval && await sleep(interval - elapsedMs)
    }
}
```