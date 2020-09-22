<template>
  <section>
    <div class="banner-box d-block text-center">
      <div class="banner-card">
        <router-link class="d-none d-md-block" to="/courses">
          <i class="fas bell fa-bell"></i>آیندت رو بساز! تخفیف 10٪ ویژه شروع
          پاييز.
        </router-link>
        <a class="d-md-none" href="/courses">
          <i class="fas bell fa-bell"></i>آیندت رو بساز! تخفیف 10٪ ویژه شروع
          پاييز.
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-box {
  font-family: IranSansBold;
  background-color: #fa6b6bef;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 90 90'%3E%3Ccircle fill-opacity='0.19' fill='%23ffffff' cx='45' cy='45' r='5'/%3E%3Cg fill='%23ffffff' fill-opacity='0.19'%3E%3Ccircle cx='0' cy='90' r='5'/%3E%3Ccircle cx='90' cy='90' r='5'/%3E%3Ccircle cx='90' cy='0' r='5'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3C/g%3E%3C/svg%3E");
}

.banner-card {
  justify-content: center;
  align-items: center;
  padding: 13px 10px !important;
  margin: 0 20% !important;
  position: relative;
  font-family: IranSansBold !important;
  font-size: 1em !important;

  @media (max-width: 768px) {
    margin: 0 6% !important;
    font-size: 0.85rem !important;
  }

  a {
    color: rgb(255, 255, 255) !important;
    text-shadow: 1px 1px rgba(117, 165, 209, 0.1);
  }
}

// @media screen and (max-width: 768px) {
//   .banner-box {
//     background-color: #ee756cef;
//   }
// }

.banner-card a:hover {
  text-decoration: underline;
}

.bell {
  font-size: 1.1em !important;
  padding: 0 !important;
  margin-left: 8px;
  -webkit-transform-origin: 70% 0;
  transform-origin: 70% 0;
  -webkit-animation: swinging 2.5s ease-in-out forwards infinite;
  animation: swinging 1.5s ease-in-out forwards infinite;
}

@-webkit-keyframes swinging {
  0% {
    -webkit-transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(10deg);
  }
}

@keyframes swinging {
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
