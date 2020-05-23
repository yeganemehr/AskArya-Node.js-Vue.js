<template>
  <div class="container">
    <div class="d-flex justify-content-center flex-wrap">
      <p class="info-items d-flex align-items-center">
        <i class="icon far fa-address-card pl-2"></i>
        نویسنده مقاله:
        <span>{{ name }}</span>
      </p>
      <div class="w-100 d-md-none pt-1"></div>

      <p class="info-items item-padding d-flex align-items-center">
        <i class="icon far fa-calendar-alt pl-2"></i>
        تاریخ انتشار:
        <span class="item-date">{{ dateFormated() }}</span>
      </p>
      <div class="w-100 d-md-none pt-1"></div>

      <p
        class="info-items item-padding post-categories d-flex align-items-center"
      >
        <i class="icon fas fa-bullseye pl-2"></i>
        دسته بندی ها:
        <span v-for="category of categories" :key="category">{{
          category.name
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment';
export default {
  props: ['name', 'createdAt', 'categories'],
  methods: {
    dateFormated() {
      return moment(this.createdAt).locale('fa').format('D MMMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.item-section {
  padding-right: 4em;
}

.info-items {
  font-size: 1.15em !important;
  font-family: IranSans;
  padding-top: 3px;

  color: rgba(255, 255, 255, 0.6) !important;
  .icon {
    font-size: 1.1rem;
  }
}

span {
  font-size: 1.15em !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-family: IranSans;
  padding-right: 6px;
}

.item-date {
  display: inline-block;
  direction: rtl;
}

.post-categories {
  span {
    &::after {
      content: '،';
      display: inline-block;
      padding: 0 0 0 5px;
    }

    &:last-child {
      margin-right: 0.1rem !important;
      &::after {
        display: none;
      }
    }
  }
}

@media (max-width: 678px) {
  .item-section {
    // padding-right: 0;
    // width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .info-items {
    font-size: 1.1em !important;
  }
  span {
    font-size: 1em !important;
    padding-right: 7px !important;
  }
}

@media (min-width: 678px) {
  .item-padding {
    padding-right: 2em !important;
  }
}
</style>
