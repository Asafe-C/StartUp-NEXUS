<template>
    <div class="modeloCarrossel">
        <button @click="prev">
            <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
        </button>
        <div class="carousel">
            <div class="inner" ref="inner" :style="innerStyles">
                <div class="card" v-for="(card, index) in cards" :key="index">
                    <div class="card">
                        <img src="/images/Logo.png" class="card-img-top" alt="..." style="height: 30vh; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title" style="text-align: center;">{{card}}</h5>
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
        cards: [1, 2, 3, 4, 5, 6, 7, 8],
        innerStyles: {},
        step: '',
        transitioning: false,
        visibleCards: 3,
    };
    },

    mounted() {
    this.setStep();
    this.resetTranslate();
    },

    methods: {
    setStep() {
        const innerWidth = this.$refs.inner.scrollWidth;
        const totalCards = this.cards.length;
        this.step = `${innerWidth / totalCards * this.visibleCards}px`;
    },

    next() {
        if (this.transitioning) return;

        this.transitioning = true;
        this.moveLeft();

        this.afterTransition(() => {
        const card = this.cards.shift();
        this.cards.push(card);
        this.resetTranslate();
        this.transitioning = false;
        });
    },

    prev() {
        if (this.transitioning) return;

        this.transitioning = true;
        this.moveRight();

        this.afterTransition(() => {
        const card = this.cards.pop();
        this.cards.unshift(card);
        this.resetTranslate();
        this.transitioning = false;
        });
    },

    moveLeft() {
        this.innerStyles = {
        transform: `translateX(-${this.step}) translateX(-${this.step})`,
        };
    },

    moveRight() {
        this.innerStyles = {
        transform: `translateX(${this.step}) translateX(-${this.step})`,
        };
    },

    afterTransition(callback) {
        const listener = () => {
        callback();
        this.$refs.inner.removeEventListener("transitionend", listener);
        };
        this.$refs.inner.addEventListener("transitionend", listener);
    },

    resetTranslate() {
        this.innerStyles = {
        transition: "none",
        transform: `translateX(-${this.step})`,
        };
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
        transition: transform 0.2s;
        white-space: nowrap;
    }

    .carousel, .inner{
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
  