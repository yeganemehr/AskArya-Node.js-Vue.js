<template>
  <div class="height">
    <section class="container text-right py-5">
      <!-- SHOULD HAVE PAGINATION -->
      <h1 class="pb-5 text-black">تیکت ها</h1>
      <div class="mb-5">
        <router-link to="/createticket">
          <b-button pill variant="warning">
            <i class="pl-3 fas fa-eye"></i> تیکت جدید
          </b-button>
        </router-link>
      </div>

      <hr class="my-5" />

      <!-------------- NEW TICKET -------------->
      <div
        class="container single-ticket-row"
        v-for="ticket in tickets"
        :key="ticket.id"
      >
        <div
          class="ticket-card d-flex justify-content-between align-items-center row"
        >
          <div class="ticket-name">
            <h3>عنوان</h3>
            <p :title="ticket.title">
              {{
                ticket.title.substring(0, 35) +
                (ticket.title.length > 35 ? ' ...' : '')
              }}
            </p>
          </div>

          <div class="ticket-dept">
            <h3>دپارتمان</h3>
            <p>{{ ticket.department }}</p>
          </div>

          <div class="ticket-date">
            <h3>زمان</h3>
            <p>{{ ticket.date }}</p>
          </div>

          <div class="ticket-status">
            <h3>وضعیت</h3>
            <span :class="getStatusLabelClasses(ticket.status)">{{
              getStatusTranslate(ticket.status)
            }}</span>
          </div>
          <div class="w-100 d-md-none pt-3"></div>
          <div class="view-ticket">
            <router-link :to="`/tickets/view/${ticket.id}`">
              <b-button class="px-4" pill variant="primary">
                <i class="pl-3 fas fa-eye"></i> نمایش
              </b-button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <base-pagination
          :value="pagination.currentPage"
          :per-page="pagination.perpage"
          :total="pagination.total"
          :pageCount="pagination.pages"
          @input="changePageListener"
        ></base-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import { BasePagination } from 'src/components';
import backend from '../../backend';
import moment from 'moment';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 15, 20, 30, 50],
        total: 0,
        pages: 0,
      },
      tickets: [],
    };
  },
  methods: {
    changePageListener(page) {
      if (page == this.pagination.currentPage) return;
      this.dataLoad(page);
    },

    dataLoad(page) {
      const query = {
        page: page,
        limit: this.pagination.perPage,
      };
      backend.get('/tickets' + this.encodeQueryData(query)).then((response) => {
        this.pagination.currentPage = parseInt(response.data.page, 10);
        this.pagination.pages = response.data.totalPages;
        this.pagination.total = response.data.totalDocs;
        this.pagination.perPage = response.data.limit;
        this.tickets = response.data.docs.map((ticket) => {
          ticket.date = this.date(ticket.date);
          return ticket;
        });
        if (!response.data.tickets) {
          response.data.tickets = [];
        }
        for (const item of response.data.tickets) {
          switch (item.status) {
            case 1:
              this.openTickets = item.count;
              break;
            case 2:
              this.answeredTickets = item.count;
              break;
            case 3:
              this.inprogressTickets = item.count;
              break;
            case 4:
              this.onHoldTickets = item.count;
              break;
            case 5:
              this.closedTickets = item.count;
              break;
          }
        }
      });
    },
    encodeQueryData(data) {
      const ret = [];
      for (const d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      return '?' + ret.join('&');
    },
    date(time) {
      return moment(time).format('DD/MM/YYYY');
    },
    getStatusTranslate(status) {
      switch (status) {
        case 1:
          return `باز`;
        case 2:
          return `پاسخ داده شده`;
        case 3:
          return `درحال پیگیری`;
        case 4:
          return `On Hold`;
        case 5:
          return `بسته شده`;
      }
    },
    getStatusLabelClasses(status) {
      switch (status) {
        case 1:
          return `badge badge-primary`;
        case 2:
          return `badge badge-success`;
        case 3:
          return `badge badge-warning`;
        case 4:
          return `badge badge-danger`;
        case 5:
          return `badge badge-secondary`;
      }
    },
  },
  mounted() {
    this.dataLoad(1);
  },

  metaInfo: {
    title: 'اسک آریا | تیکت ها',
    titleTemplate: 'اسک آریا | تیکت ها',
  },
};
</script>

<style lang="scss" scoped>
.height {
  min-height: 100vh;
}

h1 {
  font-family: IranSansBold;
}

.single-ticket-row {
  .ticket-card {
    padding: 1.8em 2.5em;
    margin-bottom: 20px;
    background-color: #fff !important;
    border-radius: 15px;
    border: 1px solid rgb(228, 228, 228);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(158, 158, 158, 0.23) !important;

    h3 {
      font-size: 0.9em;
      color: rgba(65, 65, 65, 0.5) !important;
      text-align: right;
      font-family: IranSansBold;
      padding: 0;
      margin: 0;
    }

    p {
      font-size: 1.1em;
      color: rgba(39, 39, 39, 0.89) !important;
      text-align: right;
      font-family: IranSans;
      padding-top: 10px;
    }

    .badge {
      margin-top: 10px;
    }

    .ticket-actions {
      i {
        color: #1669f5;

        .icon-group {
          margin-top: 10px;
        }
      }
    }
  }
  &:last-child {
    .ticket-card {
      border-bottom: none;
    }
  }
}

.ticket-card:hover,
.ticket-card:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.6);
  box-shadow: 40px rgba(121, 121, 121, 0.6);
}

.custom-button {
  background: #ef476f !important;
}

@media (max-width: 768px) {
  .single-ticket-row {
    .ticket-card {
      margin-top: 10px;
      padding: 0.8em 2em;
      // background-color: rgb(226, 226, 226);
      border-radius: 15px;
      color: rgb(41, 41, 41);

      h3 {
        font-size: 1em;
        padding: 0;
        margin: 0;
      }

      p {
        font-size: 1.1em;
        font-family: IranSans;
        padding-top: 10px;
      }

      .badge {
        margin-top: 10px;
      }

      .ticket-name {
        width: 100%;
      }
      .ticket-dept {
        padding-top: 1.2em;
        // width: 100%;
      }
      .ticket-date {
        padding-top: 1.2em;
        // width: 100%;
      }
      .ticket-status {
        padding-top: 1.2em;
      }
    }
  }
}
</style>
