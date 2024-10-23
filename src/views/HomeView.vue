<template>
  <div>
    <b-carousel
      id="destaques"
      v-model="slide"
      :interval="4000"
      background="#ababab"
      img-width="512px"
      img-height="480px"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Funk-Pop Deadpool"
        :img-src="image1"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import image1 from '@/images/destaques-p/deadpool.jpg';
export default {
  name: "HomeView",
  data() {
      return {
        slide: 0,
        sliding: null,
        image1
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
};
</script>