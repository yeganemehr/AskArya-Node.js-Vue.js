<template>
  <div class="bg">
    <div class="container">
      <div class="card-custom">
        <h1 class="title">پنل کاربری</h1>
      </div>

      <div class="row">
        <!-- User Profile Section -->
        <div class="custom-margin col-lg-7 col-md-12">
          <user-card :user="$root.$data.user"></user-card>
        </div>

        <!-- Notification Section -->
        <div class="d-none d-md-block col-lg-5 col-md-12">
          <NotificationCard></NotificationCard>
        </div>

        <!-- Stats Cards Section -->
        <div
          class="col-lg-4 col-md-4 ml-auto mr-auto"
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

        <!-- Payment History Section -->
        <div class="col-md-12 mb-4 text-center">
          <PaymentHistory :payments="payments"></PaymentHistory>
        </div>

        <!-- My Courses Section -->
        <div class="col-md-12 mb-5 text-center">
          <MyCourses></MyCourses>
          <hr class="hr d-md-none" />
        </div>

        <!-- VIP Section -->
        <div class="d-none d-md-block col-md-12 vip-section text-center">
          <VIP></VIP>
        </div>

        <!-- Notification Section -->
        <div class="d-md-none col-lg-6 col-md-12">
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
import VIP from '../Courses/Vip';

import backend from '../../backend';
import moment from 'moment';

export default {
  components: {
    StatsCard,
    UserCard,
    NotificationCard,
    PaymentHistory,
    MyCourses,
    VIP,
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
          subTitle: 'درس های من',
          // subTitle: 'درس های ثبت نام شده',
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
.bg {
  background-color: #f9f9f9 !important;
}

.card-custom {
  margin: 2em 0;
  border-radius: 2em;
  // background-image: linear-gradient(80deg, #ffd000, #fff203);
  background-color: #ffd000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.86'%3E%3Cpath fill='%23ffcf00' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23ffce00' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23ffce00' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23ffcd00' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffcc00' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23ffd400' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23ffdb01' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23ffe301' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23ffea02' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23fff203' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.title {
  font-size: 2.5em;
  font-family: IranSansBold;
  text-align: center;
  color: rgb(44, 44, 44) !important;
  padding: 1.7rem 0 !important;
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

@media (max-width: 680px) {
  .title {
    font-size: 1.8em;
    padding: 1.7rem 0 !important;
  }

  .card-custom {
    margin: 2em 0;
    border-radius: 2em;
    background-image: linear-gradient(80deg, #ffd000, #fff203);
  }
}
</style>
