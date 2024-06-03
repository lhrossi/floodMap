<script setup lang="ts">
import { Icon } from '@iconify/vue';

function handleClick() {
  window.open('https://www.instagram.com/abrigosrs/', '_blank').focus();
}
</script>

<template>
  <button
    class="floating-button"
    @click="handleClick"
  >
    <Icon
      icon="mdi:instagram"
      height="26px"
    />
  </button>
</template>

  <style scoped>
  .floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #f09433;
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .floating-button:hover {
    background-color: #0056b3;
  }
  </style>
