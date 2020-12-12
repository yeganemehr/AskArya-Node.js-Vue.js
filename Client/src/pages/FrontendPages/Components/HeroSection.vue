<template>
  <section class="hero-content-homepage">
    <div class="container">
      <div class="row pt-2">
        <div class="col-lg-6">
          <div class="hero-text-section">
            <h1 class="hero-title">
              سریع ترین راه آموزش <br />
              زبان انگلیسی.
            </h1>
            <p class="hero-subtitle py-3">
              ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری
              <br class="display-desktop" />
              زبان برای شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.
            </p>

            <div class="button-section text-right pb-4 row">
              <router-link to="dashboard">
                <button native-type="submit" class="btn btn-signin">
                  <i class="far fa-user ml-2"></i>
                  پنل کاربری
                </button>
              </router-link>

              <router-link to="quizzes">
                <button native-type="submit" class="btn btn-quiz mr-3">
                  <i class="far fa-check-square ml-2"></i> آزمون های آنلاین
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6 d-none d-lg-block">
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

<style lang="scss" scoped>
.hero-content-homepage {
  background-color: #f52785;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(222,960,468)'%3E%3Cstop offset='0' stop-color='%23f52785'/%3E%3Cstop offset='1' stop-color='%23833aea'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='504' height='420' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  width: 100%;

  .hero-text-section {
    padding-top: 1em;
  }

  .hero-title {
    font-size: 3.6em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
    text-align: right;
  }

  .hero-subtitle {
    font-size: 1.1em;
    line-height: 1.8em;
    font-family: IranSans !important;
    color: rgba(255, 255, 255, 0.8) !important;
    text-align: right;
  }

  .btn {
    border-radius: 7px;
    font-size: 1em;
    padding-left: 1.4em;
    padding-right: 1.4em;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.03), 0 1px 3px rgba(0, 0, 0, 0.03);
  }

  .btn-signin {
    color: #c84dae;
    background: #fff !important;
    border-color: #fff !important;
    border: 1px dashed #fff !important;
  }

  .btn-signin:hover {
    color: #fff !important;
    background: #c84dae !important;
  }

  .btn-quiz {
    color: #fff !important;
    border: 1px dashed rgba(255, 255, 255, 0.6) !important;
    background: transparent !important;
  }

  .btn-quiz:hover {
    color: #c84dae !important;
    background-color: #fff !important;
    border-color: #fff !important;
  }
}

.image {
  width: 350px !important;
  padding-top: 2em;
  padding-bottom: 2em;
}

@media screen and (max-width: 650px) {
  .hero-content-homepage {
    .hero-title {
      font-size: 2.4em;
      color: #fff !important;
      margin: 0;
    }

    .hero-subtitle {
      font-size: 1em !important;
      padding-top: 20px !important;
      color: rgba(255, 255, 255, 0.9) !important;
      margin-bottom: 0 !important;
    }

    .btn {
      font-size: 0.95em !important;
      font-family: IranSansBold;
      margin-top: 0.7em !important;
      margin-bottom: 0.4em !important;
    }
  }

  .btn-quiz {
    padding: 8px 10px !important;
  }

  .btn-signin {
    padding: 8px 26px !important;
  }

  .button-section {
    -webkit-box-pack: right !important;
    justify-content: right !important;
    padding-right: 0.8em;
  }

  .hero-text-section {
    padding-right: 1em;
  }

  .top-courses-section {
    .top-section-header {
      font-size: 1em !important;
      text-align: right !important;
    }
  }
}

@media only screen and (max-width: 500px) {
  .hero-title {
    font-size: 2.1em !important;
  }
}

@media only screen and (max-width: 800px) {
  .display-desktop {
    display: none !important;
  }
}

@media only screen and (min-width: 1500px) {
  .hero-content-homepage {
    min-height: 39vh !important;
  }
}
</style>
