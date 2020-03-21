<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        Categoria
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Categoria",

  data: () => ({}),
  methods: {
    listar() {
      axios
        .get("http://localhost:3000/public/categoria")
        .then(response => {
          this.arrCategorias = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
