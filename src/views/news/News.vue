<script>
import {Stores_News} from "@/stores/news/news.js";
import news_item from "@/views/news/News_Item.vue";

export default {
  name: "News",
  components: {news_item},
  mounted() {
    this.Get_Items();
  },
  data(){
    return {
      loading: true,
      items:[]
    }
  },
  methods : {
    Get_Items(){
      Stores_News().All().then(res=>{
        this.items = res.data.result;
        this.loading = false;
      }).catch(error=>{

      })

    }
  }
}
</script>

<template>
  <q-card flat class="animation-fade-in">
    <q-card-section>
      <div class="q-mt-sm text-center">
        <strong class="text-teal-9 font-17">خبرهای حوزه کشاورزی</strong>
      </div>
    </q-card-section>
    <q-card-section>
      <global_loading_colorful :size="100" :text="'درحال دریافت خبرها'" v-if="loading"></global_loading_colorful>
      <template v-else v-for="item in items">
        <news_item :item="item"></news_item>
        <q-separator class="q-mb-md q-mt-md"/>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>