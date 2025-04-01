<script>
export default {
  name: "Request_Item",
  props:['request'],

}
</script>

<template>
  <template v-if="request">
    <div class="item-box shadow-1">
      <router-link :to="{name: 'requests_show', params: {id: request.id}}">
        <div class="text-center item-header" :class="{'bg-blue-grey-10' : request.status === 'canceled','bg-blue-10' : request.status === 'pending','bg-teal' : request.status === 'working','bg-green-7' : request.status === 'done'}">
          <strong class="text-white font-15">{{request.implement.name}}</strong>
        </div>
        <div class="row q-px-md q-mt-md q-mb-md">
          <div class="col-7">
            <div>
              <q-icon name="fa-duotone fa-regular fa-farm" color="deep-orange" size="22px"></q-icon>
              :
              <strong class="font-14 text-grey-9 q-ml-xs">{{request.land.title}}</strong>
            </div>
            <div class="q-mt-md">
              <q-icon name="fa-duotone fa-square-dashed fa-regular" color="deep-orange" size="22px"></q-icon>
              :
              <strong class="font-14 text-blue-7 q-ml-xs">{{request.area}}</strong>
              <span class="q-ml-xs">متر</span>
            </div>
          </div>
          <div class="col-5">
            <div>
              <q-icon name="fa-duotone fa-circle-info fa-regular" color="deep-orange" size="22px"></q-icon>
              :
              <template v-if="request.status === 'pending'">
                <q-icon name="fa-duotone fa-spinner-scale fa-regular fa-spin" color="" size="19px"></q-icon>
                <strong class="text-grey-8 q-ml-xs">در انتظار</strong>
              </template>
              <template v-if="request.status === 'canceled'">
                <q-icon name="fa-duotone fa-times fa-regular" color="" size="19px"></q-icon>
                <strong class="text-grey-8 q-ml-xs">لغو شده</strong>
              </template>
            </div>
            <div class="q-mt-md">
              <q-icon name="fa-duotone fa-calendar-days fa-regular" color="deep-orange" size="22px"></q-icon>
              :
              <strong class="q-ml-xs text-grey-9 font-13 q-mt-sm">{{this.$filters.date_jalali(request.created_at,'jYYYY/jM/jD')}}</strong>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </template>
</template>

<style scoped>
.item-box{
  border-radius: 8px;
  border: 1px solid rgba(54,53,53,0.3);
}
.item-header{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 12px 0;
}
</style>