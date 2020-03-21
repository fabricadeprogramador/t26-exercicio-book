<template>
  <v-container>
    <v-row class="text-center">
      <v-col v-for="(fra, i) in arrFrases" :key="i" cols="12">
        <v-card>
          <v-card-title v-text="fra.descricao"> </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Frase",

  data: () => ({
    arrFrase: {}
  }),
  methods: {
    listar() {
      axios
        .get("http://localhost:3000/public/frase")
        .then(response => {
          this.arrFrases = response.data;
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
