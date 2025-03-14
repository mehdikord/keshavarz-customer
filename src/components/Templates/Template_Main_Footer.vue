<script>
export default {
  name: "Template_Dark_Main_Footer",

}
</script>

<template>
  <div class="menu-box">
    <div class="row justify-center">

      <div class="col text-center">
        <router-link :to="{name : 'auth'}" title="حساب کاربری">
          <q-btn class="icon-size" v-if="this.$route.name === 'auth' || this.$route.name === 'profile'" flat icon="fa-duotone fa-regular fa-user-vneck text-green-5" color="white"></q-btn>
          <q-btn class="icon-size" v-else icon="fa-duotone fa-regular fa-user-vneck text-white" flat color="white"></q-btn>
          <div v-if="this.$route.name === 'auth' || this.$route.name === 'profile'" class="text-white font-12 text-green-5">پروفایل</div>
          <div v-else class="text-white font-12">پروفایل</div>

        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'searching'}" title="جستجو خدمات">
          <q-btn class="icon-size" flat v-if="this.$route.name === 'searching'" icon="fa-duotone fa-regular fa-magnifying-glass text-green-5" color="white"></q-btn>
          <q-btn class="icon-size" flat v-else icon="fa-duotone fa-regular fa-magnifying-glass text-white" color="white"></q-btn>
          <div v-if="this.$route.name === 'searching'" class="text-white font-12 text-green-5">جستجو خدمات</div>
          <div v-else class="text-white font-12">جستجو خدمات</div>
        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'index'}" title="کشاورز">
          <q-btn class="icon-size" flat v-if="this.$route.name === 'index'" icon="fa-duotone fa-regular fa-farm text-green-5" color="white"></q-btn>
          <q-btn class="icon-size" flat v-else icon="fa-duotone fa-regular fa-farm text-white" color="white"></q-btn>
          <div v-if="this.$route.name === 'index'" class="text-white font-12 text-green-5">خانه</div>
          <div v-else class="text-white font-12">خانه</div>
        </router-link>
      </div>


      <div class="col text-center">

        <router-link :to="{name : 'requests'}" title="درخواست ها">
          <q-btn class="icon-size" flat v-if="this.$route.name === 'requests'" icon="fa-duotone fa-regular fa-square-list text-green-5" color="white"></q-btn>
          <q-btn class="icon-size" flat v-else icon="fa-duotone fa-regular fa-square-list text-white" color="white"></q-btn>
          <div v-if="this.$route.name === 'requests'" class="text-white font-12 text-green-5">درخواست ها</div>
          <div v-else class="text-white font-12">درخواست ها</div>
        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'lands'}" title="زمین ها">
          <q-btn class="icon-size" flat v-if="this.$route.name === 'lands'" icon="fa-duotone fa-regular fa-house-tree text-green-5" color="white"></q-btn>
          <q-btn class="icon-size" flat v-else icon="fa-duotone fa-regular fa-house-tree text-white" color="white"></q-btn>
          <div v-if="this.$route.name === 'lands'" class="text-white font-12 text-green-5">زمین ها</div>
          <div v-else class="text-white font-12">زمین ها</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-size{
  font-size:15px;
}


@media only screen and (max-width: 768px) {
  .icon-size{
    font-size:15px;
  }

}


</style>