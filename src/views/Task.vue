<template>
  <section>
    <md-toolbar>
      <h1 class="md-title" style="flex: 1; text-align: left">{{ getTaskById(id).title }}</h1>
      <i :class="`task__text--${getTaskById(id).className}`">{{ status[getTaskById(id).status.title] }}</i>
      <md-button class="task__btn">Редактировать</md-button>
    </md-toolbar>
    <md-content class="container task__container">
      <strong>{{ getTaskById(id).message }}</strong>
    </md-content>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Task',
  props: {
    id: [String, Number],
  },
  data() {
    return {
      status: {
        done: 'Выполнено',
        active: 'В работе',
        overdue: 'Просрочено',
      },
    };
  },
  computed: {
    ...mapState(['tasks']),
    ...mapGetters(['getTaskById']),
  },
  methods: {
    changeTitle(title) {
      this.getTask.name = title;
    },
    changeDescription(description) {
      this.getTask.description = description;
    },
  },
};
</script>
<style lang="scss" scoped>
.task {
  &__container {
    padding-top: 16px;
    text-align: left;
    background: none !important;
  }

  &__btn {
    background-color: #37ce7e;
    border-radius: 4px;

    &::v-deep .md-button-content {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      text-transform: none;
    }
  }

  &__text {
    &--done {
      color: #37ce7e;
    }

    &--active {
      color: #4c7397;
    }

    &--overdue {
      color: #db545a;
    }
  }
}
</style>
