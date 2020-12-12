<template>
  <div class="bg">
    <div class="container pt-4">
      <div class="card-custom">
        <h1 class="title">پنل کاربری</h1>
      </div>

      <div class="row custom-card-margin">
        <div class="d-none d-md-block col-lg-9 col-md-12 pb-3">
          <b-card no-body>
            <b-tabs pills card vertical>
              <!-- TAB 1 -->
              <b-tab class="p-0 m-0" active>
                <template #title>
                  <i class="fas fa-user-graduate icon"></i>
                  اطلاعات کاربری
                </template>
                <user-card :user="$root.$data.user"></user-card>
              </b-tab>

              <!-- TAB 2 -->
              <b-tab>
                <template #title>
                  <i class="fas fa-bullhorn icon"></i>
                  اعلانات
                </template>
                <NotificationCard></NotificationCard>
              </b-tab>

              <!-- TAB 3 -->
              <b-tab>
                <template #title>
                  <i class="fas fa-dollar-sign icon"></i>
                  بخش مالی
                </template>
                <PaymentHistory :payments="payments"></PaymentHistory>
              </b-tab>

              <!-- TAB 4 -->
              <b-tab>
                <template #title>
                  <i class="fas fa-graduation-cap icon"></i>
                  دوره های من
                </template>
                <MyCourses></MyCourses>
              </b-tab>

              <!-- TAB 5 -->
              <!-- <b-tab active>
              <template #title>
                <i class="far fa-user pl-3"></i>
                My Quizzes
              </template>
              <p class="p-3">Tab contents 5</p>
            </b-tab> -->
            </b-tabs>
          </b-card>
        </div>

        <!-- Stats Cards Section -->
        <div class="col-lg-3 col-md-12 d-none d-md-block">
          <div class="w-100 pb-2" v-for="card in statsCards" :key="card.title">
            <stats-card
              :title="card.title"
              :sub-title="card.subTitle"
              :type="card.type"
              :icon="card.icon"
            >
              <div slot="footer" v-html="card.footer"></div>
            </stats-card>
          </div>

          <!-- <div class="article-card">
            <h5>تیکت ها</h5>
            <p>سوالی دارید؟ <span>ایجاد تیکت جدید</span></p>
          </div> -->
        </div>
      </div>

      <div class="row">
        <!-- User Profile Section -->
        <div class="d-md-none custom-margin col-lg-7 col-md-12">
          <user-card :user="$root.$data.user"></user-card>
        </div>

        <!-- Stats Cards Section -->
        <div
          class="d-md-none col-lg-4 col-xs-4 ml-auto mr-auto"
          v-for="card in statsCards"
          :key="card.title"
        >
          <stats-card
            :title="card.title"
            :sub-title="card.subTitle"
            :type="card.type"
            :icon="card.icon"
          >
            <div slot="footer" v-html="card.footer"></div>
          </stats-card>
        </div>

        <!-- My Courses Section -->
        <div class="d-md-none col-md-12 mb-4 text-center">
          <MyCourses></MyCourses>
          <hr class="hr d-md-none" />
        </div>

        <!-- Payment History Section -->
        <div class="d-md-none col-md-12 mb-4 mt-2 text-center">
          <PaymentHistory :payments="payments"></PaymentHistory>
        </div>

        <!-- My Quizzes Section -->
        <!-- <div class="col-md-12 mb-4 text-center">
          <MyQuizzes></MyQuizzes>
          <hr class="hr d-md-none" />
        </div> -->

        <!-- Notification Section -->
        <div class="d-md-none col-lg-6 col-md-12 mb-5">
          <NotificationCard></NotificationCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from 'src/components/Cards/StatsCard';
import UserCard from './Components/UserCard.vue';
import NotificationCard from './Components/NotificationCard.vue';
import PaymentHistory from './Components/PaymentHistory.vue';
import MyCourses from './Components/MyCourses.vue';
// import MyQuizzes from './Components/MyQuizzes.vue';
import backend from '../../backend';
import moment from 'moment';

export default {
  components: {
    StatsCard,
    UserCard,
    NotificationCard,
    PaymentHistory,
    MyCourses,
    // MyQuizzes,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
      statsCards: [],
      payments: {
        docs: [],
        total: 0,
        page: 1,
      },
    };
  },
  methods: {
    setStatsCards(courses, myEpisodes, totalEpisodes) {
      this.statsCards = [
        {
          title: courses.toString(),
          subTitle: 'دوره های من',
          // subTitle: 'دوره های تهیه شده ی سما',
          type: 'warning',
          icon: 'tim-icons icon-book-bookmark',
          footer: '<i class="tim-icons icon-bag-16 pl-2"></i> در حال یادگیری',
        },
        {
          title: totalEpisodes + ' / ' + myEpisodes,
          // subTitle: 'درس های من',
          subTitle: 'درس های ثبت نام شده',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer:
            '<i class="tim-icons icon-video-66 pl-2"></i> مجموع درس های موجود',
        },
        {
          title: 'به زودی',
          subTitle: 'امتحان های من',
          type: 'primary',
          icon: 'far fa-check-square',
          footer: '<i class="far fa-check-square pl-2"></i> امتحان های شما',
        },
        // {
        //   title: '0',
        //   subTitle: 'امتحان ها',
        //   type: 'info',
        //   icon: 'fas fa-university',
        //   footer:
        //     '<i class="far fa-bookmark pl-2"></i> تعداد امتحانات که موجود هستن'
        // }
      ];
    },
    getData() {
      backend.get('dashboard').then((response) => {
        this.setStatsCards(
          response.data.courses,
          response.data.episodes[0],
          response.data.episodes[1]
        );
        this.payments = response.data.payments;
      });
    },
  },
  mounted() {
    this.getData();
  },
  metaInfo: {
    title: 'اسک آریا | پنل کاربری',
    titleTemplate: 'اسک آریا | پنل کاربری',
    htmlAttrs: {
      lang: 'fa',
      amp: true,
    },
    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.ask-arya.com/',
      },
      {
        property: 'og:image',
        content:
          'https://www.ask-arya.com/img/Ask Arya LOGO 2019 - 200x200 - OPT.png',
      },
      {
        property: 'og:description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https://www.ask-arya.com/' }],
  },
};
</script>

<style lang="scss" scoped>
.article-card {
  padding: 20px 10px 10px 10px;
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px !important;
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  text-align: center;

  h5 {
    font-family: IranSansBold;
    color: #ed4b6f;
  }
  span {
    font-size: 0.95em;
    font-family: IranSansBold;
  }
}

/deep/ .tab-content {
  min-height: 500px !important;
}

/deep/ .card-header:first-child {
  text-align: center !important;
  background: #ed4b6f;
  border-radius: 15px !important;

  a {
    color: #ffffff !important;
  }
  i {
    font-size: 1.6em !important;
    width: 100% !important;
    padding-bottom: 9px !important;
  }

  a.active {
    color: #ed4b6f !important;
  }
}

/deep/ .nav-pills .nav-link {
  margin-top: 1.4em !important;
  margin-bottom: 1.4em !important;
}

/deep/ .nav-pills .nav-link.hover {
  background-color: #f3f6f9 !important;
}

/deep/ .nav-pills .nav-link.active {
  background-color: #fff !important;
}

.card-custom {
  border-radius: 1.5em;
  margin-bottom: 1.5em;
}

.title {
  font-size: 2em;
  font-family: IranSansBold;
  text-align: center;
  color: #ef476f !important;
  padding-top: 1.2rem !important;
}

.hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
}
.coloredLink {
  color: #de4dc7 !important;
}
.form-check input[type='checkbox'] + .form-check-sign::after {
  background-color: #ff0000 !important;
}
.form-horizontal .col-form-label,
.form-horizontal .label-on-right {
  text-align: left !important;
}
.vip-section {
  padding-bottom: 5.6em !important;
}

@media (min-width: 680px) {
  .custom-card-margin {
    margin-top: 3.5em !important;
    margin-bottom: 7em !important;
  }
}

@media (max-width: 680px) {
  .title {
    font-size: 1.7em;
    padding: 0.9rem 0 !important;
  }
  .card-custom {
    // margin: 1em 0 0em 0 !important;
    border-radius: 2em;
  }
}
</style>
