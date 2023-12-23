export default {
  async config() {
    return {
      url: 'http://httpbin.org/get',
      header: await Promise.resolve('x-custom-header:example')
    }
  },
}
