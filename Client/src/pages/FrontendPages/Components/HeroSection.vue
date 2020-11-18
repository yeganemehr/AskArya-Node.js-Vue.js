<template>
  <section class="hero-content-homepage">
    <div class="container">
      <div class="row pt-2">
        <div class="col-lg-7">
          <div class="hero-text-section">
            <h1 class="hero-title text-right">
              سریع ترین راه آموزش زبان انگلیسی.
            </h1>
            <p class="hero-subtitle pt-4">
              ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای
              شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.
            </p>

            <div class="button-section text-right py-4 row">
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
        <div class="col-lg-5 d-none d-lg-block">
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
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2380F'/%3E%3Cstop offset='1' stop-color='%23ef476f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='8' cy='8' r='8'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.06'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  // min-height: 48vh !important;
  width: 100%;

  .hero-text-section {
    padding-top: 1em;
  }

  .hero-title {
    font-size: 3.6em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
  }

  .hero-subtitle {
    font-size: 1.1em;
    line-height: 1.8em;
    padding-top: 1em !important;
    font-family: IranSans !important;
    color: #fff !important;
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
  width: 340px !important;
  padding-top: 2em;
  padding-bottom: 2em;
}

@media screen and (min-width: 1200px) {
  .hero-title {
    padding-left: 2em !important;
  }

  .hero-subtitle {
    padding-left: 8em !important;
  }
}

@media screen and (max-width: 650px) {
  .hero-content-homepage {
    .hero-title {
      font-size: 2.6em;
      color: #fff !important;
      margin: 0;
    }

    .hero-subtitle {
      font-size: 1em !important;
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

@media only screen and (min-width: 1500px) {
  .hero-content-homepage {
    min-height: 39vh !important;
  }
}
</style>
