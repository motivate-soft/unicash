import React from 'react';

const Home = React.lazy(() => import('./views/home/Home'));
const Signin = React.lazy(() => import('./views/auth/Signin'));
const Signup = React.lazy(() => import('./views/auth/Signup'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/signin', name: 'Signin', component: Signin },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
