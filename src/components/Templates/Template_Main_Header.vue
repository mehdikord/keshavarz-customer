<script>
export default {
  name: "Template_Dark_Main_Header"
}
</script>

<template>
  <q-toolbar class="text-center">
    <q-toolbar-title class="text-left">
      <q-icon @click="this.$emit('Drawer')" class="q-mr-md cursor-pointer"  size="md" name="fa-duotone fa-light fa-grid-2"></q-icon>
      <strong v-if="this.$route.name==='index'" class="font-lalezar font-weight-700 font-20 text-green-5">
        کشاورز
      </strong>
      <span v-else class="animation-fade-in text-green-5  font-15  font-weight-700">
        {{this.$route.meta.title}}
      </span>
    </q-toolbar-title>
    <img src="assets/images/img.png" width="40" alt="">
  </q-toolbar>
</template>

<style scoped>
.logo-image{
  width: 100px;
}
</style>