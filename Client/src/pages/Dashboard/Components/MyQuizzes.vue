<template>
  <section dir="ltr" class="container py-5">
    <h2 class="text-center py-3 pb-5">My Quizzes</h2>
    <b-container fluid>
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
            to="/demo-quiz"
          >
            View
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
  data() {
    return {
      items: [
        {
          name: { first: 'Quiz 1' },
          grade: '56%',
          quizAttempts: '1/3',
          completed: '10/02/2020',
          _cellVariants: { grade: 'danger', isActive: 'danger' },
        },
        {
          name: { first: 'Quiz 2' },
          grade: '80%',
          quizAttempts: '2/3',
          completed: '02/10/2020',
          _cellVariants: { grade: 'success', isActive: 'success' },
        },
        {
          name: { first: 'Quiz 3' },
          grade: '77%',
          quizAttempts: '4/5',
          completed: '22/09/2020',
          _cellVariants: { grade: 'success', isActive: 'success' },
        },

        {
          name: { first: 'Quiz 3' },
          quizAttempts: '0/5',
          completed: '-',
        },
      ],
      fields: [
        {
          key: 'name',
          label: 'Quiz Name',
          sortable: true,
        },

        {
          key: 'grade',
          label: 'Grade',
          sortable: true,
          sortDirection: 'desc',
        },

        {
          key: 'completed',
          label: 'Completed Date',
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
  background: #11c900 !important;
  border: transparent !important;
  font-size: 1em !important;
}

table .btn:hover {
  background: #0d9201 !important;
}
</style>
