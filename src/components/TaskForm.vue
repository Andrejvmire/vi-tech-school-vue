<template>
  <div>
    <md-field>
      <label>Тема задачи</label>
      <md-input required :value="title" @input="$emit('change-title', $event)" />
      <span class="md-error">Ошибка</span>
    </md-field>
    <md-field>
      <label>Описание</label>
      <md-textarea required :value="description" @input="$emit('change-description', $event)" />
      <span class="md-helper-text">Текст подсказка</span>
      <span class="md-error">Ошибка</span>
    </md-field>
    <md-button class="task__btn">Сохранить изменения</md-button>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  data: () => ({
    taskTheme: null,
    defaultDescription: '',
  }),
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.task {
  &__btn {
    width: 100%;
    background-color: #37ce7e;
    border-radius: 4px;
    margin: 0;

    &::v-deep .md-button-content {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      text-transform: none;
    }
  }
}
</style>
