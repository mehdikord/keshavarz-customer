<template>
  <div class="map-container" dir="ltr">
    <div class="rounded-borders" ref="mapElement" style="height: 300px; width: 100%;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// رفع مشکل آیکنها در Vite (این بخش باید خارج از متدها باشد!)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});
export default {
  data() {
    return {
      selectedCoordinates: null,
      map: null
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // تنظیم آیکنها برای Leaflet


      // ایجاد نقشه
      this.map = L.map(this.$refs.mapElement).setView([35.6892, 51.3890], 6);

      // افزودن لایه ماهوارهای (مثال با MapTiler)
      L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=7fDO7Xj3mre7UXdalQs6', {
        // attribution: '<a href="https://www.maptiler.com/">MapTiler</a>'
      }).addTo(this.map);


      // افزودن مارکر پیشفرض (اختیاری)
      // L.marker([35.6892, 51.3890]).addTo(this.map)
      //     .bindPopup('تهران');

      // رویداد کلیک روی نقشه
      this.map.on('click', (e) => {
        this.handleMapClick(e);
      });
    },
    handleMapClick(e) {
      // حذف مارکر قبلی اگر وجود داشت
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      // ایجاد مارکر جدید
      this.currentMarker = L.marker(e.latlng)
          .addTo(this.map)
          .bindPopup(`زمین شما`)
          .openPopup();

      // ذخیره مختصات
      // this.selectedCoordinates = {
      //   lat: e.latlng.lat.toFixed(4),
      //   lng: e.latlng.lng.toFixed(4)
      // };
      this.$emit('location_updated', {
        lat: e.latlng.lat.toFixed(4),
        lng: e.latlng.lng.toFixed(4)
      });
    }
  }
}
</script>