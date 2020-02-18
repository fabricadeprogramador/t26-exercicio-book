<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="redeSocial.descricao" label="Descrição"></v-text-field>
        <v-text-field v-model="redeSocial.link" label="Link"></v-text-field>
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
      redeSocial: {},
      arrRedeSocial: []
    };
  },
  methods: {
    salvar() {
      axios
        .post("http://localhost:3000/redesocial", this.redeSocial)
        .then(response => {
          window.alert(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    buscarRedes() {
      axios
        .get("http://localhost:3000/redesocial")
        .then(response => {
          this.arrRedeSocial = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.buscarRedes();
  }
};
</script>