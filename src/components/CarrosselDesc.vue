<template>
    <div class="modeloCarrossel">
      <button @click="prev">
        <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
      </button>
      <div class="carousel">
        <div class="inner" ref="inner" :style="innerStyles">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card">
              <img src="/images/Logo.png" class="card-img-top" alt="..." style="height: 30vh; object-fit: cover;" />
              <div class="card-body">
                <h5 class="card-title" style="text-align: center;">{{ card }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="next">
        <b-icon icon="chevron-right" aria-hidden="true"></b-icon>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [4, 5, 6], //colocar array do webstorage
        innerStyles: {
          transform: "translateX(0px)",
          transition: "transform 0.01s ease",
        },
        step: 0,
        transitioning: false,
      };
    },
  
    mounted() {
      this.setStep();
    },
  
    methods: {
      setStep() {
        const cardWidth = this.$refs.inner.clientWidth / 3; // Dividir para exibir 3 cartões
        this.step = cardWidth; // Armazena o valor exato da largura de um cartão
      },
  
      next() {
        if (this.transitioning) return;
        this.transitioning = true;
  
        this.innerStyles.transform = `translateX(-${this.step}px)`;
        
        this.afterTransition(() => {
          const card = this.cards.shift(); // Remove o primeiro item
          this.cards.push(card); // Adiciona ao final
          this.resetTranslate();
          this.transitioning = false;
        });
      },
  
      prev() {
        if (this.transitioning) return;
        this.transitioning = true;
  
        this.innerStyles.transform = `translateX(${this.step}px)`;
  
        this.afterTransition(() => {
          const card = this.cards.pop(); // Remove o último item
          this.cards.unshift(card); // Adiciona ao início
          this.resetTranslate();
          this.transitioning = false;
        });
      },
  
      afterTransition(callback) {
        const listener = () => {
          callback();
          this.$refs.inner.removeEventListener("transitionend", listener);
        };
        this.$refs.inner.addEventListener("transitionend", listener);
      },
  
      resetTranslate() {
        // Remove a transição e reseta para a posição centralizada
        this.innerStyles.transition = "none";
        this.innerStyles.transform = "translateX(0px)";
  
        // Reativa a transição para o próximo movimento
        this.$nextTick(() => {
          this.innerStyles.transition = "transform 0.01s ease";
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .modeloCarrossel {
    display: grid;
    grid-template-columns: 0.25fr 3fr 0.25fr;
    gap: 0.25fr;
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
  
  button {
    border: none;
    color: rgb(255, 254, 254);
    background-color: rgba(175, 175, 175, 0.575);
    font-size: 20px;
    text-align: center;
    height: 7.5vh;
    width: 7.5vh;
    border-radius: 100%;
  }
  </style>