<template>
  <div class="CourseCard hover mb-4" @click="onClick">
    <img class="Course_Image" alt="askarya-coursecard-image" :src="thumb" />
    <div class="bottom-section">
      <h4 class="course-title text-center pt-3">{{ title }}</h4>
      <hr class="fadeline" />
      <div
        class="CourseInfoSection d-flex justify-content-between text-center pt-1"
      >
        <div>
          <p class="courseTime">
            {{ minutes }}
            <br />
            <span class="courseTimeSpan">دقیقه ویدیو</span>
          </p>
        </div>
        <div>
          <p class="unitsAvailable">
            {{ episodes }}
            <br />
            <span class="unitsAvailableSpan">درس گفتار</span>
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
            <p class="oldPrice" v-if="oldPrice > 0">{{ formatedOldPrice }}</p>
          </div>
          <div class="col-6 text-center" v-if="!isVip && !isFree">
            <p class="pricehighlight">{{ formatedPrice }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="buyCourse text-center" v-if="!purchased">
      <hr class="fadeline" />
      <p class="buyCourseTitle">تهیه دوره‌</p>
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
      if (!this.tags) {
        this.tags = '';
      }
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);

  .course-title {
    font-size: 0.9rem;
    font-family: IranSansBold;
    color: #272727;
  }

  .Course_Image {
    border-radius: 10px 10px 0 0 !important;
    width: 100% !important;
  }

  .bottom-section {
    padding: 0;
    margin: 0;
    // border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .CourseInfoSection {
    margin: 0 14%;
  }

  .courseTime {
    color: rgb(85, 85, 85);
    padding-right: 0.5rem;
    font-size: 1.4em !important;
    font-family: IranSansBold !important;
  }

  .courseTimeSpan {
    font-size: 0.73rem;
    color: #00000059;
  }

  .unitsAvailable {
    color: rgb(85, 85, 85);
    padding-left: 0.5rem;
    font-size: 1.4em !important;
    font-family: IranSansBold !important;
  }

  .unitsAvailableSpan {
    font-size: 0.73rem;
    color: #00000059;
  }

  .buyCourseTitle {
    font-size: 1em;
    font-family: IranSansBold !important;
    color: rgb(86, 173, 223);
    background: #ebebeb;
    margin-bottom: auto;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .pricehighlight {
    font-size: 0.9rem;
    color: #00b35f !important;
    font-family: IranSansBold !important;
    margin: 0;
    padding: 0;
  }

  .oldPrice {
    font-size: 0.8rem;
    font-family: IranSansBold !important;
    color: rgba(0, 0, 0, 0.295);
    text-decoration: line-through;
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
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transition: transform 0.7s !important;
  -webkit-transform: translateY(-2px);
  transform: translateY(-2px);
  cursor: pointer;

  .buyCourseTitle {
    color: rgb(81, 202, 206);
    font-family: IranSansBold;
  }
  .course-title,
  .courseTime,
  .unitsAvailable,
  .pricehighlight {
    color: #00b35f;
  }
}

.price-section {
  padding: 0.8em 0;
}

@media (max-width: 1200px) {
  .pricehighlight {
    font-size: 0.75rem;
  }

  .oldPrice {
    font-size: 0.7rem;
  }
}

@media only screen and (max-width: 768px) {
  .course-title {
    font-size: 1rem !important;
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

  .courseTimeSpan,
  .unitsAvailableSpan {
    font-size: 0.7rem;
  }

  .courseTime,
  .unitsAvailable {
    font-size: 1.1rem;
  }
}

// @media (max-width: 480px) {
//   .pricehighlight {
//     font-size: 0.75rem;
//   }
//   .course-title {
//     font-size: 0.83rem;
//   }
// }
</style>
