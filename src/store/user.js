import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'

const Api = axios.create({
    baseURL: ''
})



const _id = localStorage.getItem('_id')
const _token = localStorage.getItem('_token')


Api.defaults.baseURL = 'https://protaskapi.onrender.com'
Api.defaults.headers.common['Authorization'] = 'Bearer '+ _token
Api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'





export const useUserStore = defineStore('user',() => {
   const user = ref([])
   const bestuser = ref([])
   const rewarduser = ref([])

   async function  auth(data) {
      const response = await Api.post('/user/auth',data)

        localStorage.setItem('_token',response.data.access_token)
        localStorage.setItem('_id',response.data.user.id)
        localStorage.setItem('_name',response.data.user.name)
     
         window.location = '/protask'
   }


   async function getUser() {
     const response = await Api.get('/user/account/' + _id)
       user.value = response.data

       return response.data
       
   }


   async function createAccount(data) {
       const response = await Api.post('/user/account',data)
       
   }


   async  function bestuserpoints() {
    const response = await Api.get('/user/best_user_points')
        bestuser.value = response.data

        return response.data
      
   }


   async  function createReward(reward,points) {
         
       const  data = {
          award: reward,
          points: Number(points),
          userId: _id

       }
          const response = await Api.post('/reward/create',data)
   }


   async function getReward() {

     const response = await Api.get('/reward/user/' + _id)

      rewarduser.value = response.data

      return response.data
   }

   async function  reward(id) {
       const data = {
         rewardId: id,
         userId: _id
       }
      
       const response = await Api.post('/reward/award',data)

       return response.data

   }

   return {user,auth,createAccount,getUser,bestuser,bestuserpoints,createReward,getReward,rewarduser,reward}
})