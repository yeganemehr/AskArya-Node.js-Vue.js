<template>
  <section class="hero-content-homepage">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6">
          <div class="hero-text-section">
            <h1 class="hero-title text-right">
              سریع ترین راه آموزش زبان انگلیسی.
            </h1>
            <p class="hero-subtitle py-1">
              ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای
              شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.
            </p>

            <div class="button-section row">
              <router-link to="dashboard">
                <button native-type="submit" class="btn btn-signin">
                  <i class="far fa-user ml-2"></i>
                  پنل کاربری
                </button>
              </router-link>

              <router-link to="quizzes">
                <button native-type="submit" class="btn btn-quiz mr-2">
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
.image {
  width: 400px !important;
  padding-top: 3em;
  padding-bottom: 2em;
}

.hero-content-homepage {
  // background-color: #6e00ff;
  // background: linear-gradient(30deg, #6e00ff 0, #bb00ff 100%);
  background-color: #ef476f;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23ff5c82' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23ff5c82'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
  min-height: 45vh !important;
  width: 100%;

  .hero-title {
    font-size: 4.2em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
  }

  .hero-subtitle {
    font-size: 1.2em;
    line-height: 1.7em;
    font-family: IranSans !important;
    color: rgb(243, 243, 243) !important;
    text-align: right;
  }

  .btn {
    border-radius: 7px !important;
    font-size: 1.15em;
    padding-left: 1.4em;
    padding-right: 1.4em;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.03), 0 1px 3px rgba(0, 0, 0, 0.03);
  }

  .btn-signin {
    color: #ef476f;
    background: #fff !important;
    border-color: #fff !important;
    border: 1px solid #fff !important;
  }

  .btn-signin:hover {
    color: #fff !important;
    background: #ef476f !important;
    border: 1px solid #fff !important;
  }

  .btn-quiz {
    color: #fff !important;
    border: 1px solid #fff !important;
    background: transparent !important;
  }

  .btn-quiz:hover {
    color: #ef476f !important;
    background-color: #fff !important;
    border-color: #fff !important;
  }
}

@media screen and (min-width: 769px) {
  .button-section {
    padding: 1em !important;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .hero-content-homepage {
    min-height: 20vh !important;
  }

  .hero-text-section {
    padding: 2em 1.5em 1.5em 1em;
  }

  .hero-title {
    padding: 0 2em 0.7em 2em;
  }
}

@media screen and (max-width: 1000px) {
  .hero-content-homepage {
    .hero-title {
      font-size: 3.5em !important;
      color: #fff !important;
      text-align: center !important;
      padding-top: 0.5em;
      margin: 0;
    }

    .hero-subtitle {
      font-size: 1.1em;
      text-align: center !important;
      margin-bottom: 0 !important;
      padding: 0 1em;
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
    padding-top: 1.2em;
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
