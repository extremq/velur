import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://192.168.56.1:8080' })

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { api }
