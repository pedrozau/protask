<script setup>
import Menu from '@/components/Menu.vue';
import { useUserStore } from '@/store/user';

import { onMounted, ref } from 'vue'
import JSConfetti from 'js-confetti';



const showModal = ref(false);
const recompensa = ref('');
const pontos = ref(null);
const recompensaOrder = ref([])
const user = ref([])
const mostraModel = ref(false)
const notificacoes = ref([])
const store = useUserStore()

const jsconfetti = new JSConfetti()

const submitForm = async () => {

    const create = await store.createReward(
        recompensa.value,
        pontos.value
    )

    console.log(create)

    showModal.value = false;
};


function adicionarNotificacao(mensagem) {
    notificacoes.value =  mensagem
}

onMounted(async () => {
    const recom = await store.getReward()
    const User = await store.getUser()

    user.value = User

    recompensaOrder.value = recom
})

function fecharModal() {
    mostraModel.value = false
}


async function obterRecompensa(recompensa) {

    if (user._rawValue.points >= recompensa.points) {

        jsconfetti.addConfetti()
    await store.reward(recompensa.id)

    } else {
        adicionarNotificacao(`Não tens pontos suficiente Para obter essa recompensa  a sua pontução é:${user._rawValue.points}`)
        mostraModel.value = true
    }




    
}



</script>


<template>
    <Menu />
    <div class="container mx-auto py-8">


        <!-- Modal de Notificações -->
        <div v-if="mostraModel" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white rounded-lg p-8 max-w-md">
                <!-- Título do modal -->
                <h2 class="text-xl font-bold mb-4">Notificações</h2>
                <!-- Lista de notificações -->
                <div v-if="notificacoes.length === 0" class="text-gray-600 mb-4">Não há notificações.</div>
                <div v-else>
                    <div  class="bg-gray-100 rounded-md p-4 mb-2">
                        {{ notificacoes }}
                    </div>
                </div>
                <!-- Botão para fechar o modal -->
                <button @click="fecharModal"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Fechar</button>
            </div>
        </div>

        <!-- Conteúdo da Página aqui -->
        <div id="app" class="flex  ">
            <!-- Botão para abrir o modal -->
            <button @click="showModal = true"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Criar
                recompensa</button>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-lg p-6 w-80">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Adicionar Recompensa</h2>
                        <!-- Botão para fechar o modal -->
                        <button @click="showModal = false" class="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <span class="fas fa-times"></span>
                        </button>
                    </div>
                    <!-- Formulário do modal -->
                    <form @submit.prevent="submitForm">
                        <div class="mb-4">
                            <label for="recompensa" class="block text-gray-700 font-bold mb-2">Recompensa:</label>
                            <input type="text" id="recompensa" v-model="recompensa"
                                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        </div>
                        <div class="mb-4">
                            <label for="pontos" class="block text-gray-700 font-bold mb-2">Pontos:</label>
                            <input type="number" id="pontos" v-model.number="pontos"
                                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        </div>
                        <div class="text-right">
                            <!-- Botão para enviar o formulário -->
                            <button type="submit"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="container mx-auto p-8">
            <!-- Título -->
            <h1 class="text-2xl font-bold mb-4">Lista de Recompensas</h1>

            <div v-if="recompensaOrder.length == 0">
                <div class="h-screen bg-white">
                    <div class="flex justify-center items-center h-full">
                        <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                            alt="">
                    </div>
                </div>
            </div>

            <!-- Lista de Recompensas -->
            <!-- Lista de Recompensas -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(recompensa, index) in recompensaOrder" :key="index" class="bg-white rounded-lg shadow-lg">
                    <img src="@/assets/winner.jpg" alt="Imagem da Recompensa" class="w-full h-64 object-cover rounded-t-lg">
                    <div class="p-4">
                        <h2 class="text-lg font-semibold mb-2">{{ recompensa.award }}</h2>
                        <p class="text-gray-600 mb-2">Pontos necessários: {{ recompensa.points }}</p>
                        <button @click="obterRecompensa(recompensa)"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Obter
                            Recompensa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

