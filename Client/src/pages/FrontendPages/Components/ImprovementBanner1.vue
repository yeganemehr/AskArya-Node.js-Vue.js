<template>
  <section class="container">
    <div class="bg">
      <div class="text-section px-4">
        <h2 class="pb-5">آیا تغییرات مورد نظر را در خودتان نمی بینید؟</h2>
        <p class="main-text">
          یک چند ماهی هست که کلاس های زبانت رو شروع کردی. خب تا یک جاهایی خوب
          پیش میره، شما حس میکنید که در مکالمه، لغات و گرامر دارید پیشرفت
          میکنید.
          <br />
          <br />اما این حس مقطعی هست، و ناگهان پیشرفت زبان شما کم میشه و دیگه حس
          اون تغییرات مثبت در شما ایجاد نمیشه، انگار که هر چه بیشتر درس بخونید
          باز هم پیشرفتی نمیبینی و نمیتونی خودتو به سطح بالاتر برسونی، اونجاست
          که انگیزه ی شما به عنوان زبان آموز کم میشه و نا امید میشید.
          <br />
          <br />به احتمال خیلی زیاد این داستان برای شما هم اتفاق افتاده، داستانی
          که گفته شد عموما برای اکثر زبان آموزان ها اتفاق میافتد. که هم داستان
          کلافه کننده ای هست و بیشتر از آن نا امید کننده.
        </p>

        <div class="text-center mt-4">
          <b-button
            v-scroll-to="{
              el: '#element',
              duration: 900,
              easing: 'linear',
              offset: -20,
              force: true,
              cancelable: true,
              onStart: onStart,
              onDone: onDone,
              onCancel: onCancel,
              x: false,
              y: true,
            }"
            native-type="submit"
            class="btn"
          >
            <i class="fas fa-info-circle ml-2"></i>
            راه حل؟
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      onStart: () => {},
      onDone: () => {},
      onCancel: () => {},
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  // background-color: #2876f9;
  // background: linear-gradient(270deg, #38048de7 50%, #1a54b9c7),
  //   url(/img/frontend/confused-banner.svg) no-repeat;

  background-color: #f7b42c;
  background: linear-gradient(315deg, #f7b32cf5 0%, #fc575fd8 74%),
    url(/img/frontend/confused-banner.svg) no-repeat;
  background-position: bottom left;
  background-size: cover;
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

p {
  font-family: IranSans !important;
}

.text-section {
  text-align: right;
  padding: 2em 0;

  h2 {
    font-size: 1.7em;
    color: #fff !important;
    line-height: inherit !important;
    font-family: IranSansBold;
    padding: 0;
    margin: 0;
  }

  .main-text {
    font-family: IranSans !important;
    color: #fff !important;
    font-size: 1.15em;
    line-height: 1.7em !important;
  }
}

.btn {
  font-size: 1em !important;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
  color: #fff;
  border: 1px dashed rgba(255, 176, 139, 0.651);
  font-family: IranSansBold;
  padding: 0.5em 1.8em !important;
  background: transparent;
  border-radius: 10px;
}

.btn:hover {
  color: #fff;
  border: 1px dashed #fff !important;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
}

@media (max-width: 680px) {
  .text-section {
    padding: 2em 0.5em;

    h2 {
      font-size: 1.6em;
    }
    .main-text {
      font-size: 1em !important;
    }
    .rtl .btn {
      font-family: IranSansBold;
      font-weight: inherit;
      padding: 0.6em 1.5em;
    }
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .text-section .main-text {
    font-size: 1.15em;
  }
}
</style>
