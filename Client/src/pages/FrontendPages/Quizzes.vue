<template>
  <div class="container py-5">
    <h1 class="title mb-0">
      آزمون ها
    </h1>
    <p class="info-text py-4">
      با آزمون های اسک آریا، در کمترین زمان از سطح دقیق زبان خود مطلع شوید!
    </p>

    <!-- QUIZZES SECTION -->
    <quiz1 class="my-5"></quiz1>

    <!-- <p class="text-right pt-4">
      محدودیت زمانی برای پاسخ دادن به سوالات وجود ندارد
    </p>
    <p class="text-right">
      حتما باید پاسخ سوال فعلی را وارد کنید تا به سوال بعدی بروید.
    </p> -->
    <!-- <li>تمامی سوال ها چهار گزینه ای می باشند.</li> -->
    <!-- <li>در هر مرحله از آزمون, شما میتوانید به آزمون پایان دهید.</li> -->

    <!-- <div class="row mt-3 my-5">
      <div class="col-md-3 mt-5">
        <div class="card">
          <h1>آزمون‌ها</h1>
          <ul>
            <li>تمامی سوال ها چهار گزینه ای می باشند.</li>
            <li>محدودیت زمانی برای پاسخ دادن به سوالات وجود ندارد</li>
            <li>در هر مرحله از آزمون, شما میتوانید به آزمون پایان دهید.</li>
            <li>
              حتما باید پاسخ سوال فعلی را وارد کنید تا به سوال بعدی بروید.
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <quiz1 class="my-5"></quiz1>
      </div>
    </div> -->
  </div>
</template>

<script>
import Quiz1 from '../FrontendPages/Components/QuizComponents/Quiz1';

export default {
  components: { Quiz1 },

  metaInfo: {
    title: 'اسک آریا | آزمون ها',
    titleTemplate: 'اسک آریا | آزمون ها',
    htmlAttrs: {
      lang: 'fa',
      amp: true,
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.ask-arya.com/',
      },
      {
        property: 'og:image',
        content: 'https://www.ask-arya.com/img/askarya-logo.png',
      },
      {
        property: 'og:description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https://www.ask-arya.com/' }],
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 2.9em !important;
  font-family: IranSansBold;
  color: #fd5d93 !important;
  text-align: right;
}

.info-text {
  font-size: 1em !important;
  text-align: right !important;
  margin-bottom: 2em !important;
  color: #5c5c5c !important;
}

.card {
  border-radius: 8px !important;
  // background: #e64971 !important;
  // color: white !important;
  // background: #f1f1f1 !important;
  // text-align: right;
  // padding: 12px;
  // box-shadow: 0 14px 20px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1) !important;

  h1 {
    font-family: IranSansBold;
    font-size: 1.3em !important;
    color: rgb(24, 24, 24) !important;
  }

  li {
    color: rgb(94, 94, 94) !important;
  }
}

@media (max-width: 678px) {
}
</style>
