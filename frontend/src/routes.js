import { lazy } from 'react';

const Home = lazy(() => import('./views/home/Home'));
const Signin = lazy(() => import('./views/auth/Signin'));
const Signup = lazy(() => import('./views/auth/Signup'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Exchange = lazy(() => import('./views/dashboard/Exchange'))
const Terms = lazy(() => import('./views/dashboard/Terms'))
const Privacy = lazy(() => import('./views/dashboard/Privacy'))
const Payment = lazy(() => import('./views/payment/Payment'))
const PersionalSetting = lazy(() => import('./views/setting/PersionalSetting'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/signin', name: 'Signin', component: Signin },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/exchange', name: 'Exchange', component: Exchange },
  { path: '/payment', name: 'Payment', component: Payment },
  { path: '/setting', name: 'Setting', component: PersionalSetting },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/privacy', name: 'Privacy', component: Privacy },
];

export default routes;
