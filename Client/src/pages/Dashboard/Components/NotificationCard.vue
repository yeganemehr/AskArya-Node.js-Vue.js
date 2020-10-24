<template>
  <div class="card">
    <div class="container">
      <h1 class="title pt-4 pb-3">آخرین فعالیت های شما</h1>
      <div class="text-right" v-if="logs.length">
        <div class="log px-2" v-for="log of logs" :key="log.id">
          <p>
            <i :class="'fas ' + getLogIcon(log.type) + ' iconSize'"></i>
            {{ getJalaliDate(log.createdAt) }} -
            {{ log.title }}
          </p>
        </div>
      </div>
    </div>
    <base-pagination
      class="pagination-no-border ml-auto mt-auto px-2 text-rtl"
      v-model="pagination.currentPage"
      :value="pagination.currentPage"
      :per-page="pagination.perpage"
      :total="pagination.total"
      :pageCount="pagination.pages"
      type="danger"
      @input="changePageListener"
    ></base-pagination>
  </div>
</template>
<script>
import { BasePagination } from 'src/components';
import backend from '../../../backend';
import moment from 'jalali-moment';

export default {
  components: {
    BasePagination,
  },
  data() {
    return {
      pagination: {
        perPage: 3,
        currentPage: 1,
        total: 0,
        pages: 0,
      },
      logs: [],
    };
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/dashboard/logs?page=' + page + '&limit=' + this.pagination.perPage
        )
        .then((response) => {
          this.logs = response.data.docs;
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.pages = response.data.totalPages;
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
        });
    },
    getLogIcon(type) {
      switch (type) {
        case 'logout':
          return 'fa-shield-alt text-danger';
        case 'login':
          return 'fa-shield-alt text-success';
        case 'register':
          return 'fa-user-tie';
        case 'buy_course':
          return 'fa-shopping-basket text-primary';
        default:
          return 'fa-star text-success';
      }
    },
    changePageListener(page) {
      this.dataLoad(page);
    },
    getJalaliDate(date) {
      return moment(date).locale('fa').format('dddd DD/MM/YYYY HH:mm:ss');
    },
  },
  mounted() {
    this.dataLoad(1);
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100% !important;
  border: 1px solid rgb(240, 240, 240);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
    0 32px 16px rgba(0, 0, 0, 0.09);
}

.title {
  font-size: 1.1rem;
  font-family: IranSansBold;
  padding-bottom: 2em !important;
  color: black !important;
  text-align: right;
}

.log p {
  font-size: 0.9em !important;
  padding-bottom: 1.4em !important;
  color: rgb(66, 66, 66) !important;
}

.iconSize {
  font-size: 1.1em;
  padding-left: 10px;
}

.pagination {
  .page-pre {
    &.next-page {
      .page-link {
        .icon-double-right {
          &::before {
            content: '\EA23';
          }
        }
      }
    }
  }
  .page-link {
    .icon-double-left {
      &::before {
        content: '\EA24';
      }
    }
  }
}

@media (max-width: 680px) {
  .card {
    height: 100% !important;
  }
}
</style>
