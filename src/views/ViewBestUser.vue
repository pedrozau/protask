<script setup>
 import Menu from '@/components/Menu.vue';
import { useUserStore } from '@/store/user';
import { onMounted, ref, watch } from 'vue';

const _name = ref('')

const name = localStorage.getItem("_name")
_name.value = name


 const store = useUserStore()
const users = ref([])

onMounted( async ()=>{

   const best =  await store.bestuserpoints()
   
    users.value = best 
})








 


</script>
<template>
    <Menu/>
   
    <div>
        <div class="bg-white rounded-lg shadow-lg p-6">


                    <h2 class="text-2xl font-semibold mb-4" >Top Usuários</h2>
                    <div v-if="users.length == 0">
        <div class="h-screen bg-white">
  <div class="flex justify-center items-center h-full">
    <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
  </div>
  </div>
       </div>

       <div v-for="(user, index) in users" :key="index">
    <div :class="{ 'bg-slate-100': user.name === _name, 'bg-white': user.name !== _name }" class="flex items-center border-b py-4 rounded p-5">
        <div class="mr-4 relative">
            <img :src="user.avatarUrl ? user.avatarUrl : 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_960_720.jpg'" alt="Avatar" class="w-10 h-10 rounded-full">
            <span v-if="user.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            <span v-else class="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
            <h3 class="text-lg font-semibold">{{ user.name }}</h3>
            <p class="text-gray-600">{{ user.email }}</p>
        </div>
        <div class="ml-auto">
            <p class="text-lg font-semibold">{{ user.points }}</p>
            <p class="text-gray-600">Pontos</p>
        </div>
        <div v-if="index === 0">
            <span class="text-yellow-500 text-2xl">&#9733;</span> <!-- Primeiro Lugar -->
        </div>
        <div v-else-if="index === 1">
            <span class="text-gray-500 text-2xl">&#9733;</span> <!-- Segundo Lugar -->
        </div>
        <div v-else-if="index === 2">
            <span class="text-orange-500 text-2xl">&#9733;</span> <!-- Terceiro Lugar -->
        </div>
    </div>
</div>

                        
                    </div>

                </div>
    

</template>


