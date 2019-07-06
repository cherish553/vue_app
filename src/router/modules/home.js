const meta = { auth: false }
const Home = {
  path: '/Home',
  name: 'Home',
  meta,
  component: () => import('@/page/home'),
  children: (pre => [
    // 首页
    { path: 'Home', name: `${pre}Home`, component: () => import('@/page/home/home') },
    // 个人中心
    { path: 'UserInfo', name: `${pre}UserInfo`, component: () => import('@/page/home/userInfo') }
  ])('Home-')
}
export default Home
