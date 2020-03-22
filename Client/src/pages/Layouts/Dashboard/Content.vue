<template>
  <div class="content">
    <FadeTransition :duration="200" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
export default {
  components: {
    FadeTransition
  }
};
</script>

<style scoped lang="scss">
.white-content .card:not(.card-white) {
  border-radius: 15px !important;
  background: #e7e7e7ec !important;
  border: 0 !important;
  position: relative !important;
  width: 100% !important;
  -webkit-box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.4) !important;
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1) !important;
}
</style>
