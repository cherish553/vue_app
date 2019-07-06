const meta = { auth: false }
const System = {
  path: '/System',
  name: 'System',
  meta,
  component: () => import('@/page/system'),
  children: (pre => [
    // 登录
    { path: 'Login', name: `${pre}Login`, component: () => import('@/page/system/login') },
    // 忘记密码
    { path: 'RetrievePass', name: `${pre}RetrievePass`, component: () => import('@/page/system/retrievePass') }
  ])('System-')
}
export default System
