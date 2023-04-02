<template>
  <div class="card" style="width: auto;">
    <div class="card-header p-0">
      <div style="background-color: rgba(0, 0, 0, 0.175); width: auto; height: 250px;" class="d-flex justify-content-end p-2">
        <template v-if="isFavorite">
          <span @click="changeFavorite(isFavorite, id)">
             <BootstrapIcon
                 style="cursor: pointer"
                 icon="heart-fill"
                 variant="danger"
                 size="2x"/>
          </span>
        </template>
        <template v-else>
          <span @click="changeFavorite(isFavorite, id)">
            <BootstrapIcon
                icon="heart"
                style="cursor: pointer"
                variant="danger"
                size="2x"/>
          </span>
        </template>
      </div>
    </div>
    <div class="card-body d-flex flex-column justify-content-start">
      <h5 class="card-title text-start text-black text-decoration-none">{{ name }}</h5>
      <p class="text-start">
        {{ family }}
      </p>
      <p class="text-start">
        {{ genus }}
      </p>
      <p class="text-start">
        {{ orders }}
      </p>
    </div>
  </div>
</template>
<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

export default {
  name: 'CardComponent',
  components: {
    BootstrapIcon
  },
  props: [ 'id', 'name', 'genus', 'family', 'orders', 'isFavorite', 'changeFavorite' ],
}
</script>
