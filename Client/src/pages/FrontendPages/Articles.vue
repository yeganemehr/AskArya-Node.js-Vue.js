<template>
  <div class="container py-5">
    <h1 class="page-title">
      مقالات آموزشی
      <span>مقالات به‌روز و کاربردی برای افزایش سطح دانش شما</span>
    </h1>

    <hr />

    <div class="row mt-5">
      <div
        class="col-lg-3 col-md-6 col-sm-12 blog-section"
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
import BlogCard from '../FrontendPages/Components/Blog/BlogCard';

export default {
  components: { BlogCard }
};
</script>

<style scoped lang="scss">
.page-title {
  font-size: 1.9rem !important;
  color: rgb(0, 0, 0) !important;
  font-family: IranSansBold !important;
  padding-bottom: 1.4em !important;
  text-align: center !important;
  span {
    display: block !important;
    padding-top: 1.1em !important;
    color: rgba(0, 0, 0, 0.4) !important;
    font-size: 1rem !important;
    font-family: IranSans !important;
  }
}
.article-section {
  padding-top: 1em !important;
  padding-bottom: 2em !important;
}
@media (max-width: 768px) {
  .article-section {
    padding: 0 4% !important;
  }
  .page-title {
    span {
      font-size: 0.5em !important;
    }
  }
}
@media (max-width: 468px) {
  .article-section {
    padding: 0 10% !important;
  }
}
</style>
