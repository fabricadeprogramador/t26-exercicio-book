<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="categoria.descricao"></v-text-field>

        <v-btn @click="salvar()">Salvar</v-btn>&nbsp;
        <v-btn @click="cancelarEditar()">Cancelar</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="arrCategorias"
          :items-per-page="5"
          class="elevation-1"
        >
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
      headers: [
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
      ],

      snackbar: false,
      categoria: {},
      arrCategorias: [],
      mensagem: { texto: "" },
      dialog: false,
      itemADeletar: {},
      modoEdicao: false
    };
  },
  methods: {
    desejaEditar(item) {
      this.categoria = item;
      this.modoEdicao = true;
    },
    cancelarEditar() {
      this.categoria = {};
      this.modoEdicao = false;
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
      this.deleteCategoria(this.itemADeletar);
      this.itemADeletar = {};
    },

    deleteCategoria(item) {
      axios
        .delete("http://localhost:3000/categoria/" + item._id)
        .then(response => {
          let index = this.arrCategorias.indexOf(item);
          this.arrCategorias.splice(index, 1);

          this.mensagem.texto = response.data;
          this.snackbar = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    listar() {
      axios
        .get("http://localhost:3000/categoria")
        .then(response => {
          this.arrCategorias = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    salvar() {
      //mandar pra API
      if (this.modoEdicao == true) {
        //editacao -PUT
        //
        axios
          .put("http://localhost:3000/categoria", this.categoria)
          .then(response => {
            this.mensagem.texto = response.data;
            this.snackbar = true;
            this.listar();
          })
          .catch(error => {
            console.log(error);
          });

        this.modoEdicao = false;
      } else {
        //cadastrar = POST
        axios
          .post("http://localhost:3000/categoria", this.categoria)
          .then(response => {
            this.mensagem.texto = response.data;
            this.snackbar = true;
            this.listar();
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.categoria = {};
    }
  },
  mounted() {
    this.listar();
  }
};
</script>
