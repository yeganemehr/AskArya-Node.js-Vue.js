<template>
  <div class="widget-vip px-3 mb-5 text-center">
    <p class="vip-title pt-3">
      <i class="fas fa-unlock pl-2 icon w-100"></i>
      عضویت ویژه
    </p>
    <p class="vip-desc text-center pb-3">
      با خریداری این پنل کاربری شما میتوانید به ویدیوهای ویژه سایت به بطور کامل
      دسترسی داشته باشید.
    </p>

    <b-button native-type="submit" to="/dashboard" class="btn-vip">
      <i class="fas fa-shopping-basket pl-1"></i>
      شارژ عضویت ویژه
    </b-button>
  </div>
</template>

<style lang="scss" scoped>
.widget-vip {
  background-image: linear-gradient(270deg, #ad1deb, #6e72fc);
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
}

.vip-title {
  font-size: 1.6em !important;
  color: white !important;
  text-align: center;
  font-family: IranSansBold !important;

  .icon {
    font-size: 1.5em;
    padding-bottom: 8px;
  }
}

.vip-desc {
  font-size: 0.95em;
  color: rgba(255, 255, 255, 0.9) !important;
}

.btn-vip {
  color: #fff !important;
  background-color: #ef476f !important;
  border: #ef476f !important;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 0.95em;
}

@media (max-width: 880px) {
  .widget-vip {
    margin-right: 2.5em;
    margin-left: 2.5em;
  }
}

@media (max-width: 678px) {
  .dropdown-prices {
    text-align: center !important;
    padding-bottom: 15px;
  }
  .vip-title {
    font-size: 1.8em !important;
  }
}
</style>
