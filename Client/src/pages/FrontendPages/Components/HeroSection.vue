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
.hero-content-homepage {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2380F'/%3E%3Cstop offset='1' stop-color='%23ef476f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='8' cy='8' r='8'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.06'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
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
    color: white !important;
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
    border: 1px solid #ef476f !important;
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

.image {
  width: 380px !important;
  padding-top: 3em;
  padding-bottom: 2em;
}

@media screen and (min-width: 769px) {
  .button-section {
    padding: 1em !important;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .hero-content-homepage {
    min-height: 23vh !important;
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
      font-size: 3.8em !important;
      color: #fff !important;
      text-align: center !important;
      padding-top: 0.43em !important;
      margin: 0;
    }

    .hero-subtitle {
      font-size: 1.1em;
      text-align: center !important;
      margin-bottom: 0 !important;
      padding: 1.6em 1.3em 0.2em 1.3em !important;
    }

    .btn {
      font-weight: inherit;
      border-radius: 30px;
      padding: 12px 14px;
      font-size: 1.1em;
      font-family: IranSansBold;
      margin-bottom: 2em !important;
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
    min-height: 45vh !important;
  }
}
</style>
