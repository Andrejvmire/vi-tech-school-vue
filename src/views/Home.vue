<template>
  <div class="home">
    <md-card class="card" v-if="isSignIn">
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input v-model="signIn.email"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="signIn.plainPassword"></md-input>
        </md-field>
        <md-field>
          <label>Пароль еще раз</label>
          <md-input v-model="signIn.repeatedPlainPassword"></md-input>
        </md-field>
        <md-field>
          <label>Как вас зовут</label>
          <md-input v-model="signIn.fullName"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="isSignIn = false">Войти</md-button>
        <md-button @click="signInMethod">Отправить</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="card" v-else>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="loginMethod">Войти</md-button>
        <md-button @click="isSignIn = true">Зарегистрироваться</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="card" v-if="error">
      <md-card-content>
        {{ error }}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: '',
      isSignIn: false,
      signIn: {
        email: '',
        plainPassword: '',
        repeatedPlainPassword: '',
        fullName: '',
      },
      error: '',
    };
  },
  methods: {
    async signInMethod() {
      try {
        const response = await this.$api.post('registration', this.signIn);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async loginMethod() {
      try {
        const response = await this.$api.post('login', {
          email: this.email,
          password: this.password,
        });
        this.$api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin: 100px auto;
}
</style>
