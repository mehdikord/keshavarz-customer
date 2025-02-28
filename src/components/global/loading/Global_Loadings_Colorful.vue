<script>
export default {
  name: "Global_Loadings_Colorful",
  props: ['size','text'],
  mounted() {
    if (this.size){
      this.image_width=this.size
    }
  },
  data(){
    return{
      image_width : 150,
    }
  }
}
</script>

<template>
  <div class="text-center">
    <img src="assets/images/icons/loading_animation.svg" :width="image_width" alt="">
    <div style="margin-top: -15px!important;">
      <strong class="text-deep-purple">{{text}}</strong>
    </div>
  </div>
</template>

<style scoped>

</style>