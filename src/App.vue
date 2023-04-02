<template>
  <div id="app">
    <NavBar/>
    <LayoutComponent/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import LayoutComponent from "@/components/Layout";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: 'App',
  components: {
    NavBar,
    LayoutComponent
  },
  data(){
    return {
      user: {  }
    }
  },
  compatConfig: { MODE: 3 },
  methods:{
    ...mapMutations(["setToken"]),
  },
  mounted(){
    if(localStorage.getItem('token')){
      axios.get(`http://127.0.0.1:8000/api/getMe`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        this.setToken(localStorage.getItem('token'));
      }).catch(() => {
        this.$router.push(`/Sigin`)
      })
    }else{
      this.$router.push(`/`)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
