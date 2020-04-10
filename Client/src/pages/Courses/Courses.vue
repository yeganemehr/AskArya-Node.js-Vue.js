<template>
  <div class="container py-5 mb-5">
    <h1 class="title">دوره‌های آموزشی</h1>
    <p class="info-text">
      در مجموع <span class="infoStyling">{{ total }} دوره </span> با محتوای
      <span class="infoStyling">{{ episodes }} درس </span> به مدت
      <span class="infoStyling">{{ hours }} ساعت </span> در سایت موجود است.
    </p>

    <!-- <h3 class="headerDigitsText text-danger text-center py-4 text-rtl">
      محتوای جدید هر هفته اضافه می شود!
    </h3> -->

    <!-- <div
      class="d-flex justify-content-around d-flex align-items-center text-center headerDigits"
    >
      <div>
        <span class="headerStyling">{{ total }}</span>
        <p>دوره</p>
      </div>
      <span class="bullet-point">•</span>
      <div>
        <span class="headerStyling">{{ episodes }}</span>
        <p>درس</p>
      </div>
      <span class="bullet-point">•</span>
      <div>
        <span class="headerStyling">{{ hours }}</span>
        <p>ساعت</p>
      </div>
    </div> -->

    <!-- Courses Section -->
    <div class="row">
      <div
        class="col-lg-3 col-md-6"
        v-for="course in courses"
        v-bind:key="course.id"
      >
        <Course v-bind="course"></Course>
      </div>

      <!-- VIP Section -->
      <div class="col-lg-12 my-5">
        <Vip></Vip>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '../FrontendPages/Components/CourseCard/Course.vue';
import Vip from './Vip.vue';

import backend from '../../backend';

export default {
  data: function () {
    return {
      courses: [],
      page: 1,
      pages: 1,
      isVIP:
        this.$root.$data.user &&
        new Date(this.$root.$data.user.vipTime) > new Date(),
      total: 0,
      hours: 0,
      episodes: 0,
    };
  },
  methods: {
    dataLoad(page) {
      backend.get('/courses?page=' + page).then((response) => {
        this.courses = response.data.docs;
        this.page = response.data.page;
        this.pages = response.data.totalPages;
        this.total = response.data.totalDocs;
        this.episodes = response.data.episodes;
        this.hours = Math.ceil(response.data.seconds / 3600);
      });
    },
  },
  mounted() {
    this.dataLoad(1);
  },

  metaInfo: {
    title:
      'آموزش های غیر حضوری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',

    titleTemplate:
      'آموزش های غیر حضوری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',
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
        content:
          'https://www.ask-arya.com/img/Ask Arya LOGO 2019 - 200x200 - OPT.png',
      },
      {
        property: 'og:description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https:/ask-arya.com/' }],
  },

  components: {
    Vip,
    Course,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 3em !important;
  font-family: IranSansBold;
  color: #fd5d93 !important;
  text-align: center;
}

.info-text {
  font-size: 1.1em !important;
  text-align: center !important;
  margin-bottom: 4.5em !important;
  color: #444444 !important;
}

.infoStyling {
  font-size: 1.1em !important;
  font-family: IranSansBold !important;
  color: rgb(17, 207, 144) !important;
}

@media only screen and (max-width: 768px) {
  .info-text {
    font-size: 0.72em !important;
    text-align: center !important;
    margin-bottom: 5em !important;
    color: #444444 !important;
  }

  .infoStyling {
    font-size: 1.2em !important;
    font-family: IranSansBold !important;
    color: rgb(17, 207, 144) !important;
  }
}
</style>
