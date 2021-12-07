<template>
  <div class="home">
    <md-card class="card" v-if="isSignIn">
      <md-card-content>
        <md-field :class="getValidationClass('signUp.email')">
          <label>Email</label>
          <md-input v-model="signUp.email"></md-input>
          <span class="md-error" v-if="!$v.signUp.email.required">Поле обязательно для заполнения</span>
          <span class="md-error" v-else-if="!$v.signUp.email.email">Поле должно содержать адрес e-mail</span>
        </md-field>
        <md-field :class="getValidationClass('signUp.plainPassword')">
          <label>Пароль</label>
          <md-input v-model="signUp.plainPassword" type="password"></md-input>
          <span class="md-error">Поле обязательно для заполнения</span>
        </md-field>
        <md-field :class="getValidationClass('signUp.repeatedPlainPassword')">
          <label>Пароль еще раз</label>
          <md-input v-model="signUp.repeatedPlainPassword" type="password"></md-input>
          <span class="md-error" v-if="!$v.signUp.repeatedPlainPassword.required">Поле обязательно для заполнения</span>
          <span class="md-error" v-else-if="!$v.signUp.repeatedPlainPassword.sameAsPlainPassword">
            Пароль не совпадает
          </span>
        </md-field>
        <md-field :class="getValidationClass('signUp.fullName')">
          <label>Как вас зовут</label>
          <md-input v-model="signUp.fullName"></md-input>
          <span class="md-error">Поле обязательно для заполнения</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="isSignIn = false">Войти</md-button>
        <md-button @click="validationRegistration">Отправить</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="card" v-else>
      <md-card-content>
        <md-field :class="getValidationClass('signIn.email')">
          <label>Email</label>
          <md-input v-model="signIn.email" type="email"></md-input>
          <span class="md-error">Поле обязательно для заполнения</span>
          <span class="md-error">Поле должно содержать адрес e-mail</span>
        </md-field>
        <md-field :class="getValidationClass('signIn.password')">
          <label>Пароль</label>
          <md-input v-model="signIn.password" type="password"></md-input>
          <span class="md-error">Поле обязательно для заполнения</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="validationLogin">Войти</md-button>
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
import cookies from 'js-cookie';
import { email, required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (cookies.get('token')) {
        vm.$router.push({ name: 'TasksList' });
      }
    });
  },
  data() {
    return {
      signIn: {
        email: '',
        password: '',
      },
      signUp: {
        email: '',
        plainPassword: '',
        repeatedPlainPassword: '',
        fullName: '',
      },
      isSignIn: false,
      error: '',
    };
  },
  methods: {
    async signUpMethod() {
      try {
        const response = await this.$api.post('registration', this.signUp);
        if (!response.data.error) {
          this.signIn.email = this.signUp.email;
          this.signIn.password = this.signUp.plainPassword;
          await this.loginMethod();
        } else {
          this.error = response.data.error;
        }
        console.log(response);
      } catch (error) {
        this.error = error.message;
        console.error(error);
      }
    },
    async loginMethod() {
      try {
        const response = await this.$api.post('login', {
          email: this.signIn.email,
          password: this.signIn.password,
        });
        console.log(response);
        cookies.set('token', response.data.data);
        await this.$router.push({ name: 'TasksList' });
      } catch (error) {
        console.error(error);
      }
    },
    getValidationClass(fieldName) {
      const [group, field] = fieldName.split('.');
      const vualidateGroup = this.$v[group];
      if (vualidateGroup) {
        const vualidateField = vualidateGroup[field];
        if (vualidateField) {
          return {
            'md-invalid': vualidateField.$invalid && vualidateField.$dirty,
          };
        }
      }
    },
    validationLogin() {
      this.$v.$touch();
      if (!this.$v.signIn.$invalid) {
        this.loginMethod();
      }
    },
    validationRegistration() {
      this.$v.$touch();
      if (!this.$v.signUp.$invalid) {
        this.signUpMethod();
      }
    },
  },
  validations: {
    signIn: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
    signUp: {
      email: {
        email,
        required,
      },
      plainPassword: {
        required,
      },
      repeatedPlainPassword: {
        required,
        sameAsPlainPassword: sameAs('plainPassword'),
      },
      fullName: {
        required,
      },
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
