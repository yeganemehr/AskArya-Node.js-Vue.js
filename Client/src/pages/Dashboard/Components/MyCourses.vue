<template>
  <div class="container">
    <div class="text-right pt-4">
      <h1 class="card-title text-danger my-0 pb-3">دوره های در حال یادگیری</h1>
      <span>
        در این بخش دور های نقدی که در آن ثبت نام کرده اید لیست میشود.
      </span>
    </div>
    <div class="row pt-5 custom-margin" v-if="courses.length">
      <div
        class="col-lg-6 col-md-12 col-sm-12"
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
.card-title {
  font-size: 1.2rem;
  font-family: IranSansBold;
  color: #ed4b6f !important;
  text-align: right;
  padding: 0 0 6px 0 !important;
}

span {
  color: #7a7a7a !important;
  font-size: 0.88rem;
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

// @media (max-width: 680px) {
//   .custom-margin {
//     margin: 0 1em;
//   }
// }
</style>
