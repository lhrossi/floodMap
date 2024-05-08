<template>
  <v-divider class="my-2" />
  <a
    class="d-flex justify-center gap-2 py-3 px-3 bg-sky-600 rounded-lg text-white items-center text-center font-bold"
    :href="`https://www.google.com/maps/dir//${abrigo.latitude},${abrigo.longitude}`"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
      class=""
    >
      <g>
        <path
          d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 469.729c-55.847-66.338-152.035-197.217-152.035-284.301 0-83.834 68.202-152.036 152.035-152.036s152.035 68.202 152.035 152.035C408.034 272.515 311.861 403.37 256 469.729z"
          fill="#ffffff"
          opacity="1"
          data-original="#ffffff"
          class=""
        ></path>
        <path
          d="M256 92.134c-51.442 0-93.292 41.851-93.292 93.293S204.559 278.72 256 278.72s93.291-41.851 93.291-93.293S307.441 92.134 256 92.134zm0 153.194c-33.03 0-59.9-26.871-59.9-59.901s26.871-59.901 59.9-59.901 59.9 26.871 59.9 59.901-26.871 59.901-59.9 59.901z"
          fill="#ffffff"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>

    Como Chegar
  </a>
</template>

<script setup lang="ts">
defineProps<{ abrigo: any }>();
</script>
