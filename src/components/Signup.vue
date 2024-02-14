<script setup>

import {ref} from 'vue'
import { useUserStore } from '@/store/user';
import JSConfetti from 'js-confetti' 



const name = ref('')
const email = ref('')
const password = ref('')
const confirpassword = ref('')
const  message = ref('')
const  sucess = ref('')
const  useUser =  useUserStore() 

const jsconfetti = new JSConfetti()

const handleForm = async () => {


   if(password.value !== confirpassword.value) {
    
      message.value = 'Passward são diferentes!'
      
   }else {
     message.value = ''
     const data = {
    name:  name.value,
    email: email.value,
    password: password.value
   }
   
    name.value = ""
    email.value = ""
    password.value = ""
    confirpassword.value = ""

   //jsconfetti.addConfetti()
    sucess.value = `${data.name} foi cadastro com sucesso!`
 
  const user = await  useUser.createAccount(data)
  console.log(user)
   }

   
 

  
  
  
}


</script>


<template>

    <div class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <p class="text-center text-red-500 font-bold">{{ message }}</p>
            <p class="text-center text-green-500 font-bold">{{ sucess }}</p>
        <h2 class="text-2xl font-semibold mb-4">Signup</h2>
        
        <form @submit.prevent="handleForm">
            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" id="name" v-model="name" name="name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
            </div>

            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email"  v-model="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" v-model="password" id="password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
            </div>

            <div class="mb-4">
                <label for="confirm-password" class="block text-gray-700 text-sm font-bold mb-2">Confirme Password</label>
                <input type="password" v-model="confirpassword" id="confirm-password" name="confirm-password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
            </div>

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Signup</button>
        </form>

        <p class="m-5 text-center"> <a href="/" class="hover:text-blue-400">Login</a> |  <span href="" class="text-2xl">Signnup</span> </p>
    </div>

    </div>
    
</template>