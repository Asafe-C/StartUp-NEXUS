<template>
  <div>
    <!-- Produtos -->
    <b-row :cols="calcularColunas">
      <div
        v-for="(produto, index) in produtosFiltrados"
        :key="index"
        @click="openModal(produto)"
      >
        <div class="card">
          <img
            :src="produto.img"
            class="card-img-top"
            alt="Produto"
            style="height: 30vh; object-fit: cover"
          />
          <div class="card-body productName">
            <h5 class="card-title">{{ produto.nome }}</h5>
          </div>
        </div>
      </div>
    </b-row>

    <!-- Modal -->
    <b-modal
      id="modal"
      size="lg"
      :title="selectedProduto?.nome"
      style="display: grid"
    >
      <b-button
        v-if="estaLogado"
        variant="link"
        @click="toggleFavoriteModal"
        class="fav"
      >
        <b-icon :icon="isFavoritedModal ? 'heart-fill' : 'heart'"></b-icon>
      </b-button>
      <div style="display: grid; place-items: center; width: 100%">
        <img :src="selectedProduto?.img" alt="Produto" class="imgDoModal" />
      </div>
      <div v-if="selectedProduto?.desconto <= 0">
        <p><strong>Preço:</strong> R${{ selectedProduto?.preco.toFixed(2) }}</p>
        <p><strong>Descrição:</strong> {{ selectedProduto?.desc }}</p>
      </div>
      <div v-else>
        <p>
          <strong>Preço:</strong>
          <s>R${{ selectedProduto?.preco.toFixed(2) }}</s> R${{
            (
              selectedProduto?.preco -
              selectedProduto?.desconto * selectedProduto?.preco
            ).toFixed(2)
          }}
        </p>
        <p><strong>Desconto:</strong> {{ selectedProduto?.desconto * 100 }}%</p>
        <p><strong>Descrição:</strong> {{ selectedProduto?.desc }}</p>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            style="background-color: #1d0d46"
            class="float-right"
            @click="adicionarAoCarrinho"
          >
            Adicionar ao Carrinho
          </b-button>
        </div>
      </template>
    </b-modal>
    <!--Modal caso o produto já esteja no carrinho-->
    <b-modal id="modal-error" hide-footer hide-header style="display: grid; place-items: center;">
      <br>
      <div style="display: grid; place-items: center;">
        <b-icon icon="x-circle" class="text-center" scale="4" variant="danger"></b-icon>
      </div>
      <br>
      <hr>
      <h4 class="my-4" style="text-align: center">O produto selecionado já está no carrinho!</h4>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ProdutosPromocoes",
  props: {
    produtos: {
      type: Array,
      required: true,
    },
    filtro: {
      type: Function,
      default: () => () => true, // Filtro padrão que não aplica restrições
    },
  },
  data() {
    return {
      selectedProduto: null,
      favoritos: JSON.parse(localStorage.getItem("favoritos")) || [],
      cesta: JSON.parse(localStorage.getItem("carrinho")) || [],
      tamanhoDaTela: window.innerWidth,
      estaLogado: localStorage.getItem("isLogged") === "true",
    };
  },
  computed: {
    produtosFiltrados() {
      return this.produtos.filter(this.filtro);
    },
    isFavoritedModal() {
      return this.favoritos.includes(this.selectedProduto?.id);
    },
    calcularColunas() {
      if (this.tamanhoDaTela < 600) return 1;
      if (this.tamanhoDaTela <= 700 && this.tamanhoDaTela >= 426) return 2;
      return 3;
    },
  },
  methods: {
    toggleFavoriteModal() {
      const produtoId = this.selectedProduto?.id;
      if (this.favoritos.includes(produtoId)) {
        this.favoritos = this.favoritos.filter((id) => id !== produtoId);
      } else {
        this.favoritos.push(produtoId);
      }
      this.saveFavorites();
    },

    saveFavorites() {
      localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
    },

    openModal(produto) {
      this.selectedProduto = produto;
      this.$bvModal.show("modal");
    },

    adicionarAoCarrinho() {
      const idProduto = this.selectedProduto?.id;
      if (this.cesta.includes(idProduto)) {
        this.$bvModal.hide("modal");
        this.$bvModal.show("modal-error");
      } else {
        this.cesta.push(idProduto);
        this.saveCarrinho();
        location.reload()
      }
    },

    saveCarrinho() {
      localStorage.setItem("carrinho", JSON.stringify(this.cesta));
    },

    updateScreenSize() {
      this.tamanhoDaTela = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
};
</script>
