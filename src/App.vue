<script >

import Template_Main_Header from "@/components/Templates/Template_Main_Header.vue";
import Template_Main_Footer from "@/components/Templates/Template_Main_Footer.vue";
import ComingSoon from "@/views/ComingSoon.vue";

export default {
  name: "App",
  components :{
    "template_header" : Template_Main_Header,
    "template_footer" : Template_Main_Footer,
    'coming_soon' : ComingSoon,
  },
  data(){
    return {
      launching : 1,
    }
  }
}
</script>

<template>


  <q-layout view="lHh Lpr lFf">
    <div class="app-container">
        <q-header class="header-bg" elevated style=" margin: 0 auto">
          <template_header></template_header>
        </q-header>
        <q-drawer  side="left" behavior="mobile" elevated>
          <!-- drawer content -->
        </q-drawer>
        <q-page-container>
          <router-view/>
        </q-page-container>
        <q-footer class="footer-style bg-transparent">
          <template_footer></template_footer>
        </q-footer>
    </div>

  </q-layout>
</template>
<style>

.footer-style{
  max-width: 1024px !important;
  margin: 0 auto !important;

}
.menu-box{
  background-color: rgba(11, 24, 56, 0.93) !important;
  padding: 1px 2px 3px 2px;
  color: black;

}
.header-bg{
  background-color: rgba(11, 24, 56, 0.93) !important;
}

</style>


