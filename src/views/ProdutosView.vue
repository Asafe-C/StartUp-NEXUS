<template>
  <body>
    <header>
      <div class="interiorHeader">
        <!--Logo-->
        <router-link to="/" class="logo"
          ><img
            src="/images/Logo (Sem Fundo).png"
            alt="logo da startup"
            style="
              width: 100px;
              height: auto;
              filter: drop-shadow(5px 5px 5px black);
            "
        /></router-link>
        <BarraDePesquisa></BarraDePesquisa>
        <div class="loginCarrinho">
          <CaixaUser></CaixaUser>
          <CarrinhoDeCompras></CarrinhoDeCompras>
        </div>
      </div>
    </header>
    <nav>
      <b-row
        style="
          height: 100%;
          justify-content: center;
          align-items: center;
          margin: auto;
          width: 100%;
        "
      >
        <b-col style="padding: 0">
          <b-dropdown id="categoria" text="Categorias" class="w-100" no-caret>
            <b-dropdown-item @click="selectOption('COLECIONÁVEIS')"
              >Colecionáveis</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('COSPLAYS')"
              >Cosplays</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('DECORAÇÕES')"
              >Decorações</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('JOGOS')"
              >Jogos</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('LITERATURA')"
              >Literatura</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('MINIATURAS')"
              >Miniaturas</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('ROUPAS')"
              >Roupas</b-dropdown-item
            >
            <b-dropdown-item @click="selectOption('TABULEIROS')"
              >Tabuleiros</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
        <b-col style="padding: 0">
          <router-link to="/favoritos">Favoritos</router-link>
        </b-col>
        <b-col style="padding: 0">
          <router-link to="/promocoes">Promoções</router-link>
        </b-col>
      </b-row>
    </nav>
    <main>
      <h1 class="display-1" style="text-align: center">
        SEÇÃO DE {{ this.selectedOption }}
      </h1>
      <br />
      <section>
        <GradeProdutos
          :produtos="produtos"
          :filtro="(produto) => produto.catg === selectedOption"
        ></GradeProdutos>
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
// @ is an alias to /src
import CarrinhoDeCompras from "@/components/CarrinhoDeCompras.vue";
import CaixaUser from "@/components/CaixaUser.vue";
import BarraDePesquisa from "@/components/BarraDePesquisa.vue";
import GradeProdutos from "@/components/GradeProdutos.vue";

export default {
  name: "HomeView",
  components: {
    CarrinhoDeCompras,
    CaixaUser,
    BarraDePesquisa,
    GradeProdutos,
  },

  data() {
    return {
      usuarioActivo: localStorage.getItem("isLogged") === "true",
      selectedOption: "COLECIONÁVEIS",
      produtos: [], // Carregue os produtos aqui
      favoritos: JSON.parse(localStorage.getItem("favoritos")) || [],
    };
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
  },
};
</script>

<style>
@import "/public/css/header&footer.css";
@import "/public/css/gradeprodutos.css";
@import "/public/css/modaisecarrinho.css";

button#categoria__BV_toggle_ {
  background-color: transparent;
  padding: 2vh;
  font-weight: 500;
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

/* Coração do Modal */
.fav {
  color: #42076b;
  float: right;
}

@media (max-width: 768px) {
  button#categoria__BV_toggle_ {
    font-size: 15px;
  }
  .dropdown-menu.show {
  margin: 0.5vh -1.4vw;
  }
}

@media (max-width: 425px) {
  .dropdown-menu.show {
  width: 50%;
  margin: 0.5vh -2.3vw;
}
}

@media (max-width: 375px) {
  .dropdown-menu.show {
  width: 5vw;
  font-size: 75%;
  margin: 0.5vh -6vw;
}
}

@media (max-width: 320px) {
  .dropdown-menu.show {
  font-size: 70%;
  margin: 0.5vh -10vw;
}
}
</style>
