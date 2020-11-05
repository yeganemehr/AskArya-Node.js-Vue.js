<template>
  <card>
    <div class="text-right pt-2 pr-2 pb-4">
      <h1 class="card-title my-0 pb-3">تاریخچه پرداخت ها</h1>
      <span> در این بخش گزارشات پرداختی های شما لیست میشود. </span>
    </div>

    <b-table
      hover
      :items="tableData"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    >
    </b-table>

    <div
      class="col-12 d-flex justify-content-center justify-content-sm-between mt-auto"
    >
      <base-pagination
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="pagination.total"
        @input="changePageListener"
      ></base-pagination>

      <!-- <div class>
        <p class="card-category">
          Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
        </p>
      </div> -->
    </div>
  </card>
</template>

<script>
import { BasePagination } from 'src/components';
import moment from 'jalali-moment';
import Fuse from 'fuse.js';
import backend from '../../../backend';

export default {
  components: {
    BasePagination,
  },

  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
    tableData() {
      const data = [];
      for (const payment of this.docs) {
        let product = '';
        if (payment.course) {
          product = payment.course.title;
        } else if (payment.vip) {
          if (!payment.vipMonth) {
            if (payment.price === 39000) {
              payment.vipMonth = 1;
            } else if (payment.price === 139000) {
              payment.vipMonth = 4;
            } else if (payment.price === 309000) {
              payment.vipMonth = 12;
            }
          }
          product = `${payment.vipMonth} ماه عضویت ویژه`;
        }
        data.push({
          id: payment.id,
          product: product,
          price: new Intl.NumberFormat().format(
            parseInt(payment.price.toString().replace(',', ''), 10)
          ),
          date: moment(payment.createdAt).locale('fa').format('DD/MM/YYYY'),
          status: payment.payment ? 'موفق' : 'ناموفق',
        });
      }
      return data;
    },
  },
  data() {
    return {
      sortBy: 'price',
      sortDesc: false,
      fields: [
        {
          key: 'product',
          label: 'عنوان دوره',
          sortable: true,
        },
        {
          key: 'date',
          label: 'تاریخ پرداخت',
          sortable: true,
        },
        {
          key: 'price',
          label: 'مقدار پرداختی',
          sortable: true,
        },
        {
          key: 'status',
          label: 'وضعیت پرداخت',
          sortable: true,
        },
      ],
      searchedData: [],
      fuseSearch: null,
      docs: [],
      pagination: {
        perPage: 0,
        currentPage: 0,
        total: 0,
      },
    };
  },
  props: ['payments'],
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3,
    });
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/dashboard/payments?page=' +
            page +
            '&limit=' +
            this.pagination.perPage
        )
        .then((response) => {
          this.docs = response.data.docs;
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
        });
    },
    changePageListener(page) {
      this.dataLoad(page);
    },
  },
  watch: {
    payments: function (newValue, oldValue) {
      this.docs = newValue.docs;
      this.pagination.currentPage = parseInt(newValue.page, 10);
      this.pagination.total = newValue.totalDocs;
      this.pagination.perPage = newValue.limit;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100% !important;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid transparent;
}

.card-title {
  font-size: 1.1rem;
  font-family: IranSansBold;
  color: black !important;
  text-align: right;
}

span {
  color: #636363 !important;
}

@media only screen and (max-width: 678px) {
  span {
    font-size: 0.96em !important;
  }
}
</style>
