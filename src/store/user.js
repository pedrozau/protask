import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

import axios from 'axios'

const Api = axios.create({
  baseURL: ''
})



const _id = window.localStorage.getItem('_id')
const _token = window.localStorage.getItem('_token')





Api.defaults.baseURL = 'https://protaskapi.onrender.com'
Api.defaults.headers.common['Authorization'] = 'Bearer ' + _token
Api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'





export const useUserStore = defineStore('user', () => {
  const user = ref([])
  const bestuser = ref([])
  const rewarduser = ref([])

  async function auth(data) {

    try {

      const response = await Api.post('/user/auth', data)

      localStorage.setItem('_token', response.data.access_token)
      localStorage.setItem('_id', response.data.user.id)
      localStorage.setItem('_name', response.data.user.name)


      if (response.status == 400) {

        return response.data


      } else {

        window.location = '#/protask'
        
      }




      return response.data

    } catch (e) {
      return e
    }

  }


  async function getUser() {
    const response = await Api.get('/user/account/' + _id)
    user.value = response.data

    return response.data

  }


  async function createAccount(data) {
    const response = await Api.post('/user/account', data)

      localStorage.setItem('_token', response.data.access_token)
      localStorage.setItem('_id', response.data.user.id)
      localStorage.setItem('_name', response.data.user.name)

      window.location = '#/protask'

     return response.data

  }


  async function bestuserpoints() {
    const response = await Api.get('/user/best_user_points')
    bestuser.value = response.data

    return response.data

  }


  async function createReward(reward, points) {

    const data = {
      award: reward,
      points: Number(points),
      userId: _id

    }
    const response = await Api.post('/reward/create', data)
  }


  async function getReward() {

    const response = await Api.get('/reward/user/' + _id)

    rewarduser.value = response.data

    return response.data
  }

  async function reward(id) {
    const data = {
      rewardId: id,
      userId: _id
    }

    const response = await Api.post('/reward/award', data)

    return response.data

  }

  async function online() {

    const response = await Api.put('/user/online/' + _id)

    return response.data
  }

  async function offline() {

    const response = await Api.put('/user/offline/' + _id)

    return response.data
  }

  async function updateUser(data) {
       

     const response = await Api.put('/user/account/' + _id , data)

     return response.data
  }

  return {
    user,
    auth,
    createAccount,
    getUser,
    bestuser,
    bestuserpoints,
    createReward,
    getReward,
    rewarduser,
    reward,
    offline,
    online,
    updateUser
  }
})