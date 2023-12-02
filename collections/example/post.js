export default {
    config: {
        url: 'http://httpbin.org/post',
        json: JSON.stringify({
            test: 1,
        }),
    },
    responseHandler: console.log,
}
