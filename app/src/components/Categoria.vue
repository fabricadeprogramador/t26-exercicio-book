<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel
            @change="loadFrase(cat._id)"
            v-for="(cat, i) in arrCategorias"
            :key="i"
          >
            <v-expansion-panel-header
              >{{ cat.descricao }} - {{ cat._id }}</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" v-for="(frase, i) in arrFrases" :key="i">{{
                  frase.descricao
                }}</v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <!-- <v-col v-for="(cat, i) in arrCategorias" :key="i" cols="12">
        <v-card>
          <v-card-title v-text="cat.descricao"> </v-card-title>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Categoria",

  data: () => ({
    arrCategorias: {},
    arrFrases: [],
    urlApi: "http://localhost:3000/",
    urlApi2: "https://book-phase-api.herokuapp.com/"
  }),
  methods: {
    loadFrase(idCat) {
      //alert(idCat);

      axios
        .get(this.urlApi2 + "public/frase/categoria/" + idCat)
        .then(response => {
          this.arrFrases = response.data;
          console.log(this.arrFrases);
        })
        .catch(error => {
          console.log(error);
        });
    },
    listar() {
      axios
        .get(this.urlApi2 + "public/categoria")
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
