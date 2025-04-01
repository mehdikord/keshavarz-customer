<script>
export default {
  name: "News_Item",
  props: ['item'],
  mounted() {
    if (this.$route.name === 'news') {
      this.lines = 1000000;
    }
  },
  data(){
    return {
      lines : 100
    }
  }
}
</script>

<template>
  <div v-if="item" class="animation-fade-in">
    <div class="row">
      <div class="col-3">
        <img class="news-image" src="assets/images/icons/news.svg" alt="">
      </div>
      <div class="col-9">
        <strong class="title-color font-13">{{ item.title }}</strong>
        <div class="q-mt-sm text-justify" @click="lines=100000">
          <span class="font-12">{{this.Methods_Text_Shorter(item.description,lines)}}</span>
          <q-icon v-if="lines < 101 " class="q-ml-sm title-color" name="fa-duotone  fa-arrow-down fa-bounce" size="16px"></q-icon>
        </div>
        <div class="text-right q-mt-md">
          <span class="text-grey-8 font-12 float-left q-ml-sm">{{this.$filters.date_jalali(item.created_at,'jYYYY/jM/jD')}}</span>
          <a :href="item.link" target="_blank">
            <strong class="text-green-8 font-12 ">مشاهده کامل خبر</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-image{
  width: 95px;
  border-radius: 8px;
}
.title-color{
  color: rgb(50, 77, 157);
}
</style>