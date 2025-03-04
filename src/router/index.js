import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index.vue";
import Auth from "@/views/auth/Auth.vue";
import About from "@/views/about/About.vue";
import Contact from "@/views/contact/Contact.vue";
import Profile from "@/views/profile/Profile.vue";
import {Stores_Auth} from "@/stores/auth/auth.js";
import Searching from "@/views/searching/Searching.vue";
import Requests from "@/views/requests/Requests.vue";
import Lands from "@/views/lands/Lands.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      component : Index,
      name : 'index',
      meta : {
        title : "کشاورز"
      }
    },
    {
      path : '/auth',
      component : Auth,
      name : 'auth',
      meta : {
        title : "ورود به حساب"
      }
    },
    {
      path : '/about',
      component : About,
      name : 'about',
      meta : {
        title : "درباره کشاورز"
      }
    },
    {
      path : '/contact',
      component : Contact,
      name : 'contact',
      meta : {
        title : "تماس با ما"
      }
    },
    {
      path : '/searching',
      component : Searching,
      name : 'searching',
      meta : {
        title : "جستجو خدمات"
      },
    },
    {
      path : '/requests',
      component : Requests,
      name : 'requests',
      meta : {
        title : "تاریخچه درخواست ها"
      },
    },
    {
      path : '/lands',
      component : Lands,
      name : 'lands',
      meta : {
        title : "لیست زمین ها"
      },
    },
    {
      path: '/profile',
      component: Profile,
      name: 'profile',
      meta: {
        title: "حساب کاربری"
      },
    },
  ],
})
// Check Authenticate
router.beforeEach((to, from, next) => {
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (to.path === '/profile' && !Stores_Auth().AuthGetCheckAuth) {
    next('/auth');
  }else if (to.path === '/auth' && Stores_Auth().AuthGetCheckAuth){
    next('/profile');
  }
  else {
    next();
  }
});
export default router
