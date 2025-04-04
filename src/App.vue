<script >

import Template_Main_Header from "@/components/Templates/Template_Main_Header.vue";
import Template_Main_Footer from "@/components/Templates/Template_Main_Footer.vue";
import Splash from "@/views/Splash.vue";
import InstallPrompt from "@/InstallPrompt.vue";

export default {
  name: "App",
  components :{
    "template_header" : Template_Main_Header,
    "template_footer" : Template_Main_Footer,
    'splash' : Splash,
    'install_prompt' : InstallPrompt


  },
  mounted() {
    if (localStorage.getItem('keshavarz_customers_splash') !== 'done'){
      this.splash = true;
    }
  },
  data(){
    return {
      splash : false,
      drawer:false,

    }
  },
  methods:{
    OpenDrawer(){
        this.drawer = !this.drawer;
    }
  }
}
</script>

<template>

  <splash v-if="splash"></splash>
  <q-layout v-else view="hHh LpR fFf">
    <div class="app-container">
        <q-header v-if="this.$route.name !== 'auth'" class="header-bg" elevated style=" margin: 0 auto">
          <template_header @Drawer="OpenDrawer"></template_header>
        </q-header>
        <q-drawer show-if-above v-model="drawer" side="left" elevated style="width: 200px!important;">
          <!-- drawer content -->
        </q-drawer>
        <q-page-container>
          <router-view/>
        </q-page-container>
        <q-footer v-if="this.$route.name !== 'auth'" class="footer-style bg-transparent">
          <template_footer></template_footer>
        </q-footer>
    </div>

  </q-layout>
  <install_prompt></install_prompt>


</template>
<style>
aside{
  width: 260px!important;
}

.footer-style{
  max-width: 1024px !important;
  margin: 0 auto !important;

}
.menu-box{
  background-color: rgba(11, 24, 56, 0.93) !important;
  padding: 4px 2px 3px 2px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: black;

}
.header-bg{
  background-color: rgba(11, 24, 56, 0.98) !important;
}

</style>


