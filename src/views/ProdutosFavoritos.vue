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
          <router-link to="/produtos">Produtos</router-link>
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
      <h1 class="display-1" style="text-align: center">SEÇÃO DE FAVORITOS</h1>
      <br />
      <section>
        <GradeProdutos v-if="estaLogado"
          :produtos="produtos"
          :filtro="(produto) => favoritos.includes(produto?.id)"
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
      produtos: [], // Carregue os produtos aqui
      favoritos: JSON.parse(localStorage.getItem("favoritos")) || [],
      estaLogado: localStorage.getItem("isLogged") === 'true',
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
};
</script>

<style>
@import "/public/css/header&footer.css";
@import "/public/css/gradeprodutos.css";
@import "/public/css/modaisecarrinho.css";

/* Coração do Modal */
.fav {
  color: #42076b;
  float: right;
}
</style>
