import axios from 'axios'
import Qs from 'qs'

function host () {
  if (process.env.NODE_ENV === 'production') {
    return 'http://localhost:8081/'
  } else {
    return 'http://localhost:8081/'
  }
}

const instance = axios.create({
  baseURL: host(),
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 负责 `params` 序列化的函数
  paramsSerializer: (params) => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  console.log(config.params)
  // 在发送请求之前做些什么
  config.params = {
    ...config.params
  }

  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

instance.interceptors.response.use(result => {
  if (result.data.code === 2) {
    alert(result.data.massage)
  } else {
    return result.data.data
  }
}, error => alert(error))

export default instance
