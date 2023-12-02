export default {
    config: {
        url: 'http://httpbin.org/bearer',
        header: `"Authorization: Bearer ${process.env.SECRET}"`,
    },
    responseHandler: ({ response, session }) => {
        session.set('TOKEN', JSON.parse(response).token)
    }
}
