<template>
  <div class="CourseCard shadow hover mb-4" @click="onClick">
    <img class="Course_Image" alt="askarya-coursecard-image" :src="thumb" />
    <div class="bottom-section">
      <h4 class="course-title text-center pt-3">{{ title }}</h4>
      <hr class="fadeline" />
      <div
        class="CourseInfoSection d-flex justify-content-between text-center pt-1"
      >
        <div>
          <p class="courseData">
            {{ minutes }}
            <br />
            <span class="courseTitle">دقیقه ویدیو</span>
          </p>
        </div>
        <div>
          <p class="courseData">
            {{ episodes }}
            <br />
            <span class="courseTitle">درس گفتار</span>
          </p>
        </div>
      </div>
      <hr class="fadeline" v-if="!purchased" />
      <div class="px-4 price-section text-center" v-if="!purchased">
        <div class="row">
          <div class="col-12 text-center pricehighlight" v-if="isVip">
            اعضای ویژه
          </div>
          <div class="col-12 text-center pricehighlight" v-else-if="isFree">
            رایگان
          </div>
          <div class="col-6" v-if="!isVip && !isFree">
            <p class="oldPrice strike" v-if="oldPrice > 0">
              {{ formatedOldPrice }}
            </p>
          </div>
          <div class="col-6 text-center" v-if="!isVip && !isFree">
            <p class="pricehighlight">{{ formatedPrice }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="buyCourse text-center" v-if="!purchased">
      <hr class="fadeline" />
      <p class="buyCourseTitle">
        <i class="fas fa-shopping-basket"></i>
        تهیه دوره‌
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Swal from 'sweetalert';

export default {
  props: [
    'title',
    'thumb',
    'time',
    'slug',
    'type',
    'price',
    'oldPrice',
    'updatedAt',
    'user',
    'episodes',
    'purchased',
    'tags',
  ],
  methods: {
    onClick() {
      // if (!this.tags) {
      //   this.tags = '';
      // }
      if (this.tags.toLowerCase().search('coming soon') >= 0) {
        Swal({
          title: 'وضعیت دوره: در حال برگزاری',
          className: 'text-rtl',
          icon: 'info',
          button: 'بسیار خوب',
        });
      } else {
        this.$router.push('courses/' + this.slug);
      }
    },
  },
  computed: {
    date() {
      return moment(this.updatedAt).format('MM/DD/YYYY');
    },
    formatedPrice() {
      return (
        new Intl.NumberFormat().format(
          parseInt(this.price.replace(',', ''), 10)
        ) + ' تومان '
      );
    },
    formatedOldPrice() {
      return (
        new Intl.NumberFormat().format(
          parseInt(this.oldPrice.replace(',', ''), 10)
        ) + ' تومان '
      );
    },
    minutes() {
      const time = this.time.split(':', 3);
      let minutes = 0;
      for (let i = 0; i < time.length; i++) {
        minutes += Math.round(
          parseInt(time[i]) * Math.pow(60, time.length - i - 2)
        );
      }
      return Math.max(minutes, 1);
    },
    isVip() {
      return this.type.toLowerCase() === 'vip';
    },
    isFree() {
      return this.type.toLowerCase() === 'free';
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseCard {
  background-color: #f7f7f7;
  border-radius: 10px;

  .course-title {
    font-size: 0.9em;
    font-family: IranSansBold;
    color: rgb(48, 48, 48);
  }

  .Course_Image {
    border-radius: 10px 10px 0 0 !important;
    width: 100% !important;
  }

  .bottom-section {
    padding: 0;
    margin: 0;
  }

  .CourseInfoSection {
    margin: 0 14%;
  }

  .courseData {
    color: rgb(85, 85, 85);
    padding: 0.15rem 0.5rem;
    margin-bottom: 0;
    font-size: 1.2em !important;
    font-family: IranSansBold !important;
  }

  .courseTitle {
    font-size: 0.78rem;
    color: #a7a7a7;
  }

  .buyCourseTitle {
    font-size: 0.9em !important;
    font-family: IranSansBold !important;
    color: #8d8d8d;
    background: #f1f1f1;
    margin-bottom: auto;
    padding-top: 0.7em;
    padding-bottom: 0.9em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    i {
      padding-left: 4px;
      font-size: 0.85em !important;
    }
  }

  .pricehighlight {
    font-size: 0.88rem;
    color: #00b35f !important;
    font-family: IranSansBold !important;
    margin: 0;
    padding: 0;
  }

  .oldPrice {
    font-size: 0.8rem;
    font-family: IranSansBold !important;
    color: rgba(0, 0, 0, 0.3);
    text-decoration: line-through;
    text-decoration-color: rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 0;
  }

  .fadeline {
    border-top: 2px solid rgba(207, 207, 207, 0.3);
    margin: 0;
  }
}

.hover:hover,
.hover:focus {
  box-shadow: 0 15px 12px rgba(0, 0, 0, 0.23) !important;
  transition: transform 0.7s !important;
  -webkit-transform: translateY(-2px);
  transform: translateY(-2px);
  cursor: pointer;

  .buyCourseTitle {
    color: #ef476f;
    font-family: IranSansBold;
  }
  .course-title,
  .courseTime,
  .unitsAvailable,
  .pricehighlight {
    color: #ef476f;
  }
}

.price-section {
  padding: 0.8em 0;
}

@media only screen and (max-width: 768px) {
  .CourseCard {
    margin-left: 1.5em !important;
    margin-right: 1.5em !important;
  }

  .course-title {
    font-size: 1em !important;
  }

  .CourseCard__course__info {
    margin: 0 14% !important;
  }

  .pricehighlight {
    font-size: 0.9rem !important;
  }

  .oldPrice {
    font-size: 0.8rem !important;
  }

  .courseTitle {
    font-size: 0.7rem;
  }

  .courseData {
    font-size: 1.1rem;
  }

  .buyCourseTitle {
    font-size: 1.13em !important;
  }
}

@media (max-width: 1200px) {
  .pricehighlight {
    font-size: 0.75rem;
  }

  .oldPrice {
    font-size: 0.7rem;
  }
}
</style>
