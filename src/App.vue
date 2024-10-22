<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
    <h5>Pressed and un-pressed state</h5>
    <b-button :pressed="true" variant="success">Always Pressed</b-button>
    <b-button :pressed="false" variant="success">Not Pressed</b-button>

    <h5 class="mt-3">Toggleable Button</h5>
    <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
    <p>Pressed State: <strong>{{ myToggle }}</strong></p>

    <h5>In a button group</h5>
    <b-button-group size="sm">
      <b-button
        v-for="(btn, idx) in buttons"
        :key="idx"
        :pressed.sync="btn.state"
        variant="primary"
      >
        {{ btn.caption }}
      </b-button>
    </b-button-group>
    <p>Pressed States: <strong>{{ btnStates }}</strong></p>
  </div>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      buttons: [
          { caption: 'Toggle 1', state: true },
          { caption: 'Toggle 2', state: false },
          { caption: 'Toggle 3', state: true },
          { caption: 'Toggle 4', state: false }
        ]
    }
  },
  computed:{
    btnStates() {
        return this.buttons.map(btn => btn.state)
      }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
