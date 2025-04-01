<script>

import News_Item from "@/views/news/News_Item.vue";
import {Stores_News} from "@/stores/news/news.js";

export default {
  name: "index_News",
  mounted () {
    this.Get_News();
  },
  components:{
    'news_item' : News_Item,
  },
  data(){
    return{
      items : [],
      loading:true,
    }
  },
  methods:{
    Get_News(){
      Stores_News().Latest().then(res=>{
        this.items = res.data.result;
        this.loading=false;
      }).catch(error=>{

      })

    }

  }

}
</script>

<template>
  <q-card square flat class="bg-grey-3">
    <q-card-section>
      <div class="text-center q-mt-lg">
        <strong class="text-teal font-16">جدیدترین خبرهای کشاورزی</strong>
      </div>
    </q-card-section>
    <q-card-section>
      <global_loading_colorful :size="90" v-if="loading"></global_loading_colorful>
      <template v-else v-for="item in items">
        <news_item :item="item"></news_item>
        <q-separator class="q-mb-md q-mt-sm"/>
      </template>
    </q-card-section>
    <q-card-section class="q-pt-xs">
      <div class="text-center q-mb-sm">
        <router-link :to="{name : 'news'}">
          <strong class="text-blue-grey-8">... مشاهده همه خبر ها ...</strong>
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>