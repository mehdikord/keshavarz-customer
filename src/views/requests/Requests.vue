<script>
import provider_implements from "@/views/providers/components/Provider_Implements.vue";
import Requests_Pending from "@/views/requests/components/Requests_Pending.vue";
import Requests_Working from "@/views/requests/components/Requests_Working.vue";
import Requests_Done from "@/views/requests/components/Requests_Done.vue";
import Requests_Canceled from "@/views/requests/components/Requests_Canceled.vue";

export default {
  name: "Requests",
  components: {Requests_Canceled, Requests_Done, Requests_Working, Requests_Pending, provider_implements},
  data(){
    return {
      tab : 'pending'
    }
  },
  methods:{

  }
}
</script>

<template>
  <div class="q-mt-sm">
    <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="teal-9"
        indicator-color="deep-orange-8"
        align="justify"
        narrow-indicator
    >
      <q-tab name="pending">
        <img src="assets/images/icons/pending.svg" width="40" alt="pending">
        <strong class="q-mt-sm font-14">در انتظار</strong>
      </q-tab>

      <q-tab name="working">
        <img src="assets/images/icons/workinkg.svg" width="40" alt="workinkg">
        <strong class="q-mt-sm font-14">در حال انجام</strong>
      </q-tab>
      <q-tab name="done">
        <img src="assets/images/icons/done.svg" width="40" alt="done">
        <strong class="q-mt-sm font-14">پایان یافته</strong>
      </q-tab>
      <q-tab name="canceled">
        <img src="assets/images/icons/canceled.svg" width="40" alt="done">
        <strong class="q-mt-sm font-14">لغو شده</strong>
      </q-tab>
    </q-tabs>
    <q-separator></q-separator>
    <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale">
      <q-tab-panel name="pending">
        <Requests_Pending></Requests_Pending>
      </q-tab-panel>
      <q-tab-panel name="working">
        <Requests_Working></Requests_Working>
      </q-tab-panel>
      <q-tab-panel name="done">
        <Requests_Done></Requests_Done>
      </q-tab-panel>
      <q-tab-panel name="canceled">
        <Requests_Canceled></Requests_Canceled>
      </q-tab-panel>

    </q-tab-panels>
  </div>



</template>

<style scoped>

</style>