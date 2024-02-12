<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false)
const mobileOpen = ref(false)
const logout = () => {
  window.location = '/'
  window.localStorage.removeItem('_token')
  window.localStorage.removeItem('_id')

}

function toggleMobileMenu() {
  mobileOpen.value = !mobileOpen.value
}



</script>

<template>
  <!-- Navbar -->
  <nav class="bg-blue-500 p-4 flex justify-between   md:items-center ">
    <!-- Mobile Menu Button -->
    <button @click="toggleMobileMenu" class="text-white md:hidden">
        <span class="fas fa-bars"></span>
    </button>

    <!-- Logo -->
   

    <RouterLink to="/protask" :class="{ 'hidden': mobileOpen }" >
      <a  class="text-white text-lg font-semibold flex items-center space-x-2 ">
        <!-- Logo Image -->
        <!-- <img src="logo.png" alt="Logo" class="h-8"> -->
        <!-- Logo Text -->
        <span>ProTask</span>
    </a>
    </RouterLink>

    <!-- Menu de Navegação -->
    <ul :class="{ 'hidden': !mobileOpen }" class="md:flex md:items-center  md:before:justify-center space-y-5  md:space-x-4">
      <li>
        <RouterLink to="/protask">
          <a
          
            class="text-white flex items-center space-x-2 hover:underline "
          >
            <span class="fas fa-home mr-2"></span>
            <!-- Ícone de casa -->
            Home
          </a>

        </RouterLink>
      </li>
      <li>
        <RouterLink to="/addtask">
          <a
            
            class="text-white flex items-center space-x-2 hover:underline"
          >
            <span class="fas fa-plus-circle mr-2"></span>
            <!-- Ícone de adicionar -->
            Adicionar Tarefa
          </a>

        </RouterLink>
      </li>
      <li>
        <RouterLink to="/bestuser">
          <a
          class="text-white flex items-center space-x-2 hover:underline"
        >
          <span class="fas fa-award mr-2"></span>
          <!-- Ícone de prêmio -->
          Top Usuários
        </a>
        </RouterLink>
       
      </li>
      <li>
        <RouterLink to="/reward">
          <a
            class="text-white flex items-center space-x-2 hover:underline"
          >
            <span class="fas fa-trophy mr-2"></span>
            <!-- Ícone de prêmio -->
            Recompensas
          </a>

        </RouterLink>
      </li>
    </ul>


    <!-- Profile -->
    <div class="relative"  @click.self="isOpen = false"  :class="{ 'hidden': mobileOpen }">
        <button @click="isOpen=!isOpen" class="text-white flex items-center space-x-2 hover:underline focus:outline-none">
            <span class="fas fa-user-circle mr-2"></span> <!-- Profile Icon -->
            Perfil
        </button>
        <ul v-show="isOpen" class="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg overflow-hidden transition-opacity transform scale-95 hover:scale-100 md:w-auto">
            <li>
                <RouterLink to="/profile">
                    <a class="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center space-x-2">
                        <span class="fas fa-user mr-2"></span> <!-- Profile View Icon -->
                        Ver Perfil
                    </a>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/editprofile">
                    <a href="#" class="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center space-x-2">
                        <span class="fas fa-edit mr-2"></span> <!-- Edit Icon -->
                        Editar
                    </a>
                </RouterLink>
            </li>
            <li @click="logout">
                <a href="#" class="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center space-x-2">
                    <span class="fas fa-sign-out-alt mr-2"></span> <!-- Logout Icon -->
                    Logout
                </a>
            </li>
        </ul>
    </div>
</nav>

  <!---->
</template>
