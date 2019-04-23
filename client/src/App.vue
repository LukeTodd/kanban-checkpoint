<template>
  <div class="container-fluid banana-bg" id="app">
    <div class="row">
      <div class="col-12 no-pad" v-show="$route.name != 'login'">
        <nav class="navbar navbar-expand-lg navbar-light bg-green">

          <a class="navbar-brand nav-title" href="#">
            <img @click="$router.push({name: 'boards'})" class="kan-logo" src="./assets/Kan-banana-color.png" alt="">
          </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav mr-auto center-text">


            </ul>
            <button @click="logout" class="logout">Logout</button>
          </div>

        </nav>

        <!-- <router-link v-show="$route.name != 'login' && $route.name != 'boards'" to="/"><img class="home"
            src="./assets/banana-home.png">
        </router-link>
        <button v-show="$route.name != 'login'" class="logout" @click="logout">LOGOUT</button> -->
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

<style>
  .banana-bg {
    background-image: url('./assets/kanbanbg.png');
    background-size: cover;
    min-height: 100vh;
  }

  .kan-logo {
    max-height: 70px;
  }

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
    max-height: 50px;
    position: fixed;
    left: 25px;
    top: 10px;
  }

  .logout {
    border-radius: 8px;
    border-width: 1px;
    border-color: black;
    border-style: solid;
    background-color: black;
    color: white;
    font-family: 'Kanit', sans-serif;
    z-index: 2;
  }

  .logout:hover {
    background-color: rgb(95, 93, 93);
  }

  .logout:focus {
    outline: none;
  }

  .no-pad {
    padding: 0px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: black;
  }

  .bg-green {
    background-color: rgba(39, 39, 41, 0.548);
  }

  .nav-title {
    font-family: 'Sniglet', cursive;
    font-size: 30px;
  }
</style>