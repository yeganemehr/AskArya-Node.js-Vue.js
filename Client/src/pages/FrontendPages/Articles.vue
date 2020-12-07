<template>
  <div class="container-fluid p-5">
    <h1 class="title mb-0 pb-4">مقالات آموزشی</h1>
    <p class="info-text">مقالات به‌روز و کاربردی برای افزایش سطح دانش شما.</p>

    <div class="row desktop">
      <!-- Filter Section -->
      <div class="col-xl-3 col-lg-4 col-sm-12 mb-4 d-none d-lg-block">
        <articles-filter-category></articles-filter-category>
        <articles-filter-sort class="mt-3"></articles-filter-sort>
      </div>
      <!-- Filter Section (Mobile) -->
      <div class="d-lg-none">
        <b-button
          variant="warning"
          v-b-toggle.sidebar-backdrop
          class="mb-4 mr-5"
        >
          <i class="fas fa-align-right pl-2"></i>
          دسته مقاله
        </b-button>
        <b-sidebar
          id="sidebar-backdrop"
          :backdrop-variant="variant"
          backdrop
          shadow
        >
          <div class="p-2 mt-4">
            <articles-filter-category></articles-filter-category>
            <articles-filter-sort class="mt-2 mb-5"></articles-filter-sort>
          </div>
        </b-sidebar>
      </div>

      <!-- Articles Section-->
      <div class="col-xl-9 col-lg-8 col-sm-12">
        <div id="blog " class="blog-section pb-2">
          <articles-section v-bind="{ posts: topPosts }"></articles-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesSection from './Components/Articles/ArticlesSection.vue';
import ArticlesFilterCategory from './Components/Articles/ArticlesFilterCategory.vue';
import ArticlesFilterSort from './Components/Articles/ArticlesFilterSort.vue';

export default {
  data: function () {
    return {
      topPosts: [],
    };
  },

  components: {
    ArticlesSection,
    ArticlesFilterCategory,
    ArticlesFilterSort,
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
  font-size: 2.4em !important;
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

@media only screen and (min-width: 1500px) {
  .desktop {
    margin-right: 3em;
    margin-left: 3em;
  }
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
