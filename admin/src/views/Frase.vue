<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          item-text="descricao"
          item-value="_id"
          :items="arrCategorias"
          v-model="frase.categoria"
          label="Categoria"
        ></v-select>

        <v-text-field label="Frase" v-model="frase.descricao"></v-text-field>
        <v-btn @click="salvar()">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      frase: {},
      arrCategorias: []
    };
  },
  methods: {
    salvar() {
      axios
        .post("http://localhost:3000/frase", this.frase)
        .then(response => {
          this.frase = {};
          window.alert("Frase salva com sucesso");
        })
        .catch(error => {
          console.log(error);
        });
    },

    buscarCategorias() {
      axios
        .get("http://localhost:3000/categoria")
        .then(response => {
          this.arrCategorias = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {
    this.buscarCategorias();
  }
};
</script>