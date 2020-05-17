<template>
  <section class="hero-content-homepage">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-md-6">
          <div class="hero-text-section">
            <h1 class="hero-title text-right">
              سریع ترین راه آموزش زبان انگلیسی.
            </h1>
            <p class="hero-subtitle py-1">
              ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای
              شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.
            </p>

            <div class="button-section pt-3 row">
              <router-link to="dashboard">
                <base-button
                  native-type="submit"
                  type="warning"
                  class="btn animation-on-hover"
                >
                  <i class="far fa-user ml-2"></i>
                  ورود به پنل کاربری
                </base-button>
              </router-link>

              <router-link to="quizzes">
                <base-button
                  native-type="submit"
                  class="btn btn-simple animation-on-hover mr-2"
                >
                  <i class="far fa-check-square ml-2"></i> آزمون های آنلاین
                </base-button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 d-none d-md-block">
          <img
            class="image img-fluid"
            src="/img/frontend/loginscreenbg.svg"
            alt="Picture of our fearless leader 2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.image {
  width: 400px !important;
  padding-top: 3em;
  padding-bottom: 2em;
}

.hero-content-homepage {
  background-color: #6e00ff;
  // background: linear-gradient(270deg, #da52fc, #6e70fc);
  background: linear-gradient(50deg, #6e00ff 0, #bb00ff 100%);
  background-size: cover;
  background-position: bottom;
  min-height: 44vh !important;
  width: 100%;

  .hero-title {
    font-size: 4.3em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
  }

  .hero-subtitle {
    font-size: 1.2em;
    line-height: 1.7em;
    font-family: IranSans !important;
    color: #fff !important;
    text-align: right;
  }

  .btn {
    border-radius: 14px !important;
    font-size: 1.1em;
    padding-left: 15px;
    padding-right: 15px;
  }

  .btn.btn-simple {
    color: #ffffff;
    border-color: #ffffff79;
  }
}

@media screen and (min-width: 769px) {
  .button-section {
    padding-right: 1em !important;
  }
}

@media screen and (max-width: 768px) {
  .hero-content-homepage {
    // background: linear-gradient(#bb00fff8, #6f00ffc7) !important,
    //   url(/img/frontend/confused-banner.svg) no-repeat;
    text-align: center;
    min-height: 42vh !important;

    .hero-title {
      font-size: 3.85em !important;
      color: #fff !important;
      text-align: center !important;
      padding-top: 0.3em;
      margin: 0 0 10px 0;
    }

    .hero-subtitle {
      font-size: 1.1em;
      text-align: center !important;
      margin-bottom: 0 !important;
    }

    .btn {
      font-weight: inherit;
      border-radius: 30px;
      padding: 12px 10px;
      font-size: 1.1em;
      font-family: IranSansBold;
      margin-bottom: 2.5em;
    }
  }

  .button-section {
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }

  .top-courses-section {
    .top-section-header {
      font-size: 1em !important;
      text-align: right !important;
    }
  }
}

@media only screen and (min-width: 1500px) {
  .hero-content-homepage {
    height: 45vh !important;
  }
}
</style>
