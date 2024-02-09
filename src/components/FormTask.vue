<script setup>
import { useTaskStore } from "@/store/task";
import JSConfetti from "js-confetti";
import { ref } from "vue";

const jsconfetti = new JSConfetti()

const task = ref('')
const difficulty = ref(0)

const useTask = useTaskStore()

const handlerTask = async () => {
    
    const  tarefa = task.value 
    let level =    difficulty.value

     jsconfetti.addConfetti()

    await  useTask.createTask(tarefa,level)


} 



</script>

<template>
    <div class="m-20">
        <h3 class="text-lg font-semibold mb-4">Adicionar Tarefa</h3>
        <form  @submit.prevent="handlerTask">
            <div class="mb-4">
                <label for="task" class="block text-gray-700 text-sm font-bold mb-2">Tarefa</label>
                <input  type="text" id="task" name="task" v-model="task"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
            </div>
            <div class="mb-4">
                <label for="difficulty" class="block text-gray-700 text-sm font-bold mb-2">Nível de Dificuldade</label>
                <select  id="difficulty" name="difficulty" v-model="difficulty"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                    <option value=0 >Fácil</option>
                    <option value=1 >Médio</option>
                    <option value=2 >Difícil</option>
                </select>
            </div>
            <button type="submit"
                class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Adicionar
                Tarefa</button>
        </form>
    </div>
</template>