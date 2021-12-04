<template>
  <div>
    <md-button @click="showCreateModal">Создать задачу</md-button>
    <md-list class="task__list">
      <router-link v-for="task in tasks" :to="`/task/${task.id}`" :key="task.id">
        <md-list-item class="task__item md-error" :class="`task__item--${task.className}`">
          <span class="task__number">{{ task.id }}</span>
          <div class="task__group">
            <span class="task__name">{{ task.title }}</span>
            <p class="task__text">{{ task.message }}</p>
          </div>
          <md-button @click.stop.prevent="deleteTask(task.id)">Удалить</md-button>
        </md-list-item>
      </router-link>
    </md-list>
    <md-dialog :md-active.sync="isCreateModalShow">
      <md-card class="create-task">
        <md-card-content>
          <md-field :class="getValidationClass('title')">
            <label>Заголовок *</label>
            <md-input v-model="form.title"></md-input>
            <span class="md-error">Поле обязательно для заполнения</span>
          </md-field>
          <md-field :class="getValidationClass('message')">
            <label>Описание *</label>
            <md-textarea v-model="form.message"></md-textarea>
            <span class="md-error">Поле обязательно для заполнения</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button @click="isCreateModalShow = false">Отменить</md-button>
          <md-button @click="validateForm">Создать задачу</md-button>
        </md-card-actions>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'TripleLine',
  data() {
    return {
      isCreateModalShow: false,
      form: {
        title: '',
        message: '',
      },
      error: '',
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      message: {
        required,
      },
    },
  },
  mounted() {
    this.getTasks();
  },
  computed: {
    ...mapState(['tasks']),
  },
  methods: {
    ...mapActions(['getTasks']),
    showCreateModal() {
      this.isCreateModalShow = true;
    },
    validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.createTask();
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    async createTask() {
      try {
        await this.$api.post('request/add', {
          title: this.title,
          message: this.message,
        });
        this.title = '';
        this.message = '';
        this.isCreateModalShow = false;
      } catch (error) {
        console.error(error);
        this.error = 'Что-то пошло не так';
      }
    },
    async deleteTask(id) {
      try {
        await this.$api.post(`request/delete/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  &__list {
    width: 100%;
    max-width: 854px;
    display: inline-block;
    vertical-align: top;

    &::v-deep a:hover {
      text-decoration: none;
    }
  }

  &__item {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;

    &--waiting {
      background-color: #fbf981;
    }

    &--done {
      background-color: #37ce7e;
    }

    &--active {
      background-color: #4c7397;
    }
  }

  &__number {
    height: 100%;
    width: 203px;
    color: #fff;
    font-size: 64px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__number::before {
    content: '';
    display: block;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    width: 203px;
    min-height: 209px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-left: 10%;
  }

  &__name {
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }

  &__text {
    color: #fff;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }
}

.md-list-item-content {
  padding: 0 !important;
}

.md-list-item-container {
  height: 100%;
}

.create-task {
  padding: 20px 50px;
  min-width: 500px;
  max-width: 100%;
}

.error {
  color: red;
}
</style>
