<template>
  <v-container>
    <v-row class="text-center">
      <v-col v-for="(cat, i) in arrCategorias" :key="i" cols="12">
        <v-card>
          <v-card-title v-text="cat.descricao"> </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Categoria",

  data: () => ({
    arrCategorias: {}
  }),
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
  },
  created() {
    this.listar();
  }
};
</script>
