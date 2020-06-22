<template>
  <div id="app">
    <Scanner msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Scanner from './components/Scanner.vue'

export default {
  name: 'App',
  components: {
    Scanner
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
