<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
  margin: 0;
  background-color: #690E08
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
}
.button{
  display: inline-block;
  Padding: 10px 15px 10px 5px;
  margin: 5px;
  border-radius: 3px;
  border: 1px solid #FFF;
  background-color: #FFF;
  color: #690E08;
  font-style: italic;
  font-weight: bold;
}
nav{
  margin: 5px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
