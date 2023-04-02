<template>
    <div class="container mt-4">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="row">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="email">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" >
        </div>
         <button type="submit" class="btn btn-primary col-1 p-2 m-3" @click="handelLoginClick">Login</button>
        </div>
      </div>
    </div>
 </template>

<script>
  import axios from "axios";
  import { mapMutations } from "vuex";

  export default {
    name: 'SiginComponent', components: {
      
    },
    data() {
      return {
        email: '' ,
        password: '',
      }
    },
    methods:{
      ...mapMutations(["setToken"]),
      handelLoginClick() {
            axios.post(`http://127.0.0.1:8000/api/login_check`, {
            username: this.email,
            password: this.password,
          }, {
            headers: {
              'Accept': 'application/json'
            }
          }).then((res) => {
            this.setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            this.$router.push('/')
          })
      }
    }
  
  }
</script>
