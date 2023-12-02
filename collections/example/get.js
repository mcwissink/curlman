export default {
    config: {
        url: `http://httpbin.org/get?test=${process.env.TEST}`,
    },
    responseHandler: console.log,
}
