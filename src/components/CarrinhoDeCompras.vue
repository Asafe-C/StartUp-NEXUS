<template>
  <div>
    <!--Ícone Carrinho-->
    <div class="carrinho">
      <b-button
        v-b-toggle.sidebar-right
        style="background-color: transparent; border: none"
        ><b-icon
          icon="cart3"
          aria-hidden="true"
          :scale="tamanhoDaTela ? 1.45 : 2"
        ></b-icon
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
        <div
          class="corpoCarrinho"
          v-for="(produto, index) in produtosFiltrados"
          :key="index"
        >
          <div class="produtoCarrinho">
            <div>
              <img :src="produto.img" style="width: 100%" />
            </div>
            <div>
              <p>
                <strong>{{ produto.nome }}</strong>
              </p>
              <!--Nome do Produto-->
              <p>
                <strong>Preço:</strong> R${{
                  (produto.preco - produto.desconto * produto.preco).toFixed(2)
                }}
              </p>
              <div style="display: grid; grid-template-columns: 6fr 6fr">
                <strong>Quantidade:</strong>
                <div
                  style="
                    display: grid;
                    grid-template-columns: 0.05fr 0.25fr 0.05fr;
                    place-items: center;
                  "
                >
                  <b-icon
                    icon="plus-circle"
                    class="buttonsetta"
                    @click="alterarQuantidade(index, 1)"
                  ></b-icon>
                  {{ produto.quant }}
                  <b-icon
                    icon="dash-circle"
                    class="buttonsetta"
                    @click="alterarQuantidade(index, -1)"
                  ></b-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="d-flex align-items-center px-3 py-1">
            <strong class="mr-auto text-dark"
              ><h6>Total: R${{ totalCarrinho.toFixed(2) }}</h6></strong
            >
            <b-button
              size="sm"
              style="background-color: #1d0d46; border: none"
              text-light
              v-b-toggle.sidebar-right
              @click="finalizarCompra"
              >Finalizar Compra</b-button
            >
            <!--Função para alertar que a compra foi concluida-->
          </div>
        </template>
      </b-sidebar>
    </div>
    <!--Final Bom-->
    <b-modal id="modal-concluido" hide-footer hide-header style="display: grid; place-items: center;">
      <br>
      <div style="display: grid; place-items: center;">
        <b-icon icon="check-circle" class="text-center" scale="4" variant="sucess"></b-icon>
      </div>
      <br>
      <hr>
      <h4 class="my-4" style="text-align: center">Sua compra foi realizada com sucesso!</h4>
    </b-modal>
    <!--Final Ruim-->
    <b-modal id="modal-err" hide-footer hide-header style="display: grid; place-items: center;">
      <br>
      <div style="display: grid; place-items: center;">
        <b-icon icon="x-circle" class="text-center" scale="4" variant="danger"></b-icon>
      </div>
      <br>
      <hr>
      <h4 class="my-4" style="text-align: center">Você precisa estar logado para finalizar compra!</h4>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produtos: [], // Array de produtos
      selectedProduto: null, // Para armazenar o produto selecionado no modal
      carrinho: JSON.parse(localStorage.getItem("carrinho")) || [],
      tamanhoDaTela: window.innerWidth <= 375,
      estaLogado: localStorage.getItem("isLogged") === 'true'
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

    totalCarrinho() {
      return this.produtosFiltrados.reduce((total, produto) => {
        const precoComDesconto =
          (produto.preco - produto.desconto * produto.preco) * produto.quant;
        return total + precoComDesconto;
      }, 0);
    },
  },

  methods: {
    updateScreenSize() {
      this.tamanhoDaTela = window.innerWidth <= 375;
    },

    removerDoCarrinho(produto) {
      this.carrinho = this.carrinho.filter((item) => item.id !== produto.id);
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    },

    alterarQuantidade(index, valor) {
      const produto = this.produtosFiltrados[index];
      produto.quant += valor;

      if (produto.quant < 1) {
        this.removerDoCarrinho(produto); // Remove o produto se a quantidade for menor que 1
      }

      // Atualiza o carrinho no localStorage
      this.carrinho = this.carrinho.filter((id) =>
        this.produtos.some((prod) => prod.id === id && prod.quant > 0)
      );
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    },

    finalizarCompra() {
      if (this.carrinho.length > 0) {
      if (this.estaLogado){
        this.carrinho = [];
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
      this.$bvModal.show("modal-concluido");
      } else {
        this.$bvModal.show("modal-err");
      }
    }
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

<style scoped>
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

.buttonsetta {
  border: none;
  color: rgb(255, 254, 254);
  background-color: #42076b;
  font-weight: 600;
  text-align: center;
  height: 3vh;
  width: 3vh;
  border-radius: 100%;
}
</style>
