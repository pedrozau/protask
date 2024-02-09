<script setup>
import { ref } from "vue";
import Signnup from '@/components/Signup.vue';
import { useUserStore } from "@/store/user";

const user_email = ref('')
const user_password = ref('')


const useUser = useUserStore()

const send_data =  async () => {
  
   const data = {
     email: user_email.value,
     password: user_password.value
    }
    
   await useUser.auth(data)
  
}


 
</script>

<template>
     
     <div class="bg-gray-100 h-screen flex items-center justify-between">
        
        <div id="banner_logo" class="m-40" >
           <img  src="../assets/Color logo - no background.svg">
        </div>

        <div id="login" class="mr-40">
            <div class="bg-white p-8 rounded shadow-md w-96">
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
            <p class="m-5 text-center"> <span class="text-2xl">Login</span> |  <a href="/signup" class="hover:text-blue-400">Signnup</a> </p>
        </div>
        </div>

     </div>



</template>