<template>
  <div class="container py-5">
    <h1 class="title mb-0 pb-4">دوره‌های آموزشی</h1>
    <p class="info-text">
      در مجموع <span class="infoStyling">{{ total }} دوره </span> با محتوای
      <span class="infoStyling">{{ episodes }} درس </span> به مدت
      <span class="infoStyling">{{ hours }} ساعت </span> در سایت موجود است.
    </p>

    <!-- <h3 class="headerDigitsText text-danger text-center py-4 text-rtl">
      محتوای جدید هر هفته اضافه می شود!
    </h3> -->

    <!-- Courses Section -->
    <div class="row">
      <div
        class="col-lg-3 col-md-6"
        v-for="course in courses"
        v-bind:key="course.id"
      >
        <CourseCard v-bind="course"></CourseCard>
      </div>

      <!-- VIP Section -->
      <div class="col-lg-12 vip-section">
        <Vip></Vip>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from './CourseCard';
// import Course from '../FrontendPages/Components/CourseCard/Course.vue';
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
    title: 'اسک آریا | دوره‌های آموزشی',
    titleTemplate: 'اسک آریا | دوره‌های آموزشی',
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
    CourseCard,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2.7em !important;
  font-family: IranSansBold;
  color: #fd5d93 !important;
  text-align: center;
}

.info-text {
  font-size: 1.13em !important;
  text-align: center !important;
  margin-bottom: 4.5em !important;
  color: #444444 !important;
}

.infoStyling {
  font-size: 1.13em !important;
  font-family: IranSansBold !important;
  color: rgb(17, 207, 144) !important;
}

.vip-section {
  margin: 3em 0 6em 0;
}

@media only screen and (max-width: 768px) {
  .info-text {
    font-size: 0.9em !important;
    text-align: center !important;
    margin-bottom: 5em !important;
    color: #5a5a5a !important;
  }

  .infoStyling {
    font-size: 1.2em !important;
    font-family: IranSansBold !important;
    color: rgb(17, 207, 144) !important;
  }
}
</style>
