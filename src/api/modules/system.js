import { http } from '@/axios'
export default {
  // 登录接口
  login: ({ username, password, newPwd }) =>
    http.post(`base/v1/sso/app_login`, { username, password, newPwd }),
  // 获取验证码
  getCode: ({ module = 'changePasswordByMobile', mobile }) =>
    http.post(`base/v1/sms/send_${module}/${mobile}`),
  // 修改密码
  changPwd: ({ code, mobile, password }) => http.post(`base/v1/sso/change_password`, {
    code,
    mobile,
    password
  }),
  // 获取个人用户信息
  getUserInfo: () => http.get('base/v1/user/info'),
  // 我的消息
  postMessage: ({ page, rows }) =>
    http.post(`/message/v1/message/page_my_wjl `, { page, rows })
}
