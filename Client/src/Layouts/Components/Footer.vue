<template>
  <div>
    <footer class="footer-bottom">
      <div class="container">
        <div class="footer-top">
          <div class="row text-right">
            <div class="col-md-5 about-us">
              <h4 class="title text-white">درباره اسک آریا</h4>
              <hr class="fadeline3 d-none d-md-block" />
              <p class="text-white custom-text">
                اسک آریا یکی از پرتلاش‌ترین و بروزترین وبسایت های آموزشی در سطح
                ایران است که همیشه تلاش کرده تا بتواند جدیدترین و بروزترین
                مقالات و دوره‌های آموزشی را در اختیار علاقه‌مندان ایرانی قرار
                دهد.
              </p>
            </div>
            <div class="col-md-2 askarya-sections">
              <hr class="fadeline3 d-md-none" />
              <h4 class="title text-white">بخش های سایت</h4>
              <hr class="fadeline3 d-none d-md-block" />
              <ul>
                <li class="footer-li">
                  <router-link to="/privateclasses">کلاس های حضوری</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="/courses">دوره‌ های غیر حضوری</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="/terms">قوانین و مقررات</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="/contact">تماس با ما</router-link>
                </li>
              </ul>
            </div>
            <div class="col-md-5 contact-section">
              <hr class="fadeline3 d-md-none" />
              <h4 class="title text-white">ارتباط با ما</h4>
              <hr class="fadeline3 d-none d-md-block" />
              <p class="text-white">
                شما میتوانید با استفاده از یکی از راه‌های زیر با ما ارتباط
                برقرار کنید:
              </p>
              <p class="telegram">
                <a href="https://t.me/AskAryaSomething" class="li-ic">
                  شماره تلگرام:‌ 09032227796
                  <i class="fab fa-telegram icon-text pl-1"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer class="copyright text-center">
      <div class="container">
        <p class="copyright-text">
          <!-- &copy;  -->
          طراحی و تولید شده توسط
          <router-link to="/terms">اسک آریا</router-link>، با افتخار در ایران
          <i class="tim-icons icon-heart-2 text-primary"></i>
          سال ١٣٩۹
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer-bottom {
  background: #212942 !important;
  padding: 25px 0 !important;
  color: #fff !important;
  line-height: 2 !important;
  clear: both !important;
  font-size: 1em !important;
  .fadeline3 {
    background-color: #777777c2 !important;
  }
  .title {
    font-size: 1em !important;
    font-family: IranSansBold !important;
  }
  ul {
    list-style: none !important;
    padding: 0 0 !important;
  }
  a {
    color: #fff !important;
    font-family: IranSans !important;
  }
  .telegram {
    direction: ltr !important;
  }
  .fab {
    font-size: 1.2em !important;
    color: #fff !important;
  }
}
.copyright {
  padding: 20px 0 !important;
  background: #1c2236 !important;
  color: #fff !important;
}
.copyright,
a {
  color: #cd57e0;
}
.copyright-text {
  color: rgba(255, 255, 255, 0.6) !important;
}
@media only screen and (max-width: 678px) {
  .footer-bottom .title {
    font-size: 1.2em !important;
  }
  .custom-text,
  a {
    font-size: 1.13em !important;
  }

  .copyright-text {
    font-size: 0.7em !important;
  }

  .footer-bottom {
    font-size: 0.93em !important;
  }
}
</style>
