<template>
  <div>
    <!--Ícone Carrinho-->
    <div class="carrinho">
      <b-button
        v-b-toggle.sidebar-right
        style="background-color: transparent; border: none"
        ><b-icon icon="cart3" aria-hidden="true" scale="2"></b-icon
      ></b-button>
      <!--Carrinho-->
      <b-sidebar id="sidebar-right" right shadow backdrop>
        <template #header>
          <div class="headerCarrinho">
            <h2>Carrinho</h2>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <b-icon
                icon="x"
                color="#333333"
                v-b-toggle.sidebar-right
                scale="1"
              ></b-icon>
            </div>
          </div>
        </template>
        <div class="corpoCarrinho" v-for="(produto, index) in produtosFiltrados"
          :key="index"
        >
          <div class="produtoCarrinho">
            <div>
              <img :src="produto.img" style="width: 100%" />
            </div>
            <div>
              <!--v-if-->
              <p><strong>{{ produto.nome }}</strong></p>
              <!--Nome do Produto-->
              <p><strong>Preço:</strong> {{ produto.preco.toFixed(2) }}</p>
              <p><strong>Quantidade:</strong> X</p>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="d-flex align-items-center px-3 py-1">
            <strong class="mr-auto text-dark"><h6>Total: R$XX</h6></strong>
            <b-button
              size="sm"
              style="background-color: #1d0d46; border: none"
              text-light
              v-b-toggle.sidebar-right
              >Finalizar Compra</b-button
            >
            <!--Função para alertar que a compra foi concluida-->
          </div>
        </template>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produtos: [], // Array de produtos
      selectedProduto: null, // Para armazenar o produto selecionado no modal
      carrinho: JSON.parse(localStorage.getItem("carrinho")) || [],
    };
  },
  created() {
    // Carrega os produtos
    fetch("/produtos.json")
      .then((response) => response.json())
      .then((data) => {
        this.produtos = data.produtos || [];
      })
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  },
  computed: {
    produtosFiltrados() {
      return this.produtos.filter((produto) =>
        this.carrinho.includes(produto?.id)
      );
    },
  },
  methods: {},
};
</script>

<style scoped>
.modeloCarrossel {
  display: grid;
  grid-template-columns: 0.25fr 3fr 0.25fr;
  gap: 0.25fr;
  background-color: transparent;
  place-items: center;
}

.carousel {
  width: 72vw;
  overflow: hidden;
}

.inner {
  display: flex;
  white-space: nowrap;
  transition: transform 0.01s ease;
}

.carousel,
.inner {
  height: 50vh;
  display: flex;
  place-items: center;
}

.card {
  width: 23.5vw;
  margin-right: 0.5vw;
  display: inline-flex;
}

.button-seta {
  border: none;
  color: rgb(255, 254, 254);
  background-color: rgba(175, 175, 175, 0.575);
  font-size: 20px;
  text-align: center;
  height: 7.5vh;
  width: 7.5vh;
  border-radius: 100%;
}

.productName {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.productName > h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

header#modal___BV_modal_header_.modal-header {
  background-color: #fff;
}

.fav {
  color: #42076b;
  float: right;
}

footer#modal___BV_modal_footer_.modal-footer {
  background-color: #ffffff;
}
</style>
