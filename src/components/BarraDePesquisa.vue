<template>
  <div class="barraPesquisa">
          <b-input-group :size="tamanhoDaTela ? 'sm' : 'lg'" class="mb-0">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="search"
              placeholder="Pesquisar produtos"
            ></b-form-input>
          </b-input-group>
        </div>
</template>

<style scoped>
  @import '/public/css/header&footer.css';
</style>

<script>
export default {
  data() {
    return {
      tamanhoDaTela: window.innerWidth <= 425,
    };
  },
  methods: {
    updateScreenSize() {
      this.tamanhoDaTela = window.innerWidth <= 425
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
};
</script>