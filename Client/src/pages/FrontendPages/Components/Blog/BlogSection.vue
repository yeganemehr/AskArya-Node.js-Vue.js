<template>
  <div class="home-blog container pt-5">
    <h1 class="section-header text-right">آخرین مقالات</h1>
    <p class="subtitle text-right mb-5">
      مقالات به‌روز و کاربردی برای افزایش سطح دانش شما
    </p>
    <div class="row">
      <div
        class="col-lg-3 col-md-6 col-sm-12"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <BlogCard
          :slug="post.slug"
          :image="post.image"
          :name="post.name"
          :createdAt="post.createdAt"
          :categories="post.categories"
          :tags="post.tags"
          :views="post.views"
        ></BlogCard>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from './BlogCard.vue';

export default {
  props: ['posts'],
  components: {
    BlogCard,
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.6em;
  font-family: IranSansBold;
  margin: 0 0 7px 0;
}

.subtitle {
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.3) !important;
}
</style>
