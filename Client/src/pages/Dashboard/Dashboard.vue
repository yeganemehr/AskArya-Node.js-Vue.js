<template>
  <div class="bg">
    <div class="container pb-5">
      <h1 class="title mb-0">پنل کاربری</h1>
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
        <div class="col-md-12 my-4 text-center">
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
  background-color: #fafbfe;
}

.title {
  font-size: 2.5em;
  font-family: IranSansBold;
  margin-bottom: 1.2em;
  text-align: center;
  color: #fd5d93 !important;
  padding-bottom: 2.2rem !important;
  padding-top: 2.2rem !important;
}

.hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.35),
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
    font-size: 2em;
  }
}
</style>
