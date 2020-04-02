<template>
  <div class="container">
    <div class="text-right pb-5">
      <h1 class="title text-danger my-0 pb-3">دوره های در حال یادگیری</h1>
      <span>
        در این بخش دور های نقدی که در آن ثبت نام کرده اید لیست میشود.
      </span>
    </div>
    <div class="row pt-3" v-if="courses.length">
      <div
        class="col-lg-3 col-md-6 mb-4"
        v-for="course in courses"
        :key="course.id"
      >
        <Course v-bind="course" :purchased="true"></Course>
      </div>
    </div>

    <p class="no-courses-message text-right pt-5" v-else>
      هیچ درسی تهیه نشده است 😣
    </p>
  </div>
</template>

<script>
import Course from '../../FrontendPages/Components/CourseCard/Course.vue';

import backend from '../../../backend';

export default {
  data: function () {
    return {
      courses: [],
      page: 1,
      pages: 1,
    };
  },
  methods: {
    dataLoad(page) {
      backend.get('/courses/purchased?page=' + page).then((response) => {
        this.courses = response.data.docs;
        this.page = response.data.page;
        this.pages = response.data.pages;
      });
    },
  },
  mounted() {
    this.dataLoad(1);
  },
  components: {
    Course,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.6em;
  font-family: IranSansBold;
  margin-bottom: 1.7em;
  text-align: right;
}

.no-courses-message {
  font-size: 1.1rem;
  color: rgb(141, 141, 141);
}
p {
  font-size: 1.1rem;
  color: rgb(134, 134, 134);
}
.fadeline2 {
  display: none !important;
}
</style>
