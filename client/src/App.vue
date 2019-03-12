<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-10 offset-1">
        <router-link class="home" to="/"><i class="fab fa-fort-awesome"></i></router-link>
        <button class="logout" @click="logout">LOGOUT</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .home {
    font-size: 35px;
    position: fixed;
    left: 25px;
    top: 10px;
  }

  .logout {
    position: fixed;
    right: 25px;
    top: 20px;
  }
</style>