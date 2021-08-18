import { lazy } from 'react';

const Home = lazy(() => import('./views/home/Home'));
const Signin = lazy(() => import('./views/auth/Signin'));
const Signup = lazy(() => import('./views/auth/Signup'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Payment = lazy(() => import('./views/payment/Payment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/signin', name: 'Signin', component: Signin },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/payment', name: 'Payment', component: Payment },
];

export default routes;
