<template>
  <div>
    <TopBanner />
    <Navbar id="top" />
    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content-custom">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <i
          v-scroll-to="{
            el: '#top',
            duration: 900,
            easing: 'linear',
            offset: -5000,
            force: true,
            cancelable: true,
            onStart: onStart,
            onDone: onDone,
            onCancel: onCancel,
            x: false,
            y: true,
          }"
          class="fas fa-chevron-up go-to-top"
        ></i>
      </div>
      <!-- Footer Section -->
      <Footer />
    </div>
  </div>
</template>
<script>
import { ZoomCenterTransition } from 'vue2-transitions';
import TopBanner from './Components/TopBanner.vue';
import Navbar from './Components/Navbar.vue';
import Footer from './Components/Footer.vue';

export default {
  components: {
    TopBanner,
    Navbar,
    ZoomCenterTransition,
    Footer,
  },
};
</script>

<style scoped lang="scss">
.content-custom {
  background-color: #f8f8f8 !important;
}

.go-to-top {
  position: fixed;
  bottom: 0;
  left: 33px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 1.8em;
  background-color: #ef476f;
}
.fa-chevron-up:before {
  content: '\f077';
  color: white;
}
@media (max-width: 768px) {
  .go-to-top {
    bottom: 15px;
    left: 15px;
    z-index: 99;
    padding: 0.3em;
    font-size: 1.7em;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(15, 15, 15, 0.13) !important;
  }

  .fa-chevron-up:before {
    content: '\f077';
    color: rgb(209, 209, 209);
  }
}
.btn {
  font-weight: inherit !important;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize) !important;
  }
  100% {
    opacity: 1 !important;
  }
}
.wrapper-full-page .zoomIn {
  animation-name: zoomIn8 !important;
}
@keyframes zoomOut8 {
  from {
    opacity: 1 !important;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize) !important;
  }
}
.wrapper-full-page .zoomOut {
  animation-name: zoomOut8 !important;
}
</style>
