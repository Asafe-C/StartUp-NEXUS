<template>
  <body>
    <header>
      <div class="interiorHeader">
        <router-link to="/"><img src="../images/Logo (Sem Fundo).png" alt="logo da startup" style="width: 100px; height: auto; filter: drop-shadow(5px 5px 5px black);"></router-link>
        <b-form-input placeholder="Buscar..." id="barraDePesquisa"></b-form-input>
        <div class="login">
            <div v-if="usuarioAtivo == true" class="loginInterno">
              <img style="margin: auto auto auto 0.9vw; width: 50px;" src="../images/do-utilizador.png" alt="Login"/>
              <div class="userName">
                <p style="color: white; font-weight: 600; margin: auto 0.9vw;">{{nomeExibicao}}</p>
              </div>
            </div>
            <router-link v-else to="/about" class="loginInterno LoginInterno2">
              <img style="margin: auto auto auto 0.9vw; width: 50px;" src="../images/do-utilizador.png" alt="Login"/>
              <p style="color: white; font-weight: 600; margin: auto 0.9vw">Login | Cadastro</p>
            </router-link>
        </div>
        <img src="../images/carrinho-de-compras.png" alt="" style="width: 50px;">
      </div>
    </header>
    <nav>
        <router-link to="/about">About</router-link>
    </nav>
    <main>
      <section class="dest">
        <div class="destaques">
          <h1 style="text-align: center;">Produtos em Destaque</h1>
          <br>
          <b-carousel
            id="destaquesCarrossel"
            style="text-shadow: 0px 0px 2px #000;"
            fade
            :interval="3500"
            indicators
            img-width="1024"
            img-height="480"
          >
            <b-carousel-slide :img-src="dest1">
              <h1>Funko-Pop Deadpool</h1>
            </b-carousel-slide>
            <b-carousel-slide :img-src="dest2">
              <h1>EA Sports FC - 2024</h1>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </section>
    </main>
  </body>
</template>

<style>
  header{
    background-color: #190C3C;
    padding: 3.5vh;
  }

  #barraDePesquisa{
    width: 45vw;
    margin: 0;
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
    width: 11vw;
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
    width: 15vw;
  }

  .dest{
    padding: 10vh 0;
    background-color: #FCFAFA;
  }

  .destaques{
    width: 80vw;
    margin: auto;
    padding: 5vh;
    border-radius: 25px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  }
</style>

<style lang="sass">
  #destaquesCarrossel
    .carousel-indicators li
      background-color: black
    .carousel-indicators li.active
      background-color: black
</style>

<script>
// @ is an alias to /src
import dest1 from '@/images/destaques-p/deadpool.jpg';
import dest2 from '@/images/destaques-p/ea-fc.jpg';
export default {
  name: "HomeView",
  data(){
    return{
      dest1,
      dest2,
      nomeExibicao: 'Kyu Hayato',
      usuarioAtivo: true,
    }
  }
};
</script>