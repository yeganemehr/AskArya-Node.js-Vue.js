<template>
  <section dir="ltr" class="container pt-5">
    <h1 class="text-center text-default">Management Page</h1>
    <div class="pt-5 text-ltr d-flex justify-content-center row">
      <router-link to="/courseoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Courses</b-button
        >
      </router-link>

      <router-link to="/quizoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Quizzes</b-button
        >
      </router-link>

      <router-link to="/episodeoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Episodes</b-button
        >
      </router-link>

      <router-link to="/manageusers">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Users</b-button
        >
      </router-link>

      <router-link to="/commentoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Comments</b-button
        >
      </router-link>

      <router-link to="/articleoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Articles</b-button
        >
      </router-link>

      <router-link to="/ticketoverview">
        <b-button pill variant="primary" size="lg" class="px-5 mb-3"
          >Tickets</b-button
        >
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  metaInfo: {
    title: 'اسک آریا | پنل مدیریت',
    titleTemplate: 'اسک آریا | پنل مدیریت',
    htmlAttrs: {
      lang: 'fa',
      amp: true,
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  min-height: 80vh !important;
}

.btn {
  margin-right: 10px;
  font-size: 1.2em;
}

@media (max-width: 767.98px) {
  .btn {
    margin-right: 10px;
    font-size: 0.9rem;
  }
}
</style>
