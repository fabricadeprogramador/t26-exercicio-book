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
          <v-btn @click="lembrar()">Lembrar Senha</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container v-if="recuperar">
      <v-card>
        <v-card-title>Recuperar Senha</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
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
          <v-btn @click="alterarSenha()">Alterar Senha</v-btn>
        </v-card-actions>
      </v-card>
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

    lembrar() {
      axios
        .put("http://localhost:3000/recuperarsenha", this.usuario)
        .then(response => {
          console.log(response.data);
          this.mensagem = "Por favor verique sua caixa de e-mail";
        })
        .catch(error => {
          this.snackbar = true;
          this.mensagem.texto = "Usuário não permitido";
          //console.error(error);
        });
    },

    alterarSenha() {
      axios
        .put("http://localhost:3000/alterarsenha", this.usuario)
        .then(response => {
          this.mensagem.texto = response.data;
          this.snackbar = true;
          this.usuario = {};
          //vai pro login
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });

      //enviar o token e a nova senha pra API
      console.log("Recuperando senha :" + this.$route.params);
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
    },

    setToken(url) {
      let arr = (this.tokenUrl = url.split("/"));
      let token = arr[arr.length - 1];
      console.log("Sentando Token:" + token);
      localStorage.setItem("user-token", token);
    }
  },

  watch: {
    $route(to, from) {
      if (to.path.indexOf("recuperarsenha") != -1) {
        this.recuperar = true;
        this.setToken(to.path);
      } else {
        this.recuperar = false;
      }
    }
  },
  created() {
    this.$vuetify.theme.dark = true;

    if (this.$route.path.indexOf("recuperarsenha") != -1) {
      this.setToken(this.$route.path);

      this.recuperar = true;
    } else {
      this.recuperar = false;
    }
  }
};
</script>
