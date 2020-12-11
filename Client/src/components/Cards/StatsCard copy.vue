<template>
  <card class="card-stats mb-3" :show-footer-line="true">
    <div class="row">
      <!-- <div
        class="col-lg-5 col-md-5 d-none d-md-block"
        v-if="$slots.icon || icon"
      >
        <div class="info-icon text-center" :class="`icon-${type}`">
          <slot name="icon"> <i :class="icon"></i> </slot>
        </div>
      </div> -->
      <div
        class="col-md-7 col-md-7 col-sm-12 text-right"
        v-if="$slots.content || title || subTitle"
      >
        <div class="numbers">
          <slot>
            <p v-if="subTitle" class="card-category">{{ subTitle }}</p>
            <h3 v-if="title" class="card-title">{{ title }}</h3>
          </slot>
        </div>
      </div>
    </div>
    <!-- <div class="stats pull-right" slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div> -->
  </card>
</template>
<script>
import Card from './Card.vue';

export default {
  name: 'stats-card',
  components: {
    Card,
  },
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    icon: String,
    title: String,
    subTitle: String,
  },
};
</script>

<style lang="scss" scoped>
.card-stats {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.04) !important;
  // border: transparent !important;
  border: 1px dashed #eee !important;
}

.white-content .card:not(.card-pricing).card-stats .card-category {
  color: #b8b8b8 !important;
  font-size: 0.94em;
  margin: 0 !important;
  padding-bottom: 5px !important;
}

.card-title {
  font-family: IranSansBold !important;
  color: #ef476f !important;
  font-size: 1.45em !important;
  padding-top: 6px !important;
  margin-bottom: 0;
}

@media (max-width: 678px) {
  .white-content .card:not(.card-pricing).card-stats .card-title {
    padding-top: 5px !important;
    margin-bottom: 0 !important;
    color: #ef476f !important;
    text-align: center !important;
  }

  .custom-size {
    font-size: 0.7em !important;
  }

  i {
    color: #7cffcb !important;
  }
}
</style>
