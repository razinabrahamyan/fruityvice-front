<template>
  <div class="container mt-4">
      <div class="card" style="border: none;">
        <div class="row">
          <div v-for="(fruit, key) of fruits" class="col-6 col-md-4 col-lg-3 p-2" style="padding: 0;" :key="key">
            <Card
                :id="fruit.id"
                :name="fruit.name"
                :genus="fruit.genus"
                :family="fruit.family"
                :orders="fruit.orders"
                :isFavorite="isFavorite(fruit.id)"
                :changeFavorite="addOrRemoveFavorites"
            />
          </div>
          <nav aria-label="Page navigation example" class="mt-3">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#" @click="previousPage">Previous</a></li>
              <li class="page-item" v-for="i in (Math.ceil(totalCount/limit))" :key="i"><a :class="`page-link ${i === page ? 'active' : ''}`" href="#" @click="changePage(i)">{{i}}</a></li>
              <li class="page-item"><a class="page-link" href="#" @click="nextPage">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card";

export default {
  name: 'HomeComponent',
  data() {
    return {
      fruits: [],
      favorites: [],
      totalCount: 0,
      page: 1,
      limit: 8
    }
  },
  components: {
    Card
  },
  mounted() {
    axios.get(`http://127.0.0.1:8000/api/fruity`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      this.fruits = res.data.fruity;
      this.totalCount = res.data.totalCount;
    }).catch((e)=>{
      if (e.response.status === 401){
        this.$router.push(`/Sigin`)
      }
    })
    axios.get(`http://127.0.0.1:8000/api/all-favorites`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      this.favorites = res.data.favorites;
    }).catch((e)=>{
      if (e.response.status === 401){
        this.$router.push(`/Sigin`)
      }
    })
  },
  watch:{
    page(){
      axios.get(`http://127.0.0.1:8000/api/fruity/?offset=${(this.page - 1)*this.limit}&limit=${this.limit}`,{
        headers:{
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        this.fruits = res.data.fruity;
      })
    }
  },
  methods: {
    addOrRemoveFavorites(isFavorite, id){
      axios.get(`http://127.0.0.1:8000/api/${isFavorite ? 'remove' : 'add'}-favorite/${id}`,{
        headers:{
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        if (isFavorite){
          this.favorites = this.favorites.filter(item => item.id !== res.data.fruityId)
        }else{
          this.favorites.push(res.data.fruity);
        }
      })
    },
    changePage(page) {
      if(page !== this.page){
        this.page = page;
      }
    },
    nextPage() {
      if (this.page !== Math.ceil(this.totalCount/this.limit)){
        this.page += 1;
      }
    },
    previousPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    isFavorite(id) {
      return this.favorites.some(item => item.id === id);
    }
  }
}
</script>
