<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
    <div class="row">
      <div class="offset-6 col-6 mr-auto">
        <h1 class="login-title">KanBanana</h1>
        <form v-if="loginForm" @submit.prevent="loginUser">
          <div class="row">
            <div class="col-12">
              <input class="email" type="email" v-model="creds.email" placeholder="Email Address">
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <input class="email" type="password" v-model="creds.password" placeholder="Password">
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button class="login-button" type="submit">Login</button>
            </div>
          </div>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name">
          <input type="email" v-model="newUser.email" placeholder="email">
          <input type="password" v-model="newUser.password" placeholder="password">
          <button type="submit">Create Account</button>
        </form>
        <div class="action" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to Register</p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }

  .login {
    margin-top: 350px;
  }

  .login-title {
    font-size: 80px;
    color: rgb(250, 250, 23);
    text-shadow: 2px 2px black;
    font-family: 'Sniglet', cursive;
  }

  .email {
    background-color: transparent;
    border: none;
    border-bottom: solid;
    border-width: 1px;
    margin-bottom: 5px;
    border-color: rgb(179, 178, 178);
    box-shadow: 1px black;
  }

  .login-button {
    min-width: 155px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgb(0, 0, 0);
    background-color: rgb(251, 255, 4);
  }

  input::placeholder {
    color: rgb(179, 178, 178);
    text-shadow: 1px 1px rgb(66, 65, 65);
    font-family: 'Knait', sans-serif;
  }

  input:focus {
    outline: none;
  }
</style>