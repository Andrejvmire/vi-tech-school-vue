<template>
  <section class="md-layout md-gutter">
    <md-table class="md-layout md-gutter">
      <md-table-toolbar>
        <h1 class="md-title">Аналитика</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head class="table__cell" md-numeric>ID</md-table-head>
        <md-table-head class="table__cell">Исполнитель</md-table-head>
        <md-table-head class="table__cell table__cell--done">Выполненные</md-table-head>
        <md-table-head class="table__cell table__cell--active">В очереди</md-table-head>
        <md-table-head class="table__cell table__cell--overdue">Просрочены</md-table-head>
      </md-table-row>

      <md-table-row v-for="(analytics, index) in userAnalytics" :key="index">
        <md-table-cell class="table__cell" md-numeric>{{ analytics.id }}</md-table-cell>
        <md-table-cell class="table__cell">{{ analytics.name }}</md-table-cell>
        <md-table-cell class="table__cell table__cell--done">{{ analytics.done }}</md-table-cell>
        <md-table-cell class="table__cell table__cell--active">{{ analytics.active }}</md-table-cell>
        <md-table-cell class="table__cell table__cell--overdue">{{ analytics.overdue }}</md-table-cell>
      </md-table-row>
    </md-table>
  </section>
</template>
<script>
import userAnalytics from '../static/userAnalytics.json';

export default {
  name: 'Analytics',
  data: () => ({
    userAnalytics,
  }),
};
</script>
<style lang="scss" scoped>
.table {
  &__cell {
    font-size: 16px;
    font-weight: 600;

    &--active {
      color: #fff;
      background-color: #4c7397;
    }

    &--done {
      color: #fff;
      background-color: #37ce7e;
    }

    &--overdue {
      color: #fff;
      background-color: #db545a;
    }
  }
}
</style>
