/* use javascript
write a function which calls every x ms a function until it gets an expected variable which is true no need variable for this expected variable
every x ms means this is the time have to be between two start
example if interval is 5 sec and first call (which result is not the expected)
 will be running for 1 sec we need wait 4 sec to start the second call

if the callback running more than the interval in this case you can call immediately next time
its enough to use new Date().getTime() no need more precise function it doesnt matter
no need input validation
no need to handle error from callback */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

function duration(date) {
    return new Date().getTime() - date.getTime()
}

async function callInterval0(interval, callback) {
    while(true) {
        const start = new Date()
        if (await callback() === true) {
            return
        }
        const elapsedMs = duration(start)
        elapsedMs < interval && await sleep(interval - elapsedMs)
    }
}

// more accurate solution
async function callInterval1(interval, callback) {
    let mainStart = new Date()
    while(true) {
        const start = new Date()
        if (await callback() === true) {
            return
        }
        const elapsedMs = duration(start)
        if (elapsedMs < interval) {
            await sleep(interval - duration(mainStart) % interval)
        } else {
            mainStart = new Date()
        }
    }
}