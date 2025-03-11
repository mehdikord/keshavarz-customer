<script>
import {Stores_Searching} from "@/stores/searching/searching.js";
import Provider_Implements from "@/views/providers/components/Provider_Implements.vue";

export default {
  name: "Provider_Profile",
  components: {
    'provider_implements': Provider_Implements

  },
  mounted() {
    this.Get_Provider_Profile();
  },
  data(){
    return{
      tab : 'implements',
      loading:true,
      provider : null,
    }
  },
  methods:{
    Get_Provider_Profile(){
      Stores_Searching().Searching_Provider_Profile(this.$route.params.id).then(res=>{
        this.provider = res.data.result;
        this.loading=false;
      })
    }

  }
}
</script>

<template>
  <q-card flat class="q-mt-md">
    <global_loading_colorful class="q-mt-xl" v-if="loading" :size="90" text="درحال دریافت پروفایل"></global_loading_colorful>
    <template v-else>
      <q-card-section class="q-px-sm">
        <div class="row">
          <div class="col-4 text-center">
            <img src="assets/images/icons/profile.svg" width="80" alt="">
          </div>
          <div class="col-8">
            <div><strong class="text-teal-10 font-16">{{provider.user.name}}</strong></div>
            <div v-if="provider.user.province || provider.user.city" class="q-mt-sm">
              <span class="font-13 text-grey-9">{{provider.user.province.name}}</span> / <span class="font-13 text-grey-9">{{provider.user.city.name}}</span>
            </div>
            <div class="q-mt-sm">
              <span class="font-14 text-teal-7">درباره : </span><span class="font-13">{{provider.user.bio}}</span>
            </div>
          </div>
        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="deep-orange-8"
            indicator-color="teal-5"
            align="justify"
            narrow-indicator
        >
          <q-tab name="implements"  >
            <q-icon name="fa-duotone fa-regular fa-tractor" color="" size="25px"></q-icon>
            <strong class="q-mt-sm font-14">خدمات قابل ارائه</strong>
          </q-tab>
          <q-tab name="gallery"  >
            <q-icon name="fa-duotone fa-regular fa-camera-retro" color="" size="25px"></q-icon>
            <strong class="q-mt-sm font-14">گالری تصاویر</strong>
          </q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="implements">
            <provider_implements class="animation-fade-in" :user="provider.user" :implements="provider.implements"></provider_implements>
          </q-tab-panel>
          <q-tab-panel name="gallery">

          </q-tab-panel>

        </q-tab-panels>
      </q-card-section>
    </template>

  </q-card>
</template>

<style scoped>
.implement-box{
  padding: 18px 8px;
  border-radius: 8px;
  background-color: #7e7b7b;
}

</style>