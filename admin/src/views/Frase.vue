<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          item-text="descricao"
          item-value="_id"
          return-object
          :items="arrCategorias"
          v-model="frase.categoria"
          label="Categoria"
        ></v-select>

        <v-text-field label="EN" v-model="frase.descricao"></v-text-field>
        <v-text-field label="PT" v-model="frase.descricaoPt"></v-text-field>
        <v-btn @click="salvar()">Salvar</v-btn>
        <v-btn @click="cancelarEditar()">Cancelar</v-btn>
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

    <v-snackbar v-model="snackbar">
      {{ mensagem.texto }}
      <v-btn color="indigo" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>Confirmação</v-card-title>
        <v-card-text>Deseja realmente remover o registro?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="cancelarDeletar()">Não</v-btn>
          <v-btn color="green darken-1" @click="confirmarDeletar()">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      modoEdicao: false,
      snackbar: false,
      mensagem: { texto: "" },
      dialog: false,
      itemADeletar: {},
      headers: [
        {
          text: "Categoria",
          align: "left",
          sortable: true,
          value: "categoria.descricao"
        },
        {
          text: "Descrição EN",
          align: "left",
          sortable: true,
          value: "descricao"
        },
        {
          text: "Descrição PT",
          align: "left",
          sortable: true,
          value: "descricaoPt"
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
    desejaEditar(item) {
      this.frase = item;
      this.modoEdicao = true;
    },
    cancelarEditar() {
      this.frase = {};
      this.modoEdicao = false;
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
    },
    salvar() {
      if (this.modoEdicao == true) {
        //Faz um request PUT pra API

        axios
          .put("http://localhost:3000/frase", this.frase)
          .then(response => {
            this.mensagem.texto = response.data;
            this.snackbar = true;
          })
          .catch(error => {
            console.log(error);
          });

        this.modoEdicao = false;
      } else {
        //Faz um request POST pra API
        axios
          .post("http://localhost:3000/frase", this.frase)
          .then(response => {
            this.mensagem.texto = response.data;
            this.snackbar = true;
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.frase = {};
      this.buscarFrases();
    },

    desejaDeletar(item) {
      this.itemADeletar = item;
      this.dialog = true;
    },

    cancelarDeletar() {
      this.dialog = false;
      this.itemADeletar = {};
    },

    confirmarDeletar() {
      this.dialog = false;
      this.deleteFrase(this.itemADeletar);
      this.itemADeletar = {};
    },

    deleteFrase(item) {
      axios
        .delete("http://localhost:3000/frase/" + item._id)
        .then(response => {
          let index = this.arrFrases.indexOf(item);
          this.arrFrases.splice(index, 1);

          this.mensagem.texto = response.data;
          this.snackbar = true;
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