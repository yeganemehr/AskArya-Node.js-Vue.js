<template>
  <div class="home-blog container">
    <div class="row">
      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-12"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <ArticleCard
          :slug="post.slug"
          :image="post.image"
          :name="post.name"
          :createdAt="post.createdAt"
          :categories="post.categories"
          :tags="post.tags"
          :views="post.views"
        ></ArticleCard>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue';

export default {
  props: ['posts'],
  components: {
    ArticleCard,
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.6em;
  font-family: IranSansBold;
  margin-bottom: 7px;
}

.subtitle {
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.3) !important;
}
</style>
