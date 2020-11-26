<template>
  <div class="container-fluid p-5">
    <h1 class="title mb-0 pb-4">مقالات آموزشی</h1>
    <p class="info-text">مقالات به‌روز و کاربردی برای افزایش سطح دانش شما.</p>

    <div class="row">
      <!-- Filter Section -->
      <div class="col-md-3">
        <blog-filter></blog-filter>
      </div>

      <!-- Blog Section-->

      <div class="col-md-9">
        <div id="blog " class="blog-section pb-2">
          <blog-section v-bind="{ posts: topPosts }"></blog-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogSection from './Components/Blog/BlogSection.vue';
import BlogFilter from './Components/Blog/BlogFilter.vue';

export default {
  data: function () {
    return {
      topPosts: [],
    };
  },

  components: {
    BlogSection,
    BlogFilter,
  },

  methods: {
    dataLoad() {
      this.topPosts = this.$root.$data.topPosts;
    },
  },
  mounted() {
    this.dataLoad();
  },
  watch: {},

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
.title {
  font-size: 2.3em !important;
  font-family: IranSansBold;
  color: #ef476f !important;
  text-align: center;
}

.info-text {
  font-size: 1.03em !important;
  text-align: center !important;
  margin-bottom: 4.5em !important;
  color: #444444 !important;
}

@media only screen and (max-width: 768px) {
  .info-text {
    font-size: 0.9em !important;
    text-align: center !important;
    margin-bottom: 5em !important;
    color: #5a5a5a !important;
  }
}
</style>
