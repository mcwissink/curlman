export default {
  config: {
    verbose: true,
    url: 'http://httpbin.org/bearer',
    header: `"Authorization: Bearer ${CM.EXAMPLE_SECRET}"`,
  },
  responseHandler: (response) => {
    CM.EXAMPLE_TOKEN = JSON.parse(response).token;
  }
}
