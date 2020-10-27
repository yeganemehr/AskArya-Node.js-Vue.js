<template>
  <div class="row">
    <div
      class="col-lg-9 col-md-10 UnitSection mb-5"
      v-if="episodes.length"
      :style="scrollable ? { 'overflow-y': 'auto' } : ''"
    >
      <div
        class="UnitBox d-flex justify-content-between"
        v-for="episode of episodes"
        :key="episode.id"
        :class="activeEpisode == episode.id ? 'active' : ''"
      >
        <div class="right d-flex justify-content-end">
          <div :class="getUnitBadge(episode.type)">
            <i :class="'fas ' + getEpisodeIcon(episode.type)"></i>
          </div>
          <div class="UnitName pr-3">
            <router-link
              :to="'/courses/' + course.slug + '/unit-' + episode.number"
              v-if="!mustBuy(episode.type)"
            >
              <p class="text-right">{{ episode.title }}</p>
            </router-link>
            <p
              @click="throwClickEvent"
              class="UnitName text-right"
              v-if="mustBuy(episode.type)"
            >
              {{ episode.title }}
            </p>
          </div>
        </div>
        <div class="left d-flex justify-content-between">
          <!-- <div class="pl-2 d-flex align-self-center" v-if="purchased">
            <i
              :class="episode.done ? 'fas fa-eye text-success fas-2x' : 'fas fa-eye-slash text-danger fas-2x'"
            ></i>
          </div>-->

          <div class="pl-2 d-flex align-self-center" v-if="purchased">
            <p class="detail-price-purchased">
              <i
                :class="
                  episode.done
                    ? 'fas fa-eye text-success fas-2x'
                    : 'fas fa-eye-slash text-danger fas-2x'
                "
              ></i>
            </p>
          </div>

          <div v-else>
            <p class="detail-price">{{ getEpisodeType(episode.type) }}</p>
          </div>

          <div>
            <p class="detail-time">{{ getUnitTime(episode.time) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-2">
      <custom-card
        :enrolled="purchased"
        :done="courseDonePercentage"
        :remain="courseRemainPercentage"
      />
      <Ads class="sticky" />
    </div>
  </div>
</template>

<script>
import timeUtil from '../../../util/time';
import CustomCard from './CustomCard.vue';
import Ads from '../../FrontendPages/Components/Ads';

export default {
  components: {
    CustomCard,
    Ads,
  },
  props: [
    'course',
    'episodes',
    'scrollable',
    'maxepisodes',
    'purchased',
    'courseDonePercentage',
    'courseRemainPercentage',
    'activeEpisode',
  ],
  methods: {
    getEpisodeType(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'رایگان';
        case 'cash':
        case 'paid':
          return 'پرداختنی';
        case 'vip':
          return 'VIP';
      }
    },
    getEpisodeIcon(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'fa-unlock-alt';
        case 'cash':
        case 'paid':
          if (this.purchased) {
            return 'fa-unlock-alt';
          }
          return 'fa-lock';
        case 'vip':
          return 'fa-key';
      }
    },
    getUnitBadge(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'UnitBadgeUnlocked';
        case 'cash':
        case 'paid':
          if (this.purchased) {
            return 'UnitBadgeUnlocked';
          }
          return 'UnitBadgelocked';
        case 'vip':
          if (this.IAmVIP) {
            return 'UnitBadgeUnlocked';
          }
          return 'UnitBadgeVIP';
      }
    },
    getUnitTime(time) {
      return timeUtil.secondsToTime(timeUtil.timeToSeconds(time));
    },
    mustBuy(type) {
      return (
        ['cash', 'paid', 'vip'].indexOf(type.toLowerCase()) != -1 &&
        !this.purchased
      );
    },
    throwClickEvent() {
      this.$emit('buy');
    },
  },
  computed: {
    IAmVIP() {
      return (
        this.$root.$data.user &&
        this.$root.$data.user.vipTime &&
        new Date(this.$root.$data.user.vipTime) > new Date()
      );
    },
  },
  mounted() {
    if (this.scrollable) {
      const height =
        (this.$el.querySelector('.UnitBox').clientHeight + 2) *
        this.maxepisodes;
      this.$el.style['max-height'] = height + 'px';
    }
  },
};
</script>

<style lang="scss" scoped>
.UnitSection {
  background: transparent !important;
  height: 100%;
}
.UnitBox {
  -webkit-box-align: center;
  background: rgb(248, 248, 248) !important;
  padding: 15px 15px 5px 15px;
  border-top: 1.5px dashed rgba(102, 102, 102, 0.4);
  border-left: 1px dashed rgba(102, 102, 102, 0.3);
  border-right: 11px solid #33415c;
  border-radius: 0 15px 15px 0;
  transition: all 0.2s ease 0s;

  .UnitName {
    font-size: 1rem;
    color: rgb(59, 59, 59);
    margin: 0 !important;
    padding-top: 8px !important;
    // margin-top: auto;
  }

  .detail-time {
    color: rgb(255, 255, 255) !important;
    font-size: 0.9em;
    font-family: IranSansBold;
    // align-self: center;
    background: rgb(29, 35, 83) !important;
    padding: 7px 13px;
    border-radius: 5px;
    margin: 0 !important;
  }

  .detail-price {
    color: rgb(255, 255, 255) !important;
    font-size: 0.9em;
    // align-self: center;
    // background: rgba(70, 110, 218, 0.788) !important;
    background: #415a77;
    padding: 7px 15px;
    border-radius: 5px;
    margin: 0 !important;
    margin-left: 6px !important;
  }

  .detail-price-purchased {
    font-size: 1.1em;
    // align-self: center;
    background: transparent !important;
    padding: 5px 15px 11px 15px;
    margin: 0 !important;
  }
}

.UnitBox:last-child {
  border-bottom: 1.5px dashed rgba(102, 102, 102, 0.4) !important;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  margin-top: 0px;
  top: 10em;
  margin-bottom: 3.4em;
  // padding: 0 1.2em;
}

.UnitBox:hover,
.active {
  background: #e1eaff !important;
  border-right-color: #339afb;
  .UnitBadgeUnlocked {
    color: #339afb;
  }
  .UnitBadgelocked {
    color: #339afb;
  }
  .detail-time {
    background: #339afb !important;
  }
  .UnitName {
    cursor: pointer;
    // font-family: IranSansBold;
    text-decoration: underline;
    color: #339afb;
  }
}

.UnitBadgeUnlocked {
  font-size: 1.3rem;
  color: #06a086;
}

.UnitBadgelocked {
  font-size: 1.3rem;
  color: #ac2451;
}

.UnitBadgeVIP {
  font-size: 1.3rem;
  color: #e7d800;
}

@media screen and (max-width: 990px) {
  .sticky {
    display: none;
  }
}

@media (max-width: 768px) {
  .UnitBox {
    padding: 16px 7px 13px 7px;
    // margin-bottom: 5px;
  }

  .UnitName {
    font-size: 1em;
  }

  .detail-time {
    font-size: 0.9em !important;
    align-self: center;
    padding: 6px 8px;
  }

  .detail-price {
    font-size: 0.65rem;
    align-self: center;
    padding: 7px;
    margin-left: 3px;
  }
  .UnitBadgeUnlocked,
  .UnitBadgeVIP,
  .UnitBadgelocked {
    font-size: 0.9rem;
  }

  .UnitBox:active {
    background: #b1cfee73 !important;
  }

  .UnitBox:hover {
    background: transparent !important;
  }
}
</style>
