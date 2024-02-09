import { createRouter, createWebHistory } from 'vue-router'
 
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
  
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/protask',
      name: 'protask',
  
      component: () => import('../views/appView.vue')
    },
    {
      path: '/addtask',
      name: 'addtask',
  
      component: () => import('../views/AddTask.vue')
    },
    {
      path: '/profile',
      name: 'profile',
  
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/bestuser',
      name: 'bestuser',
  
      component: () => import('../views/ViewBestUser.vue')
    },
    {
      path: '/reward',
      name: 'reward',
  
      component: () => import('../views/ViewReward.vue')
    },
    {
      path: '/editprofile',
      name: 'editprofile',
  
      component: () => import('../views/ViewEditProfile.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
