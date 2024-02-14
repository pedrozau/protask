<script setup>
import Menu from '@/components/Menu.vue' 
import { useUserStore } from '@/store/user'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router';

const useUser = useUserStore()

const user = ref(null)

onMounted( async () => {
   const users =  await useUser.getUser()
   user.value =  users
    
})


const logout = ()=> {
    window.location = '/'
    window.localStorage.removeItem('_token')
    window.localStorage.removeItem('_id')
     
}






</script>
<template>
    <main>
        <Menu/>
        
        <div class="container mx-auto p-8">

            <div v-if="!user">
        <div class="h-screen bg-white">
  <div class="flex justify-center items-center h-full">
    <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
  </div>
  </div>
       </div>

            <div v-else class="bg-white rounded-lg shadow-lg p-6">
            <!-- Avatar e Informações -->
            <div class="flex items-center mb-4">
                <img :src=" `https://protaskapi.onrender.com/user/avatar/${user.avatarUrl}` " alt="Avatar" class="w-16 h-16 rounded-full mr-4">
                <div>
                    <h2 class="text-xl font-semibold">{{ user.name }}</h2>
                    <p class="text-gray-600">{{ user.email }}</p>
                </div>
            </div>
            <!-- Pontos -->
            <div class="mb-4">
                <p class="text-gray-600">Pontos: {{ user.points }}</p>
            </div>
            <!-- Botões de Ação -->
            <div class="flex justify-between">
                 <RouterLink to="/editprofile">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Editar Perfil</button>
                 </RouterLink>
                
                <button @click="logout" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
            </div>
        </div>
        </div>

    </main>
</template>