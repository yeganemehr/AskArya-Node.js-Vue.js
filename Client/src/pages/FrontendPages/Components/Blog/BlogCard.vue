<template>
  <div class="blogBox pb-2">
    <router-link :to="`/blog/${slug}`">
      <div class="card">
        <img class="card-img-top" :src="image" :alt="name" />
        <div class="category">
          {{ categories.length ? categories[categories.length - 1].name : '' }}
        </div>
        <div class="card-body">
          <h3 class="card-title" :class="isLtr ? 'title-ltr' : ''">
            {{ name }}
          </h3>
          <div class="d-flex justify-content-between card-footer">
            <span class="card-footer-text">
              {{ views }}
              <i class="fa fa-eye"></i>
            </span>

            <div class="card-footer-text">
              <span class="pl-2">{{ publishedAt }}</span>
              <i class="far fa-calendar-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'jalali-moment';

export default {
  props: ['slug', 'image', 'tags', 'categories', 'name', 'createdAt', 'views'],
  computed: {
    publishedAt: function () {
      return moment(this.createdAt).locale('fa').format('YYYY-MM-DD');
    },
    isLtr: function () {
      const regex = /[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/gm;
      return !regex.test(this.name.trim());
    },
  },
};
</script>
<style lang="scss" scoped>
.home-blog .card {
  border-radius: 10px !important;
  background: transparent;
  box-shadow: 0 8px 16px 4px rgba(41, 41, 41, 0.2) !important;
  -moz-box-shadow: 0 8px 16px 4px rgba(41, 41, 41, 0.2) !important;
  -webkit-box-shadow: 0 8px 16px 4px rgba(41, 41, 41, 0.2) !important;
  -o-box-shadow: 0 8px 16px 4px rgba(41, 41, 41, 0.2) !important;
}

.home-blog .card-title {
  color: #292929;
  font-size: 15px !important;
  font-family: IranSansBold;
  text-align: center !important;
}

.blogBox {
  border-radius: 10px !important;
}

.home-blog .card-img-top {
  border-radius: 10px 10px 0 0 !important;
}

.card-body {
  background: rgb(241, 241, 241) !important;
  border-radius: 0 0 15px 15px !important;
}

.home-blog .card:hover {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.5) !important;
  box-shadow: 40px rgba(121, 121, 121, 0.5) !important;
  transition: transform 0.8s !important;
  -webkit-transform: translateY(-4px) !important;
  transform: translateY(-4px) !important;
  cursor: pointer !important;
}

.home-blog .category {
  top: 1em;
  left: 1em;
  border-radius: 15px;
  position: absolute;
  padding: 4px 10px;
  color: rgb(53, 53, 53) !important;
  background: rgb(241, 241, 241) !important;
  font-family: IranSans;
  text-align: center !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card:hover .category {
  background: #00b35f !important;
  color: white !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.home-blog .card:hover .card-title {
  color: #00b35f !important;
}

.card .card-footer {
  background-color: transparent;
  border-top: 1px solid rgba(158, 158, 158, 0.1);
  padding: 1em 1.2em 0 1.2em;

  .card-footer-text {
    color: #00000059 !important;
    font-size: 0.95em;
  }
}

@media only screen and (max-width: 768px) {
  .home-blog .card-title {
    font-size: 1.1em !important;
  }

  .card .card-footer .card-footer-text {
    font-size: 1em !important;
  }

  .category,
  .card-category {
    font-size: 1em;
  }
}
</style>
