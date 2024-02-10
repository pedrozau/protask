import { createRouter, createWebHashHistory} from 'vue-router'
 
import Login from '../views/LoginView.vue'

const router = createRouter({

  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
  
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/protask',
      name: 'Protask',
  
      component: () => import('../views/appView.vue')
    },
    {
      path: '/addtask',
      name: 'Addtask',
  
      component: () => import('../views/AddTask.vue')
    },
    {
      path: '/profile',
      name: 'profile',
  
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/bestuser',
      name: 'Bestuser',
  
      component: () => import('../views/ViewBestUser.vue')
    },
    {
      path: '/reward',
      name: 'Reward',
  
      component: () => import('../views/ViewReward.vue')
    },
    {
      path: '/editprofile',
      name: 'Editprofile',
  
      component: () => import('../views/ViewEditProfile.vue')
    }
    
  ]
})

export default router
