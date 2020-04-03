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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
  background: #f1f1f1 !important;
}

.card-body {
  border-radius: 0 0 15px 15px !important;
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

.home-blog .card:hover {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
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
  font-family: IranSans !important;
  font-size: 0.9em !important;
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
  background-color: #f1f1f1 !important;
  border-top: 1px solid rgba(158, 158, 158, 0.1);
  padding: 1em 1.2em 0 1.2em;

  .card-footer-text {
    color: #00000059 !important;
    font-size: 0.95em;
  }
}

@media only screen and (max-width: 768px) {
  .home-blog .card-title {
    font-size: 1.15em !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
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
