<template>
  <body>
    <header>
      <div class="interiorHeader">
        <router-link to="/"><img src="/images/Logo (Sem Fundo).png" alt="logo da startup" style="width: 100px; height: auto; filter: drop-shadow(5px 5px 5px black);"></router-link>
        <b-input-group size="lg" class="mb-0" style="width: 50vw;">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="search" placeholder="Pesquisar produtos"></b-form-input>
        </b-input-group>
        <div class="login">
            <div v-if="usuarioAtivo == true" class="loginInterno">
              <img style="margin: auto auto auto 0.9vw; width: 50px;" src="/images/do-utilizador.png" alt="Login"/>
              <div class="userName">
                <p style="color: white; font-weight: 600; margin: auto 0.9vw;">{{nomeExibicao}}</p>
              </div>
            </div>
            <div v-else class="loginInterno LoginInterno2">
              <img style="margin: auto auto auto 0.9vw; width: 50px;" src="/images/do-utilizador.png" alt="Login"/>
              <p style="color: white; font-weight: 600; margin: auto 0.9vw;">
                <router-link to="/login" class="loginCadastro">Login</router-link> | <router-link to="/cadastro" class="loginCadastro">Cadastre-se</router-link>
              </p>
            </div>
        </div>
        <img src="/images/carrinho-de-compras.png" alt="" style="width: 50px;">
      </div>
    </header>
    <nav>
      <b-row style="height: 100%; justify-content: center; align-items: center;">
          <b-col style="padding: 0">
            <b-dropdown id="categoria" text="Categorias" class="w-100" no-caret>
              <b-dropdown-item @click="selectOption('Teste')">Colecionáveis</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Cosplays</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Decoração</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Jogos</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Literatura</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Miniaturas</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Roupas</b-dropdown-item>
              <b-dropdown-item @click="selectOption('')">Tabuleiro</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col style="padding: 0">
            <router-link to="/">Favoritos</router-link>
          </b-col>
          <b-col style="padding: 0">
            <router-link to="/">Promoções</router-link>
          </b-col>
        </b-row>
    </nav>
    <main>
      <section class="dest">
        <div class="expansao">
          <div class="destaques">
            <h1 style="text-align: center;">Produtos em Destaque</h1>
            <br>
            <b-carousel
              id="destaquesCarrossel"
              :interval="3500"
              indicators
              img-width="1024"
              img-height="480"
            >
              <b-carousel-slide img-src="/images/destaques-p/deadpool.png"></b-carousel-slide>
              <b-carousel-slide img-src="/images/destaques-p/ea-fc.png"></b-carousel-slide>
              <b-carousel-slide img-src="/images/destaques-p/harry-book.png"></b-carousel-slide>
              <b-carousel-slide img-src="/images/destaques-p/manto.png"></b-carousel-slide>
              <b-carousel-slide img-src="/images/destaques-p/mario.png"></b-carousel-slide>
              <b-carousel-slide img-src="/images/destaques-p/rpg.png"></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </section>
      <section>
        <h1 style="text-align: center;">Recomendados</h1>
        <br>
        <CarrosselDivs></CarrosselDivs>
      </section>
      <section>
        <h1 style="text-align: center;">Produtos com Desconto</h1>
        <br>
        <CarrosselDivs></CarrosselDivs>
      </section>
    </main>
    <footer>
      <!-- Pagamentos -->
      <h4>Formas de Pagamento</h4>
      <div class="imgF">
        <img src="/images/footer/visa.png" alt="Visa" class="if" />
        <img src="/images/footer/mastercard_vrt_pos_92px_2x.png" alt="Mastercard" class="if" />
        <img src="/images/footer/Banco_Itaú_logo.svg.png" alt="Itaú" class="if" />
        <img src="/images/footer/logo-pix-520x520.png" alt="Pix" class="if" />
      </div>
      <!-- Redes Sociais -->
      <h4>Redes Sociais</h4>
      <div class="imgF">
        <a href=""><img src="/images/footer/face.png" alt="Twitter" class="if" /></a>
        <a href="https://www.instagram.com/escuderia.nexus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw== "><img
            src="/images/footer/Instagram_icon.webp" alt="Instagram" class="if" /></a>
      </div>
      <!-- Atendimento -->
      <h4>Atendimento</h4>
      <div class="imgF">
        <a href=""><img src="/images/footer/whatsapp.png" alt="(81) 90000-0000" class="if" /></a>
        <a href=""><img src="/images/footer/gmail.png" alt="Nexus69@gmail.com" class="if" /></a>
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
import CarrosselDivs from '@/components/CarrosselDivs.vue';
export default {
  name: "HomeView",
  components:{
    CarrosselDivs,
  },
  data(){
    return{
      nomeExibicao: 'Mariano Machado',
      usuarioAtivo: false,
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option; // Atualiza a variável com a opção escolhida
      this.$router.push({ name: 'produtos'}); // Redireciona para a mesma página
    }
  }
};
</script>

<style>
  header{
    background-color: #190C3C;
    padding: 3.5vh;
  }

  .interiorHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .loginInterno{
    display: grid;
    grid-template-columns: 1fr 3fr;
    background-color: #23154b;
    text-decoration: none;
    padding: 1vh;
    border-radius: 16px;
    width: 16vw;
  }

  .userName{
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

  .LoginInterno2{
    width: 18vw;
  }

  .loginCadastro{
    text-decoration: none;
    color: #fff
  }

  .loginCadastro:hover{
    text-decoration: none;
    color: #e6e6e6
  }

  button#categoria__BV_toggle_{
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

  .dest{
    padding: 10vh 0 0;
    border-radius: 0px;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0) 0 0 0;
  }

  .destaques{
    width: 80vw;
    padding: 5vh;
    margin: auto;
  }
  
  section, .expansao{
    width: 90vw;
    padding: 5vh;
    margin: auto;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    border-radius: 25px;
    margin-bottom: 10vh;
  }

  footer{
    text-align: center;
    background-color: #1D0D46;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 3vh 0;
  }

  .imgF{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3cqw;
  }

  .if{
    height: 60px;
    width: auto;
    margin: 1vw;
    display: flex;
  }
</style>