<template>
  <div class="blogBox mb-4">
    <router-link :to="`/article/${slug}`">
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
  background: #f1f1f1 !important;
  border: none !important;
}

.blogBox {
  border-radius: 10px !important;
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
}

.card-body {
  border-radius: 0 0 15px 15px !important;
  padding-bottom: 0.8em;
}

.card-title {
  color: #292929;
  font-size: 0.94em !important;
  font-family: IranSansBold;
  text-align: center !important;
}

.home-blog .card-img-top {
  border-radius: 10px 10px 0 0 !important;
}

.home-blog .card:hover {
  box-shadow: 0 15px 12px rgba(0, 0, 0, 0.1) !important;
  transition: transform 1s !important;
  -webkit-transform: translateY(-2px) !important;
  transform: translateY(-2px) !important;
  cursor: pointer !important;
}

a:hover {
  text-decoration: none !important;
}

.home-blog .category {
  top: 1em;
  left: 1em;
  border-radius: 15px;
  position: absolute;
  padding: 4px 13px;
  color: rgb(53, 53, 53) !important;
  background: rgb(241, 241, 241) !important;
  font-family: IranSans !important;
  font-size: 0.8em !important;
  text-align: center !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card:hover .category {
  background: #ef476f !important;
  color: white !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.home-blog .card:hover .card-title {
  color: #ef476f !important;
}

.card .card-footer {
  background-color: #f1f1f1 !important;
  border-top: 1px solid rgba(116, 116, 116, 0.1);
  padding: 0.7em 0 0 0;

  .card-footer-text {
    color: #7d8597 !important;
    font-size: 0.8em !important;
  }
}

// @media all and (max-width: 1400px) and (min-width: 1199px) {
//   .card-title {
//     font-size: 0.7em !important;
//   }
// }
</style>
