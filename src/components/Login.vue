<script setup>
import { ref } from "vue";
import Signnup from '@/components/Signup.vue';
import { useUserStore } from "@/store/user";

const user_email = ref('')
const user_password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const useUser = useUserStore()

const send_data =  async () => {
  
    loading.value = true
    
    const data = {
          email: user_email.value,
          password: user_password.value
         }

        const user =  await useUser.auth(data)
        
        if(user) {
            if(user.response.status == 400) {
                loading.value = false
                errorMessage.value = "Email ou  password está incorreto!"
            }else {

                 loading.value = false
            }

        }



      loading.value = false
}


 
</script>

<template>

    <div v-if="loading">

        <div class="h-screen bg-white">
<div class="flex justify-center items-center h-full">
<img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
</div>
</div>
    </div>
     
     <div v-else class="bg-gray-100 h-screen flex md:items-center justify-center md:justify-between">
        
        <div id="banner_logo" class="md:m-40  ">
           <img  src="../assets/Color logo - no background.svg">
        </div>

        <div id="login" class="md:m-32  mt-32 ml-10  mr-10"> 
            
            <div class="bg-white p-8 rounded shadow-md w-96">
                <p class="flex items-center justify-center  text-red-500 ">{{ errorMessage }}</p>
            <h2 class="text-2xl font-semibold mb-4">Login</h2>
            
            <form @submit.prevent="send_data">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" v-model="user_email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                </div>
    
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" v-model="user_password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                </div>
                 
    
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
            </form>
            <p class="m-5 text-center"> <span class="text-2xl">Login</span> |  <a href="#/signup" class="hover:text-blue-400">Signnup</a> </p>
        </div>
        </div>

     </div>



</template>