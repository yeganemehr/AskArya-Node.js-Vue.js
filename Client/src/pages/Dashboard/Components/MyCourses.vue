<template>
  <div class="container">
    <hr class="hr mb-5" />

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
        <CourseCard v-bind="course" :purchased="true"></CourseCard>
      </div>
    </div>

    <p class="no-courses-message text-right pb-5" v-else>
      <i class="fas fa-shopping-basket pl-2"></i>
      هیچ دوره ی تهیه نشده است...
    </p>
  </div>
</template>

<script>
import CourseCard from '../../Courses/CourseCard';
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
    CourseCard,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.6em;
  font-family: IranSansBold;
  margin-bottom: 1.7em;
  text-align: right;
  color: #ef476f !important;
}

.no-courses-message {
  font-size: 1.1rem;
  color: rgb(102, 102, 102) !important;
  font-family: IranSansBold;
}

p {
  font-size: 1.1rem;
  color: rgb(134, 134, 134);
}

.fadeline2 {
  display: none !important;
}

.hr {
  border: 0;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
