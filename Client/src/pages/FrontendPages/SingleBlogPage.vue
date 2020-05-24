<template>
  <div class="bg" v-if="post.id">
    <div class="heading-section">
      <div class="container text-center">
        <h1 class="post-title-top text-center">{{ post.name }}</h1>
        <img class="blog-img" :src="post.image" :alt="post.name" />
        <div class="pt-5 pb-2">
          <BlogInfo
            :name="post.author.name"
            :createdAt="post.createdAt"
            :categories="post.categories"
          ></BlogInfo>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="main-blog-text">
        <div v-html="post.content"></div>
      </div>
      <!-- <div>
      <custom-card :class="SmallDevices" />
    </div> -->
    </div>
  </div>
</template>

<script>
import BlogInfo from '../FrontendPages/Components/Blog/BlogInfo';
// import CustomCard from '../../../SingleLesson/Components/CustomCard';

import backend from '../../backend';

export default {
  components: {
    BlogInfo,
    // CustomCard
  },
  data() {
    return {
      post: {},
      // sticky: 'sticky',
      // SmallDevices: 'small-devices'
    };
  },
  methods: {
    dataLoad() {
      backend.get(`blog/${this.$route.params.slug}`).then((response) => {
        this.post = response.data.post;
      });
    },
  },
  mounted() {
    this.dataLoad();
  },

  metaInfo: {
    title: 'کلاس های خصوصی | اسک آریا',
    titleTemplate: 'کلاس های خصوصی | اسک آریا',
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
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https:/www.ask-arya.com/' }],
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #fafafa;
}

.heading-section {
  padding: 2em 0;
  margin-bottom: 1.7em;
  background-color: #64a4ee;
  // background-color: #7f53ac;
  // background-image: linear-gradient(to left, #a73ffc 0%, #64a4ee 74%);
  // border-bottom-left-radius: 15%;
  // border-bottom-right-radius: 15%;
}

.blog-img {
  width: 200px;
  height: 200px;
  border-radius: 15px;
}

.post-title-top {
  font-size: 2.2em;
  font-family: IranSansBold;
  line-height: inherit !important;
  color: rgb(255, 255, 255) !important;
}

.post-title {
  text-align: center;
  font-family: IranSansBold;
  padding-bottom: 1em;
}

.main-blog-text {
  padding: 4%;
  margin: 0 6% 0 14%;
  font-size: 1.34em !important;
  line-height: 2.3em !important;
  direction: ltr !important;
  font-family: IranSansBlog !important;
  color: black !important;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  margin-top: 1em;
  top: 6em;
  padding: 0 1.2em;
}

.small-devices {
  display: none;
}

@media only screen and (min-width: 1500px) {
  .main-blog-text {
    margin: 0 6% 0 8%;
  }
}

@media only screen and (max-width: 678px) {
  .white-content .card:not(.card-white) {
    margin-top: 1em;
    background: #ffffff;
    border-radius: 0;
    color: black !important;
  }

  .heading-section {
    border-bottom-left-radius: 1%;
    border-bottom-right-radius: 1%;
  }

  .blog-img {
    width: 260px;
    height: 260px;
  }

  .main-blog-section {
    padding: 0 3% 8% 3%;
  }

  .main-blog-text {
    margin: 0 !important;
    font-size: 1.2em !important;
    color: black !important;
  }

  .sticky {
    display: none !important;
  }

  .small-devices {
    padding: 15px 20%;
    display: block;
  }
}
</style>
