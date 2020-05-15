<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Top Courses Section -->
    <div class="container pt-5 pb-4">
      <div class="top-courses-section">
        <h1 class="section-header text-right">دوره‌های آموزشی</h1>
        <p class="subtitle text-right mb-4">
          پیشنهادهای ویژه اسک آریا برای شما.
        </p>

        <div class="row pt-3">
          <div
            class="col-lg-3 col-md-6 col-sm-12"
            v-for="course in topCourses"
            v-bind:key="course.id"
          >
            <Course v-bind="course"></Course>
          </div>
        </div>
        <div class="text-center">
          <router-link to="courses">
            <base-button
              native-type="submit"
              type="success"
              class="btn btn-round animation-on-hover mt-4"
            >
              <i class="fas fa-graduation-cap ml-2"></i>
              مشاهده همه دوره ها</base-button
            >
          </router-link>
        </div>
      </div>
    </div>

    <!--Improvement Banner 1-->
    <div class="pt-5">
      <ImprovementBanner1></ImprovementBanner1>
    </div>

    <!-- Blog Section-->
    <div id="blog" class="blog-section pb-2">
      <blog-section v-bind="{ posts: topPosts }"></blog-section>
    </div>

    <!--Improvement Banner 2-->
    <div id="element" class="pt-4">
      <ImprovementBanner2></ImprovementBanner2>
    </div>

    <!-- News Section-->
    <!-- <div class="container py-5">
      <news-component></news-component>
    </div> -->

    <!--Founder Section-->
    <div class="founder-section-homepage py-5">
      <founder-section></founder-section>
    </div>
  </div>
</template>

<script>
import HeroSection from './Components/HeroSection/HeroSection.vue';
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/CourseCard/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';
import ImprovementBanner1 from './Components/ImprovementBanners/ImprovementBanner1.vue';
import ImprovementBanner2 from './Components/ImprovementBanners/ImprovementBanner2.vue';
// import NewsComponent from './Components/NewsComponent/NewsComponent.vue';

export default {
  data: function () {
    return {
      topCourses: [],
      topPosts: [],
    };
  },
  methods: {
    dataLoad() {
      this.topCourses = this.$root.$data.topCourses;
      this.topPosts = this.$root.$data.topPosts;
    },
  },
  mounted() {
    this.dataLoad();
  },
  watch: {},
  components: {
    HeroSection,
    FounderSection,
    Course,
    BlogSection,
    ImprovementBanner1,
    ImprovementBanner2,
    // NewsComponent,
  },

  metaInfo: {
    title: 'اسک آریا | آموزش زبان انگلیسی',
    titleTemplate: 'اسک آریا | آموزش زبان انگلیسی',
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
    link: [{ rel: 'canonical', href: 'https://www.ask-arya.com/' }],
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.6em;
  font-family: IranSansBold;
  letter-spacing: -0.02em !important;
  margin: 0 0 10px 0;
}

.subtitle {
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.3) !important;
}

.fadeline2 {
  height: 1px !important;
  margin: 40px 20% 0 20% !important;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  ) !important;
}
.btn {
  font-weight: inherit !important;
}

.blog-section {
  margin: 3em 0 3em 0 !important;
}
</style>
