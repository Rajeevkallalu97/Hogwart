<template>
  <div id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <section>
      <div class="col1">
        <h1>Hogwarts</h1>

        <p>
          Welcome to the Hogwarts
        </p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div class="error">
            <h6 v-if="errorMsg !== ''">{{ errorMsg }}</h6>
          </div>

          <div>
            <label for="email1">Email</label>
            <input
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
            />
          </div>

          <button @click="login()" v-on:keyup.enter="login()" class="button">
            Log In
          </button>
          <!-- Password reset code -->
          <div class="extras">
            <a @click="togglePasswordReset()"><u>Forgot Password</u></a>
            <a @click="toggleForm()"><u>Create an Account</u></a>
          </div>

          <!-- SignUp Form code -->
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div class="error">
            <h6 v-if="errorMsg_sign !== ''">{{ errorMsg_sign }}</h6>
          </div>
          <div>
            <label for="name">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="Full Name"
              id="name"
            />
          </div>
          <div>
            <label for="location">Location</label>
            <input
              v-model.trim="signupForm.location"
              type="text"
              placeholder="Current Location"
              id="location"
            />
          </div>
          <div>
            <label for="email2">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
            />
          </div>
          <div>
            <label for="password2">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
            />
          </div>
          <button @click="signup()" v-on:keyup.enter="signup()" class="button">
            Sign Up
          </button>
          <div class="extras">
            <a @click="toggleForm()"><u>Login Instead</u></a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
import firebase from 'firebase'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        location: '',
        email: '',
        password: ''
      },
      errorMsg: '',
      errorMsg_sign: '',
      showLoginForm: false,
      showPasswordReset: false
    }
  },
  computed: {},

  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
      this.errorMsg = ''
      this.errorMsg_sign = ''
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
      this.errorMsg = ''
      this.errorMsg_sign = ''
    },
    login() {
      NProgress.start()
      this.$store
        .dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then(res => {
          NProgress.done()
        })
        .catch(err => {
          this.errorMsg = err.message
          NProgress.done()
        })
    },
    signup() {
      NProgress.start()
      this.$store
        .dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          location: this.signupForm.location
        })
        .then(res => {
          NProgress.done()
        })
        .catch(err => {
          NProgress.done()
          this.errorMsg_sign = err.message
        })
    }
  }
}
</script>

<style scoped>
.error h6 {
  margin-top: 1rem;
  text-align: center;
  color: #ef5777;
  margin: 0;
}
</style>
