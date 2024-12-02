<template>
  <div class="modeloCarrossel">
    <button @click="prev" class="button-seta">
      <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
    </button>
    <div class="carousel">
      <div class="inner" ref="inner" :style="innerStyles">
        <div
          v-for="(produto, index) in produtosFiltrados"
          :key="index"
          @click="openModal(produto)"
        >
          <div class="card">
            <img
              :src="produto.img"
              class="card-img-top"
              alt="..."
              style="height: 30vh; object-fit: cover"
            />
            <div class="card-body productName">
              <h5 class="card-title" style="text-align: center">
                {{ produto.nome }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="next" class="button-seta">
      <b-icon icon="chevron-right" aria-hidden="true"></b-icon>
    </button>

    <!--Modal-->
    <b-modal id="modal" size="lg" :title="selectedProduto?.nome" style="display: grid">
          <b-button variant="link" @click="toggleFavoriteModal" class="fav">
            <b-icon :icon="isFavoritedModal ? 'heart-fill' : 'heart'"></b-icon>
          </b-button>
          <div style="display: grid; place-items: center; width: 100%;">
            <img
              :src="selectedProduto?.img"
              alt="Produto"
              class="imgDoModal"
            />
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
          <b-button
            style="background-color: #1d0d46"
            class="float-right"
            @click="show = false"
          >
            Adicionar ao Carrinho
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produtos: [], // Array de produtos
      innerStyles: {
        transform: "translateX(0px)",
        transition: "transform 0.5s ease",
      },
      step: 0,
      transitioning: false,
      selectedProduto: null, // Para armazenar o produto selecionado no modal
      favoritos: JSON.parse(localStorage.getItem("favoritos")) || [],
      estaLogado: localStorage.getItem("isLogged"),
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
  mounted() {
    this.calculateStep();
    window.addEventListener("resize", this.calculateStep);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateStep);
  },
  computed: {
    produtosFiltrados() {
      return this.produtos.filter((produto) =>
        this.favoritos.includes(produto?.id)
      );
    },
    isFavoritedModal() {
      return this.favoritos.includes(this.selectedProduto?.id); // Verifica se o produto está nos favoritos
    },
  },
  methods: {
    calculateStep() {
      const innerWidth = this.$refs.inner.offsetWidth || 0;
      this.step = innerWidth / 3; // Exibir 3 produtos por vez
    },
    next() {
      if (this.transitioning || this.produtosFiltrados.length < 3) return;
      this.transitioning = true;

      // Adiciona o primeiro item ao final da lista
      const firstCard = this.produtosFiltrados[0];
      this.produtosFiltrados.push(firstCard);
      this.produtosFiltrados.shift(); // Remove o primeiro item

      // Ajusta o estilo para simular o movimento inverso
      this.innerStyles.transition = "none";
      this.innerStyles.transform = `translateX(${this.step}px)`;

      this.$nextTick(() => {
        this.innerStyles.transition = "transform 0.5s ease";
        this.innerStyles.transform = `translateX(0px)`;
        this.transitioning = false;
      });
    },
    prev() {
      if (this.transitioning || this.produtosFiltrados.length < 3) return;
      this.transitioning = true;

      const lastCard =
        this.produtosFiltrados[this.produtosFiltrados.length - 1];
      this.produtosFiltrados.unshift(lastCard); // Adiciona o último item ao início
      this.produtosFiltrados.pop(); // Remove o último item

      this.innerStyles.transition = "none";
      this.innerStyles.transform = `translateX(-${this.step}px)`;

      this.$nextTick(() => {
        this.innerStyles.transition = "transform 0.5s ease";
        this.innerStyles.transform = `translateX(0px)`;
        this.transitioning = false;
      });
    },
    afterTransition(callback) {
      const listener = () => {
        callback();
        this.transitioning = false;
        this.$refs.inner.removeEventListener("transitionend", listener);
      };
      this.$refs.inner.addEventListener("transitionend", listener);
    },
    toggleFavoriteModal() {
      const produtoId = this.selectedProduto?.id;
      if (this.favoritos.includes(produtoId)) {
        this.favoritos = this.favoritos.filter((id) => id !== produtoId); // Remove do favorito
      } else {
        this.favoritos.push(produtoId); // Adiciona aos favoritos
      }
      this.saveFavorites(); // Salva no localStorage
    },

    saveFavorites() {
      localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
    },

    openModal(produto) {
      this.selectedProduto = produto; // Armazena o produto selecionado
      this.$bvModal.show("modal"); // Abre o modal
    },
  },
};
</script>

<style scoped>
.modeloCarrossel {
  display: grid;
  grid-template-columns: 0.25fr 3fr 0.25fr;
  gap: 0.25vw;
  place-items: center;
  background-color: transparent;
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
  margin-right: 0.25vw;
  margin-left: 0.25vw;
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

@media (max-width: 555px) {
  .carousel,
  .inner {
    width: 100%;
    height: auto;
    display: flex;
    place-items: center;
  }

  .card{
    width: 57.5vw;
  }
  
  .card-title{
    font-size: 15px;
  }
}

@media (max-width: 375px) {
  .card{
    width: 53.5vw;
  }
}

@media (max-width: 320px) {
  .card{
    width: 47vw;
  }
}
</style>
