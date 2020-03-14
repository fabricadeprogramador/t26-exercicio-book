<template>
  <v-app>
    <v-container v-if="isLogado() && !recuperar">
      <v-navigation-drawer app clipped v-model="drawer">
        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" :to="item.route">
            <!-- ícone -->
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <!-- texto  -->
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="sair()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <!-- texto  -->
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer=!drawer" />
        <v-toolbar-title>Admin App Frases</v-toolbar-title>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-container>
    <v-container v-if="!isLogado() && !recuperar">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field class="pa-2" required label="E-mail" v-model="usuario.email"></v-text-field>
              <v-text-field
                class="pa-2"
                required
                label="Senha"
                v-model="usuario.senha"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="logar()">Logar</v-btn>
          <v-btn>Lembrar Senha</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container v-if="recuperar">
      <v-row>
        <v-col>Recuperar Senha</v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar">
      {{ mensagem.texto }}
      <v-btn color="indigo" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      snackbar: false,
      mensagem: { texto: "" },
      usuario: {},
      logado: false,
      drawer: null,
      recuperar: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
        {
          title: "Categoria",
          icon: "mdi-card-text-outline",
          route: "/categoria"
        },
        { title: "Frases", icon: "mdi-card-text-outline", route: "/frase" },
        { title: "Usuario", icon: "mdi-account", route: "/usuario" },
        { title: "Rede Social", icon: "mdi-account", route: "/redesocial" }
      ],
      right: null
    };
  },
  methods: {
    isLogado() {
      return (
        this.logado == true && localStorage.getItem("user-token") != undefined
      );
    },

    sair() {
      this.logado = false;
      localStorage.removeItem("user-token");
      this.usuario = {};
    },
    logar() {
      axios
        .post("http://localhost:3000/gerar-token", this.usuario)
        .then(response => {
          localStorage.setItem("user-token", response.data);

          this.logado = true;
        })
        .catch(error => {
          this.snackbar = true;
          this.mensagem.texto = "Usuário não permitido";
          //console.error(error);
        });
    }
  },

  watch: {
    $route(to, from) {
      if (to.path.indexOf("recuperarsenha") != -1) {
        this.recuperar = true;
      } else {
        this.recuperar = false;
      }
      console.log("watch:" + to.path);
    }
  },
  created() {
    console.log("created:" + this.$route.path);
    this.$vuetify.theme.dark = true;
    if (this.$route.path.indexOf("recuperarsenha") != -1) {
      this.recuperar = true;
    } else {
      this.recuperar = false;
    }
  }
};
</script>
