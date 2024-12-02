<template>
  <div class="login">
    <div v-if="usuarioActivo" class="loginInterno">
      <img
        style="margin: auto; width: 30px"
        src="/images/do-utilizador.png"
        alt="Login"
      />
      <div class="userName">
        <p style="color: white; font-weight: 600; margin: auto">
          {{ nomeExibicao }}
        </p>
      </div>
    </div>
    <div v-else class="loginInterno loginInterno2">
      <p style="color: white; font-weight: 600; margin: auto">
        <router-link to="/login" class="loginCadastro">Login</router-link>
        |
        <router-link to="/cadastro" class="loginCadastro"
          >Cadastre-se</router-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
  @import '/public/css/header&footer.css';
</style>

<script>
export default {
  data() {
    return {
      nomeExibicao:
        localStorage.getItem("pNomeUsuario") +
        " " +
        localStorage.getItem("sobrenomeUsuario"),
      usuarioActivo: localStorage.getItem("isLogged") === "true",
    };
  },
};
</script>