<template>
  <body>
    <header>
      <div class="interiorHeader">
        <router-link to="/"
          ><img
            src="/images/Logo (Sem Fundo).png"
            alt="logo da startup"
            style="
              width: 100px;
              height: auto;
              filter: drop-shadow(5px 5px 5px black);
            "
        /></router-link>
        <b-input-group size="lg" class="mb-0" style="width: 50vw">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            type="search"
            placeholder="Pesquisar produtos"
          ></b-form-input>
        </b-input-group>
        <div class="login">
          <div v-if="usuarioAtivo == true" class="loginInterno">
            <img
              style="margin: auto auto auto 0.9vw; width: 50px"
              src="/images/do-utilizador.png"
              alt="Login"
            />
            <div class="userName">
              <p style="color: white; font-weight: 600; margin: auto 0.9vw">
                {{ nomeExibicao }}
              </p>
            </div>
          </div>
          <div v-else class="loginInterno LoginInterno2">
            <img
              style="margin: auto auto auto 0.9vw; width: 50px"
              src="/images/do-utilizador.png"
              alt="Login"
            />
            <p style="color: white; font-weight: 600; margin: auto 0.9vw">
              <router-link to="/login" class="loginCadastro">Login</router-link>
              |
              <router-link to="/cadastro" class="loginCadastro"
                >Cadastre-se</router-link
              >
            </p>
          </div>
        </div>
        <img src="/images/carrinho-de-compras.png" alt="" style="width: 50px" />
      </div>
    </header>
    <nav>
      <b-row
        style="
          height: 100%;
          justify-content: center;
          align-items: center;
          width: 100%;
        "
      >
        <b-col style="padding: 0">
          <router-link to="/produtos">Produtos</router-link>
        </b-col>
        <b-col style="padding: 0">
          <router-link to="/">Favoritos</router-link>
        </b-col>
        <b-col style="padding: 0">
          <router-link to="/promocoes">Promoções</router-link>
        </b-col>
      </b-row>
    </nav>
    <main>
      <h1 class="display-1" style="text-align: center">
        SEÇÃO DE DESCONTOS
      </h1>
      <br />
      <section>
        <b-row cols="3">
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
        <b-modal id="modal" size="lg" :title="selectedProduto?.nome">
          <div style="display: flex; justify-content: center">
            <img
              :src="selectedProduto?.img"
              alt="Produto"
              style="height: 50vh"
            />
          </div>
          <div>
            <p>
              <strong>Preço:</strong>
              <s>R${{ selectedProduto?.preco.toFixed(2) }}</s> R${{
                (
                  selectedProduto?.preco -
                  selectedProduto?.desconto * selectedProduto?.preco
                ).toFixed(2)
              }}
            </p>
            <p>
              <strong>Desconto:</strong> {{ selectedProduto?.desconto * 100 }}%
            </p>
            <p><strong>Descrição:</strong> {{ selectedProduto?.desc }}</p>
          </div>
          <template #modal-footer>
            <div class="w-100">
              <p class="float-left">Modal Footer Content</p>
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
      </section>
    </main>
    <footer>
      <!-- Pagamentos -->
      <h4>Formas de Pagamento</h4>
      <div class="imgF">
        <img src="/images/footer/visa.png" alt="Visa" class="if" />
        <img
          src="/images/footer/mastercard_vrt_pos_92px_2x.png"
          alt="Mastercard"
          class="if"
        />
        <img
          src="/images/footer/Banco_Itaú_logo.svg.png"
          alt="Itaú"
          class="if"
        />
        <img src="/images/footer/logo-pix-520x520.png" alt="Pix" class="if" />
      </div>
      <!-- Redes Sociais -->
      <h4>Redes Sociais</h4>
      <div class="imgF">
        <a href=""
          ><img src="/images/footer/face.png" alt="Twitter" class="if"
        /></a>
        <a
          href="https://www.instagram.com/escuderia.nexus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw== "
          ><img
            src="/images/footer/Instagram_icon.webp"
            alt="Instagram"
            class="if"
        /></a>
      </div>
      <!-- Atendimento -->
      <h4>Atendimento</h4>
      <div class="imgF">
        <a href=""
          ><img
            src="/images/footer/whatsapp.png"
            alt="(81) 90000-0000"
            class="if"
        /></a>
        <a href=""
          ><img
            src="/images/footer/gmail.png"
            alt="Nexus69@gmail.com"
            class="if"
        /></a>
      </div>
      <br />
      <p style="font-size: 115%">
        &copy; Todos os Direitos Reservados a Equipe Nexus - Sesi Ibura 2024
      </p>
    </footer>
  </body>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      nomeExibicao: "Mariano Machado",
      usuarioAtivo: false,
      selectedOption: "COLECIONÁVEIS",
      produtos: [], // Carregue os produtos aqui
      selectedProduto: null, // Para armazenar o produto selecionado no modal
    };
  },

  computed: {
    produtosFiltrados() {
      // Filtra os produtos com base na categoria selecionada
      return this.produtos.filter(
        (produto) => produto.desconto > 0 && produto.desconto <= 1
      );
    },
  },

  created() {
    // Carregar JSON de produtos
    fetch("/produtos.json") // Certifique-se de que o arquivo está no diretório `public`
      .then((response) => response.json())
      .then((data) => {
        this.produtos = data.produtos || []; // Atribuir produtos
      })
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  },

  methods: {
    selectOption(option) {
      this.selectedOption = option; // Atualiza a variável com a opção escolhida
    },

    openModal(produto) {
      this.selectedProduto = produto; // Armazena o produto selecionado
      this.$bvModal.show("modal"); // Abre o modal
    },
  },
};
</script>

<style>
header {
  background-color: #190c3c;
  padding: 3.5vh;
}

.interiorHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loginInterno {
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: #23154b;
  text-decoration: none;
  padding: 1vh;
  border-radius: 16px;
  width: 16vw;
}

.userName {
  width: 15vw;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.userName > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.LoginInterno2 {
  width: 18vw;
}

.loginCadastro {
  text-decoration: none;
  color: #fff;
}

.loginCadastro:hover {
  text-decoration: none;
  color: #e6e6e6;
}

button#categoria__BV_toggle_ {
  background-color: transparent;
  padding: 2vh;
  font-weight: 600;
  border: none;
}

.dropdown-menu.show {
  width: 100%;
  background-color: #231350;
  text-align: center;
  padding: 0;
  margin: 0.8vh -1.4vw;
}

a.dropdown-item {
  color: #e6e6e6;
}

a.dropdown-item:hover {
  color: #e6e6e6;
  background-color: #3b2577;
}

section {
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: 90%;
}

.card {
  width: 23vw;
  margin: 2vh auto;
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

footer {
  text-align: center;
  background-color: #1d0d46;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 3vh 0;
}

.imgF {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3cqw;
}

.if {
  height: 60px;
  width: auto;
  margin: 1vw;
  display: flex;
}

header#modal___BV_modal_header_.modal-header {
  background-color: #fff;
}

footer#modal___BV_modal_footer_.modal-footer {
  background-color: #ffffff;
}
</style>
