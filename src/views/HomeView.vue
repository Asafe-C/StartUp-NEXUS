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
        <!--Barra de Pesquisa-->
        <div class="barraPesquisa">
          <b-input-group size="lg" class="mb-0">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="search"
              placeholder="Pesquisar produtos"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="loginCarrinho">
          <!--Login-->
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
                <router-link to="/login" class="loginCadastro"
                  >Login</router-link
                >
                |
                <router-link to="/cadastro" class="loginCadastro"
                  >Cadastre-se</router-link
                >
              </p>
            </div>
          </div>
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
      <section class="dest">
        <div class="expansao">
          <div class="destaques">
            <h1 style="text-align: center">Produtos em Destaque</h1>
            <br />
            <b-carousel
              id="destaquesCarrossel"
              :interval="3500"
              indicators
              img-width="1024"
              img-height="480"
            >
              <b-carousel-slide
                img-src="/images/destaques-p/deadpool.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="/images/destaques-p/ea-fc.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="/images/destaques-p/harry-book.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="/images/destaques-p/manto.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="/images/destaques-p/mario.png"
              ></b-carousel-slide>
              <b-carousel-slide
                img-src="/images/destaques-p/rpg.png"
              ></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </section>
      <section class="expansao">
        <h1 style="text-align: center">Seus Favoritos</h1>
        <br />
        <p v-if="favorictos.length === 0" style="text-align: center">
          Você não tem favoritos no momento.
        </p>
        <CarrosselRec v-else></CarrosselRec>
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

<style lang="sass">
#destaquesCarrossel
  .carousel-indicators li
    background-color: black
  .carousel-indicators li.active
    background-color: black
</style>

<script>
// @ is an alias to /src
import CarrosselRec from "@/components/CarrosselRec.vue";
import CarrinhoDeCompras from "@/components/CarrinhoDeCompras.vue";

export default {
  name: "HomeView",
  components: {
    CarrosselRec,
    CarrinhoDeCompras,
  },
  data() {
    return {
      nomeExibicao:
        localStorage.getItem("pNomeUsuario") +
        " " +
        localStorage.getItem("sobrenomeUsuario"),
      usuarioActivo: localStorage.getItem("isLogged") === "true",
      favorictos: JSON.parse(localStorage.getItem("favoritos")) || [],
    };
  },
};
</script>

<style scoped>
@import "/public/css/header&footer.css";
@import "/public/css/modaisecarrinho.css";

.dest {
  padding: 10vh 0 0;
  border-radius: 0px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0;
}

.destaques {
  width: 80vw;
  padding: 5vh;
  margin: auto;
}

section,
.expansao {
  width: 90vw;
  padding: 5vh;
  margin: auto;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 25px;
  margin-bottom: 10vh;
}
</style>
