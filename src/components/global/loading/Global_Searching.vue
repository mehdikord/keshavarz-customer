<script>
export default {
  name: "Global_Searching",
  props:['text']
}
</script>

<template>
  <div class="text-center q-mt-lg">
    <q-icon name="fa-duotone fa-magnifying-glass-waveform fa-solid fa-beat" color="deep-orange" size="60px"></q-icon>
    <div class="q-mt-md">
      <strong class="text-grey-9 font-14">{{text}}</strong>
    </div>
  </div>
</template>

<style scoped>

</style>