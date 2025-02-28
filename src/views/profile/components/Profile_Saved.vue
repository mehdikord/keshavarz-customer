<script>
import {Stores_Services} from "@/stores/services/services.js";

export default {
  name: "Profile_Saved",
  mounted () {
    this.Get_Items()
  },
  data(){
    return {
      loading:true,
      items:[],
      show : null,
      delete_loading:[],
    }
  },
  methods:{
    Get_Items(){
      Stores_Services().Get_Answer().then(res=>{
        this.items = res.data.result;
        this.loading=false;
      }).catch(err=>{
        this.Methods_Notify_Error_Server();
      })

    },
    Select_Items(item){
      this.show=item;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    Delete_Item(id){
      this.$q.dialog({
        title:'آیا مطمئن هستید ؟',
        message: 'آیتم ذخیره شده مورد نظر حذف شود',
        ok: {
          glossy: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.delete_loading[id] = true;
        Stores_Services().Remove_Answer(id).then(res=>{
          this.items = this.items.filter(item => item.id !== id);
          this.Methods_Notify_Delete();
        }).catch(error=>{
          this.Methods_Notify_Error_Server();
        })
      }).onCancel(() => {

      }).onDismiss(() => {
      })
    }
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section class="animation-fade-in q-px-xs">
      <q-separator class="q-mb-md" />
      <div class="text-center">
        <strong class="text-red font-15">موارد ذخیره شده</strong>
        <div v-if="!show" class="text-center q-mt-xs font-12 text-grey-9">
          برای مشاهده مراحل هر قسمت روی کلیک کنید
        </div>
      </div>
      <div class="q-mt-md">
        <global_loading_colorful v-if="loading" size="75" text="درحا دریافت اطلاعات"></global_loading_colorful>
        <template v-else>
          <div v-if="!show" class="row">
            <div v-for="item in items" class="col-xs-12 col-sm-12 q-px-sm q-mb-lg">
              <div class="item-box row cursor-pointer">
                <div @click="Select_Items(item)" class="col-11 row q-gutter-sm">
                  <div class="row">
                    <img src="assets/images/icons/default-color.svg" width="40" />
                    <strong class="q-mt-sm q-ml-sm font-13">{{item.from_color.name}}</strong>
                  </div>
                  <div class="row">
                    <q-icon class="q-mt-sm q-ml-sm q-mr-sm" name="fa-duotone fa-left-long fa-light" size="22px" color="teal-9"></q-icon>
                  </div>
                  <div class="row">
                    <img src="assets/images/icons/default-color.svg" width="40" />
                    <strong class="q-mt-sm q-ml-sm font-13">{{item.to_color.name}}</strong>
                  </div>
                </div>
                <div class="col-1 text-right">
                  <q-icon @click="Delete_Item(item.id)" class="cursor-pointer q-mt-sm" name="fa-duotone fa-trash fa-solid" color="red-8" size="22px"></q-icon>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="q-px-sm">
           <div class="row">
             <div class="col-10 row q-gutter-sm">
               <div class="row">
                 <img src="assets/images/icons/default-color.svg" width="35" />
                 <strong class="q-mt-sm q-ml-sm font-13">{{show.from_color.name}}</strong>
               </div>
               <div class="row">
                 <q-icon class="q-mt-sm q-ml-sm q-mr-sm" name="fa-duotone fa-left-long fa-light" size="20px" color="teal-9"></q-icon>
               </div>
               <div class="row">
                 <img src="assets/images/icons/default-color.svg" width="35" />
                 <strong class="q-mt-sm q-ml-sm font-13">{{show.to_color.name}}</strong>
               </div>
             </div>
             <div class="col-2 text-right">
               <q-btn @click="show=null" class="q-mt-sm" size="sm" rounded color="dark" icon="fa-duotone fa-left fa-light"></q-btn>
             </div>
           </div>
            <q-separator class="q-mt-sm q-mb-sm"/>
            <div class="q-mt-lg">

              <div v-for="(item,index) in show.answers.answers" class="info-box q-mb-md">
                <div class="text-center font-15">
                  <strong class="text-grey-9"> مرحله : </strong><strong class="text-red-6">{{index + 1}}</strong>
                </div>
                <q-separator class="q-mt-sm"/>
                <div class="q-mt-md">
                  <template v-if="item.answer.colors.length > 0">
                    <strong class="text-teal-7">تلفیق رنگ های مورد نیاز : </strong>
                    <div class="q-mt-md row">
                      <div v-for="color in item.answer.colors" class="col-12 q-px-sm q-mb-sm">
                        <div class="color-box color-text text-grey-9">
                          <strong class="text-dark font-13">{{color.name }}</strong>
                          <span class="float-right">مقدار : <strong class="text-red-6 font-15">{{color.val}}</strong></span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="q-mt-md" v-if="item.answer.oxidant">
                    <strong class="text-teal-7">اکسیدان مورد نیاز به مقدار  : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant}}</strong>
                    <strong class="q-ml-sm">میل</strong>
                  </div>
                  <div class="q-mt-md" v-if="item.answer.oxidant_percent">
                    <strong class="text-teal-7">درصد اکسیدان : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant_percent}}</strong>
                    <strong class="q-ml-sm">درصد</strong>
                  </div>
                  <div class="q-mt-md" v-if="item.answer.oxidant_time">
                    <strong class="text-teal-7">مدت زمان : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant_time}}</strong>
                  </div>
                  <div class="q-mt-lg" v-if="item.answer.text">
                    <div v-html="item.answer.text"></div>
                  </div>
                </div>

              </div>

            </div>



          </div>
        </template>




      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.item-box{
  padding:12px 8px;
  border-radius: 7px;
  border: 1px dashed rgba(102, 103, 103, 0.8);
}
.info-box{
  border-radius: 8px;
  border: 1px dashed rgba(30, 30, 30, 0.4);
  padding: 15px 10px;
}

.color-box{
  padding:10px 8px;
  border-radius: 10px;
  border: 1px dashed rgba(128, 128, 128, 0.5);
}
</style>