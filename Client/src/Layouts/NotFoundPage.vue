<template>
  <div class="bg">
    <div class="text-center pt-5 container center">
      <router-link to="/">
        <img src="/img/askarya-logo.png" width="150" alt="Ask Arya Logo" />
      </router-link>
      <h1 class="pt-5">خطای ۴۰۴</h1>
      <p class="subtitle">صفحه مورد نظر پیدا نشد...</p>
      <div class="pt-5">
        <router-link to="/">
          <base-button native-type="submit" type="danger" class="btn btn-lg">
            <i class="fas fa-home ml-2"></i>
            مشاهده صفحه اصلی
          </base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  height: 100vh;
}

.center {
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-size: 5em;
  font-family: IranSansBold !important;
  color: #ef476f !important;
  margin: 0;
}

.subtitle {
  font-size: 1.4em;
  color: rgb(102, 102, 102) !important;
  font-family: IranSans !important;
  padding-top: 15px;
}

.btn {
  font-size: 1.3em;
}
</style>
