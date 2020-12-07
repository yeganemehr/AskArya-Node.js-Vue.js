<template>
  <section dir="ltr" class="container py-5">
    <h2 class="text-center py-3 pb-5">All Quizzes</h2>
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
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Edit Quiz
          </b-button>

          <b-button class="mr-1" size="sm" @click="row.toggleDetails">
            View Quiz
          </b-button>

          <b-button size="sm" @click="row.toggleDetails">
            Delete Quiz
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

    <div class="pt-3">
      <CreateEditQuiz></CreateEditQuiz>
    </div>
  </section>
</template>

<script>
import CreateEditQuiz from './CreateEditQuiz';

export default {
  components: {
    CreateEditQuiz,
  },
  data() {
    return {
      items: [
        {
          quizAttempts: 40,
          name: { first: 'Quiz 1' },
          course: { first: 'Grammar Course' },
        },
        {
          quizAttempts: 21,
          name: { first: 'Quiz 2' },
          course: { first: 'Vocab Course' },
        },
        {
          quizAttempts: 9,
          name: { first: 'Quiz 3' },
          course: { first: 'Grammar Course' },
        },
        {
          quizAttempts: 89,
          name: { first: 'Quiz 4' },
          course: { first: 'Writing Course' },
        },
        {
          quizAttempts: 38,
          name: { first: 'Quiz 5' },
          course: { first: 'Grammar Course' },
        },
        {
          quizAttempts: 27,
          name: { first: 'Quiz 6' },
          course: { first: 'Reading Course' },
        },
        {
          quizAttempts: 40,
          name: { first: 'Quiz 7' },
          course: { first: 'Writing Course' },
        },
      ],
      fields: [
        {
          key: 'name',
          label: 'Quiz Name',
          sortable: true,
          sortDirection: 'desc',
        },

        {
          key: 'course',
          label: 'Related Course',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'quizAttempts',
          label: 'Quiz Attempts',
          sortable: true,
          class: 'text-center',
        },

        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
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
