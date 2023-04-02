<template>
  <div class="container mt-4">
    <div class="container">
      <div>
        <div class="d-flex justify-content-between">
          <h2>Nutrientation</h2>
          <div class="d-flex gap-2">
            <div class="d-flex gap-2"><span class="fw-bold">Fat</span><span>{{favorites.reduce((initialValue, item) => initialValue + item.nutritions.fat, 0)}}</span></div>
            <div class="d-flex gap-2"><span class="fw-bold">Sugar</span><span>{{favorites.reduce((initialValue, item) => initialValue + item.nutritions.sugar, 0)}}</span></div>
            <div class="d-flex gap-2"><span class="fw-bold">Protein</span><span>{{favorites.reduce((initialValue, item) => initialValue + item.nutritions.protein, 0)}}</span></div>
            <div class="d-flex gap-2"><span class="fw-bold">Calories</span><span>{{favorites.reduce((initialValue, item) => initialValue + item.nutritions.calories, 0)}}</span></div>
            <div class="d-flex gap-2"><span class="fw-bold">Carbohydrates</span><span>{{favorites.reduce((initialValue, item) => initialValue + item.nutritions.carbohydrates, 0)}}</span></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(favorite, key) of favorites" class="col-6 col-md-4 col-lg-3 p-2" style="padding: 1px;" :key="key">
          <Card
              :id="favorite.id"
              :name="favorite.name"
              :genus="favorite.genus"
              :family="favorite.family"
              :orders="favorite.orders"
              :isFavorite="true"
              :changeFavorite="addOrRemoveFavorites"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Card from '@/components/Card';
import axios from "axios";

export default {
  name: 'FavoritesComponent', components: {
    Card
  },
  data() {
    return {
      favorites: [ ],
    }
  },
  mounted() {
    axios.get(`http://127.0.0.1:8000/api/all-favorites`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      this.favorites = res.data.favorites;
    })
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
  }
}
</script>
