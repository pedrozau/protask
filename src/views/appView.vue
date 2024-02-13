<script setup>
import Menu from '@/components/Menu.vue'
import { useTaskStore } from '@/store/task'
import { onMounted, reactive, ref } from 'vue'
import JSConfetti from 'js-confetti'


const jsconfetti = new JSConfetti()



const usetask = useTaskStore()



const data = reactive({
  task: [],
  done: false
})





onMounted(async () => {
  
   
  const gettaks = await usetask.getTask()

  data.task = gettaks



})



const doneTask = async (id, level) => {



  jsconfetti.addConfetti()

  await usetask.taskDone(id, level)
  data.task = await usetask.getTask()

}





</script>

<template>
  <main>

    <div class="protask">
      <Menu />

      <!-- Conteúdo da Página -->
      <div class="container mx-auto py-8">

        <ul class="flex justify-center  space-x-5  text-white">
          <li> <Button @click.self="data.done = true" class="w-30 border-2 bg-blue-500  border-none rounded p-2">Terefas
              concluidas</Button> </li>
          <li> <Button @click.self="data.done = false" class="w-30 border-2 bg-blue-500 border-none rounded p-2">Terefas
              Pendente</Button> </li>
        </ul>

        <div>

          <div v-if="data.task.length == 0">
            <div class="h-screen bg-white">
              <div class="flex justify-center items-center h-full">
                <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
              </div>
            </div>
          </div>

          <div v-for="tasks in data.task" :key="tasks.id">


            <div v-if="tasks.done == data.done" class="mb-4 p-4 border rounded-md  m-10">

              <strong>{{ tasks.task }}</strong>
              <p>Nível de Dificuldade: {{ tasks.level == 0 ? 'Fácil' : '' }} {{ tasks.level == 1 ? 'Médio' : '' }} {{
                tasks.level == 2 ? 'Difícil' : '' }} </p>
              <p v-if="!tasks.done">Status: Pendente</p>
              <p v-else>Status: Concluída </p>
              <div v-if="tasks.done">

              </div>
              <div v-else>

                <button class="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mt-5"
                  @click="doneTask(tasks.id, tasks.level)">Marcar Concluída</button>

              </div>
            </div>



          </div>

        </div>
        <!-- Conteúdo da Página aqui -->
      </div>

    </div>


  </main>
</template>