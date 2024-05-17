<template>
  <div class="flex flex-column">
    <Header />

        <!-- <div class="flex align-center">
          <button v-if="!isSmallScreen" class="mr-4 relative" @click="() => selectMenuItem('map')">
            <p class="text-base hover:text-[#1351B4] laptop:text-lg transition-all duration-100"
              :class="selectedMenuItem === 'map' ? 'text-[#1351B4] font-bold' : 'text-[#020202]'"
            >
              Mapa
            </p>
            <div 
              v-if="selectedMenuItem === 'map'"
              class="absolute left-0 bottom-[-2px] h-[3px] w-full bg-[#1351B4]/25"
            />
          </button>

          <button class="mr-4 relative" @click="() => selectMenuItem('shelter')">
            <p class="text-base hover:text-[#1351B4] laptop:text-lg transition-all duration-100"
              :class="selectedMenuItem === ('shelter' || isSmallScreen && 'map') ? 'text-[#1351B4] font-bold' : 'text-[#020202]'"
            >
              {{ isSmallScreen ? 'Abrigos' : 'Lista de abrigos' }}
            </p>
            <div 
              v-if="selectedMenuItem === 'shelter'"
              class="absolute left-0 bottom-[-2px] h-[3px] w-full bg-[#1351B4]/25"
            />
          </button>

          <button class="mr-4 relative" @click="() => selectMenuItem('about')">
            <p class="text-base  hover:text-[#1351B4] laptop:text-lg transition-all duration-100"
              :class="selectedMenuItem === 'about' ? 'text-[#1351B4] font-bold' : 'text-[#020202]'"
            >
              Sobre
            </p>
            <div 
              v-if="selectedMenuItem === 'about'"
              class="absolute left-0 bottom-[-2px] h-[3px] w-full bg-[#1351B4]/25"
            />
          </button>

          <button class="relative" @click="handleLogin">
            <p class="text-base  hover:text-[#1351B4] laptop:text-lg"
              :class="selectedMenuItem === 'login' ? 'text-[#1351B4] font-bold' : 'text-[#020202]'"
            >
              Login
            </p>
            <div 
              v-if="selectedMenuItem === 'login'"
              class="absolute left-0 bottom-[-2px] h-[3px] w-full bg-[#1351B4]/25"
            />
          </button>
        </div> -->
    
    <v-main>
      <Modal :open="currentButton === 'sobre'" @close="selectButton('mapa')">
        <AboutModal />
      </Modal>
      <slot></slot>
    </v-main>
  </div>
</template>

<script setup lang="ts">
  const selectedMenuItem = ref<'map' | 'about' | 'login' | 'shelter'>('shelter');

  const selectMenuItem = (item: 'map' | 'about' | 'login' | 'shelter') => {
    selectedMenuItem.value = item;
  };

  const handleLogin = () => {
    window.open('https://abrigospoa.web.app/login');
  };
</script>
