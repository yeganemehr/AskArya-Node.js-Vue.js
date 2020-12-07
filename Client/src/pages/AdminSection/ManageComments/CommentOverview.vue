<template>
  <section dir="ltr" class="container py-5">
    <h2 class="text-center py-3 pb-5">All Comments</h2>
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row class="mb-5">
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size=",d"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        show-empty
        hover
        responsive="sm"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template #cell(name)="row">
          {{ row.value.first }}
        </template>

        <template #cell(course)="row">
          {{ row.value.first }}
        </template>

        <template #cell(actions)="row">
          <b-button size="sm" class="mr-3" @click="row.toggleDetails">
            View Comment
          </b-button>

          <!-- If comment is Approved/Rejected its button should be highlighted green -->
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Approve Comment
          </b-button>

          <b-button size="sm" @click="row.toggleDetails">
            Reject Comment
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <div class="col-md-4 my-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: [
        {
          relatedPost: 'Course 1',
          user: 'Arya Doe',
          date: '19/04/2020',
          status: 'Approved',
        },
        {
          relatedPost: 'Article 1',
          user: 'Shima Doe',
          date: '15/08/2020',
          status: 'Rejected',
        },

        {
          relatedPost: 'Quiz 2',
          user: 'John Doe',
          date: '21/04/2020',
          status: 'Approved',
        },
      ],
      fields: [
        {
          key: 'relatedPost',
          label: 'Related Post',
          sortable: true,
          sortDirection: 'desc',
        },

        {
          key: 'user',
          label: 'User',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'date',
          label: 'Comment Date',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
          class: 'text-center',
        },

        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 30, 50],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
    };
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
};
</script>

<style lang="scss" scoped>
table .btn {
  background: blue !important;
  border: transparent !important;
  font-size: 1em !important;
}

table .btn:hover {
  background: rgb(0, 0, 209) !important;
}
</style>
