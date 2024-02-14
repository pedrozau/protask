<script setup>
import Menu from '@/components/Menu.vue';
import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';


const store = useUserStore()

const userForm = ref([])
const avatar = ref(null)

function handleFileUpload(event) {
    avatar.value = event.target.files[0];
}


onMounted(async () => {

    const userEdit = await store.getUser()
    userForm.value = userEdit

})



async function  submitForm(event) {
    const email = event.target.elements.email.value
    const name = event.target.elements.name.value
    const password = event.target.elements.password.value
   
   let data = new FormData()

   data.append('email', email)
   data.append('name',name)
   data.append('password', password)
   data.append('file', avatar.value)
  

    console.table(data)


    const up = await store.updateUser(data)

    console.log(up)


     
}



</script>

<template>
    <main>
        <Menu />

        <div class="container mx-auto  p-8">
            <!-- Formulário -->
            <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data">
                <!-- Título do Formulário -->
                <h2 class="text-2xl font-bold mb-4">Editar Usuário</h2>
                <!-- Campo de Email -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input :value="userForm.email" 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Digite seu email">
                </div>
                <!-- Campo de Nome -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Nome
                    </label>
                    <input v-model="userForm.name" 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Digite seu nome">
                </div>
                <!-- Campo de Upload de Imagem -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">
                        Upload de Imagem
                    </label>
                    <input @change="handleFileUpload" ref="fileInput"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="avatar" type="file">
                </div>
                <!-- Campo de Senha -->
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Senha
                    </label>
                    <input v-model="userForm.password" 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Digite sua senha">
                </div>
                <!-- Botão de Enviar -->
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salvar</button>
                </div>
            </form>
        </div>
    </main>
</template>
