<template>
  <header class="MainScreen">
    <div v-bind:class="['hamburger', {'close': !hideNav}]" v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="/img/logo.png">rePoll</div>
  </header>

  <ResponsiveNav v-bind:hideNav="hideNav">
    <router-link class = "JoinPollBox" v-bind:to="'/'">{{uiLabels.joinPoll}}</router-link>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <router-link v-bind:to="'/result/'+id">{{uiLabels.results}}</router-link>
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
  </ResponsiveNav>
  <div id="pollWindow">
    <div class="inputbox">
      {{uiLabels.pollId}} <input type="text" v-model="id">
      <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
    </div>
  </div>
  <br>
  <!-- <router-link v-bind:to="'/result/'+id" tag="button">{{uiLabels.results}}</router-link> 
  ##Commented this out cause I think it does not do anything/Allan 06/30/22 -->
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
import '../Assets/Main.css';
const socket = io();

export default {
  name: 'Start',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = !this.hideNav;
    }
  }
}
</script>

<style>
/*
    see file '../assets/css/main.css';
  */
</style>