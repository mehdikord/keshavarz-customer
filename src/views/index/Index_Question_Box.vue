<script>
export default {
  name: "Index_Question_Box"
}
</script>

<template>
  <div class="text-center q-mt-md">
    <q-icon name="fa-duotone fa-solid fa-location-question" class="question-icon" color="indigo-10"></q-icon>
  </div>
</template>

<style scoped>
.question-icon {
  font-size: 48px;
  animation: float 1.2s ease-in-out infinite;
}
@media only screen and (max-width: 768px) {
  .question-icon {
    font-size: 39px;
  }
}
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

</style>