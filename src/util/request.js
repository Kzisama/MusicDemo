// 二次封装axios -- 配置基地址
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3000"
export default axios