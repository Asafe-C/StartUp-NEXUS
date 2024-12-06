<template>
  <div class="barraPesquisa">
    <b-input-group :size="tamanhoBarra" class="mb-0">
      <b-input-group-prepend is-text>
        <b-icon icon="search" @click="goToSearchPage"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        v-model="varPesquisa"
        placeholder="Pesquisar produtos"
        aria-label="Buscar"
        @keyup.enter="goToSearchPage"
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<style scoped>
@import "/public/css/header&footer.css";
</style>

<script>
export default {
  data() {
    return {
      tamanhoDaTela: window.innerWidth,
      varPesquisa: "",
    };
  },

  computed: {
        tamanhoBarra() {
          if (this.tamanhoDaTela <= 450) return 'sm';
          return 'lg';
        },
      },

  methods: {
    updateScreenSize() {
        this.tamanhoDaTela = window.innerWidth;
      },

      goToSearchPage() {
        if (this.varPesquisa) {
    // Verifica se já está na página de pesquisa
    if (this.$route.name !== "search") {
      // Se não estiver, redireciona para a página de pesquisa
      this.$router.push({ name: "search", query: { q: this.varPesquisa } });
    } else {
      // Caso já esteja, recarrega a página
      this.$router.replace({ name: "search", query: { q: this.varPesquisa } });
      window.location.reload();
    }
  }
  },

  mounted() {
    window.addEventListener('resize', this.updateScreenSize);
    console.log(this.varPesquisa)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
},
};
</script>
