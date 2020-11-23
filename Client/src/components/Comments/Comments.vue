<template>
  <section class="bg">
    <div class="container pb-5">
      <h2 class="title">دیدگاه‌ها و پرسش‌ها</h2>

      <!---------- If user wants to write a comment this should show ---------->
      <!-- <SingleComment class="pb-5" /> -->

      <!----------if user NOT signed in show...---------->
      <!-- <b-alert
        show
        variant="success"
        class="text-right d-flex align-items-center"
        >برای ارسال نظر لازم است ابتدا وارد سایت شوید.
        <b-button class="mr-auto alert-button">ورود</b-button>
      </b-alert> -->

      <!---------- if user signed in show... ---------->
      <b-alert
        show
        variant="warning"
        class="text-right d-flex align-items-center"
      >
        <i class="fas fa-pen pl-2"></i>
        دیدگاه یا پرسش ارزشمند خود را برای ما ارسال کنید.
        <b-button class="mr-auto alert-button">ارسال دیدگاه</b-button>
      </b-alert>

      <!----------if no comments wrriten ---------->
      <!-- <b-alert show variant="info" class="text-right"
        >هیچ دیدگاهی تا به این لحظه برای این موضوع ثبت نشده است.
      </b-alert> -->

      <!-------------------- MESSAGE ONE -------------------->
      <div class="card">
        <div class="d-flex align-items-end">
          <b-avatar
            href="/dashboard"
            size="4em"
            class="align-center"
          ></b-avatar>

          <h2 class="user-name">
            Farhad Moein
            <span class="">۴ روز پیش</span>
          </h2>
          <div class="mr-auto pb-4">
            <!---------- Show EDIT if Admin ---------->
            <i
              class="fas fa-pen pl-3"
              v-b-tooltip.hover
              title=" Edit Message "
            ></i>

            <i
              class="fas fa-reply-all fa-flip-horizontal"
              v-b-tooltip.hover
              title="پاسخ به دیدگاه"
            ></i>
          </div>
        </div>

        <p class="message-content">
          یکی از معیارهای خوبی که در این پادکست هم خیلی سریع بهش اشاره شد و کمک
          می کنه کهیکی از معیارهای خوبی که در این پادکست هم خیلی سریع بهش اشاره
          شد و کمک می کنه که یکی از معیارهای خوبی که در این پادکست هم خیلی سریع
          بهش اشاره شد و کمک می کنه کهیکی از معیارهای خوبی که در این پادکست هم
          خیلی سریع بهش اشاره شد و کمک می کنه که.
        </p>

        <!---------- message reply ---------->
        <div class="message-reply">
          <div class="card message-reply-card">
            <div class="d-flex align-items-end">
              <b-avatar
                href="/dashboard"
                size="4em"
                class="align-center"
              ></b-avatar>

              <h2 class="user-name">
                Arya Doroudian
                <span class="">۱ ساعت پیش</span>
              </h2>
              <div class="mr-auto pb-4">
                <!---------- Show EDIT if Admin ---------->
                <i
                  class="fas fa-pen pl-3"
                  v-b-tooltip.hover
                  title=" Edit Message "
                ></i>

                <i
                  class="fas fa-reply-all fa-flip-horizontal"
                  v-b-tooltip.hover
                  title="پاسخ به دیدگاه"
                ></i>
              </div>
            </div>

            <p class="message-content">
              درود بر شما، هنوز ازش استفاده میشه اما محبوبیت گذشته رو نداره
            </p>
          </div>
        </div>
      </div>

      <!-------------------- MESSAGE TWO -------------------->
      <div class="card">
        <div class="d-flex align-items-end">
          <b-avatar
            href="/dashboard"
            size="4em"
            class="align-center"
          ></b-avatar>

          <h2 class="user-name">
            Mohammad Saboori
            <span class="">۳ روز پیش</span>
          </h2>
          <div class="mr-auto pb-4">
            <!---------- Show EDIT if Admin ---------->
            <i
              class="fas fa-pen pl-3"
              v-b-tooltip.hover
              title=" Edit Message "
            ></i>

            <i
              class="fas fa-reply-all fa-flip-horizontal"
              v-b-tooltip.hover
              title="پاسخ به دیدگاه"
            ></i>
          </div>
        </div>

        <p class="message-content">
          بهش اشاره شد و کمک می کنه کهیکی از معیارهای خوبی که در این پادکست هم
          خیلی سریع بهش اشاره شد و کمک می کنه که.
        </p>

        <!---------- message reply ---------->
        <div class="message-reply">
          <div class="card message-reply-card">
            <div class="d-flex align-items-end">
              <b-avatar
                href="/dashboard"
                size="4em"
                class="align-center"
              ></b-avatar>

              <h2 class="user-name">
                Arya Doroudian
                <span class="">۱ ساعت پیش</span>
              </h2>
              <div class="mr-auto pb-4">
                <!---------- Show EDIT if Admin ---------->
                <i
                  class="fas fa-pen pl-3"
                  v-b-tooltip.hover
                  title=" Edit Message "
                ></i>

                <i
                  class="fas fa-reply-all fa-flip-horizontal"
                  v-b-tooltip.hover
                  title="پاسخ به دیدگاه"
                ></i>
              </div>
            </div>

            <p class="message-content">
              درود بر شما، هنوز ازش استفاده میشه اما محبوبیت گذشته رو نداره
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SingleComment from './SingleComment';

export default {
  components: {
    SingleComment,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  min-height: 40vh !important;
}

.title {
  font-size: 1.6em;
  color: #242424;
  font-family: IranSansBold;
  text-align: right;
  padding-bottom: 0.8em;
  text-decoration: underline;
}

.card {
  padding: 1.8em 2em;
  margin-top: 1em;
}

.user-name {
  font-size: 1.2em;
  text-align: right;
  font-family: IranSansBold;
  margin-right: 1em;

  span {
    display: block;
    font-size: 0.65em;
    color: #707070;
    margin-top: 6px;
  }
}

i {
  font-size: 1.4em;
  color: #555555;
}

i:hover {
  color: #0300a5;
  cursor: pointer;
}

.alert .fa-pen {
  font-size: 1em;
  color: #886719;
}

.alert .fa-pen:hover {
  cursor: auto;
}

.message-content {
  font-size: 0.98em;
  color: #2e2e2e;
  line-height: 1.9em;
  text-align: right;
  margin-top: 1.4em;
}

.message-reply-card {
  margin-top: 1em;
  padding: 1em;
  background: #f1f1f1;
}

.alert {
  font-size: 0.9em;
  text-align: right;
}

.alert-button {
  font-size: 0.95em;
}
</style>
