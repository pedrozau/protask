import { defineStore } from "pinia";
import {ref, watchEffect} from 'vue'
import axios from 'axios'




const Api = axios.create({
    baseURL: ''
})



const _id = localStorage.getItem('_id')
const _token = localStorage.getItem('_token')

Api.defaults.baseURL = 'https://protaskapi.onrender.com'
Api.defaults.headers.common['Authorization'] = 'Bearer '+ _token
Api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'





export const useTaskStore = defineStore('task',() => {
    const tasks = ref([])

    
     
    async function getTask() {

        

        const response = await Api.get('/task/userTask/' + _id)

        tasks.value = response.data
       
        return response.data;

    
        
        

    }


     async function createTask(task,level) {
        
        const data = {
            task,
            level,
            userId: _id
        }

        const response = await Api.post('/task',data)
        
        
        
        return response.data;
     }

     async function taskDone(id,level) {
       
        const data = {
            done: true,
            level: Number(level),
            userId: _id

        }

        const response = await Api.put('/task/' + id, data)

        return response.data;
     }

     async function taskUpdate() {


     }
    

    return {tasks,getTask,createTask,taskDone}
})