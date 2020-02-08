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

    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="arrFrases" :items-per-page="5" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="desejaDeletar(item)">mdi-delete</v-icon>
            <v-icon small class="mr-2" @click="desejaEditar(item)">mdi-pencil</v-icon>
          </template>
        </v-data-table>
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
      arrFrases: [],
      arrCategorias: [],

      headers: [
        {
          text: "Categoria",
          align: "left",
          sortable: true,
          value: "categoria.descricao"
        },
        {
          text: "Descrição",
          align: "left",
          sortable: true,
          value: "descricao"
        },
        {
          text: "Ações",
          value: "action",
          sortable: false,
          align: "right"
        }
      ]
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
    },
    buscarFrases() {
      let vm = this;
      axios
        .get("http://localhost:3000/frase/comcategoria")
        .then(response => {
          this.arrFrases = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {
    this.buscarCategorias();
    this.buscarFrases();
  }
};
</script>