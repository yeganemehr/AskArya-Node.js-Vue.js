<template>
  <section class="hero-content-homepage">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-md-6">
          <div class="hero-text-section">
            <h1 class="hero-title text-right">
              سریع ترین راه آموزش زبان انگلیسی.
            </h1>
            <p class="text-right hero-subtitle py-1">
              ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای
              شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.
            </p>

            <div class="py-2 pr-2 row">
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

              <div class="pr-1">
                <router-link to="courses">
                  <base-button
                    native-type="submit"
                    type="primary"
                    class="btn animation-on-hover"
                  >
                    <i class="far fa-check-square ml-2"></i> آزمون ها
                  </base-button>
                </router-link>
              </div>
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
  background-color: #6e72fc;
  background: linear-gradient(90deg, #c04ceeb6 0%, #6e73fce7 84%);
  background-size: cover;
  background-position: bottom;
  min-height: 44vh !important;
  width: 100%;

  .hero-title {
    font-size: 4.2em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
    text-shadow: 2px 2px #5256c91f;
  }

  .hero-subtitle {
    font-size: 1.2em;
    line-height: 1.7em;
    font-family: IranSans !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .btn {
    border-radius: 10px !important;
    font-size: 1.1em;
    padding-left: 14px;
    padding-right: 14px;
  }
}

@media screen and (max-width: 768px) {
  .hero-content-homepage {
    background: linear-gradient(225deg, #d223e9f5, #5e62dff3),
      url(/img/frontend/confused-banner.svg) no-repeat;
    background-position: bottom left;
    background-size: cover;
    // background: linear-gradient(225deg, #d223e9f6, #5e62dff1);
    // background-size: cover;
    // background-position: top;
    min-height: 43vh !important;

    .hero-title {
      font-size: 3.6em !important;
      color: #fff !important;
      text-shadow: 2px 2px #7b149b15;
      text-align: right !important;
      padding-top: 0.5em;
      margin: 0 0 15px 0;
    }

    .hero-subtitle {
      padding-left: 1.1em;
      font-size: 1.1em;
      text-align: right !important;
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
    justify-content: right !important;
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
