<template>
  <div class="bg" v-if="post.id">
    <div class="heading-section">
      <div class="container text-center">
        <h1 class="post-title-top text-center">{{ post.name }}</h1>
        <img class="blog-img" :src="post.image" :alt="post.name" />
        <div class="pt-4">
          <BlogInfo
            :name="post.author.name"
            :createdAt="post.createdAt"
            :categories="post.categories"
          ></BlogInfo>
        </div>
      </div>
    </div>
    <div class="container-fluid row">
      <div class="col-lg-9 col-md-8 col-sm-12">
        <div class="main-blog-text">
          <div v-html="post.content"></div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 SmallDevices">
        <Ads class="sticky" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogInfo from '../FrontendPages/Components/Blog/BlogInfo';
// import CustomCard from '../../../SingleLesson/Components/CustomCard';
import Ads from '../FrontendPages/Components/Ads';

import backend from '../../backend';

export default {
  components: {
    BlogInfo,
    Ads,
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
  padding: 1.4em 0;
  margin-bottom: 1.7em;
  background-color: #64a4ee;
}

.blog-img {
  width: 180px;
  height: 180px;
  border-radius: 15px;
}

.post-title-top {
  font-size: 2em !important;
  font-family: IranSansBold;
  line-height: inherit !important;
  color: rgb(255, 255, 255) !important;
  padding-bottom: 0.7em !important;
}

.post-title {
  text-align: center;
  font-family: IranSansBold;
  padding-bottom: 1em !important;
}

.main-blog-text {
  margin-right: 4em;
  font-size: 1.2em !important;
  line-height: 2.3em !important;
  direction: ltr !important;
  font-family: IranSansBlog !important;
  color: black !important;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  margin-top: 90px;
  // margin-left: 3em;
  top: 10em;
  margin-bottom: 7em;
  padding: 0 1.2em;
}

.small-devices {
  display: none;
}

@media only screen and (min-width: 1400px) {
  .sticky {
    margin-left: 2.5em;
  }
}

@media only screen and (min-width: 1200px) {
  .main-blog-text {
    margin: 90px 19em 5em 4em !important;
  }
}

@media only screen and (min-device-width: 679px) and (max-device-width: 1024px) and (orientation: portrait) {
  .main-blog-text {
    margin: 90px 3em 1em 0;
  }
}

@media screen and (max-width: 1300px) {
  .small-devices {
    display: block;
  }
}

@media only screen and (max-width: 678px) {
  .white-content .card:not(.card-white) {
    margin-top: 1em;
    background: #ffffff;
    border-radius: 0;
    color: black !important;
  }

  .post-title-top {
    font-size: 1.5em !important;
  }

  .heading-section {
    border-bottom-left-radius: 1%;
    border-bottom-right-radius: 1%;
  }

  .blog-img {
    width: 200px !important;
    height: 200px !important;
  }

  .main-blog-text {
    margin: 0 !important;
    font-size: 1.12em !important;
    color: black !important;
    padding: 1em 2em 3em 0.1em !important;
  }

  .sticky {
    display: none !important;
  }
}
</style>
