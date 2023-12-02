export default {
    config: {
        url: 'http://httpbin.org/post',
        json: JSON.stringify({
            test: 1,
        }),
    },
    responseHandler: ({ response, session }) => {
        console.log(response);
        session.set("TEST", 1);
    },
}
