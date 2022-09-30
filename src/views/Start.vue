<template>
<!--  <header class="MainScreen">
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="/img/logo.png">rePoll</div>
  </header>-->

<!--  <ResponsiveNav v-bind:hideNav="hideNav">
    <router-link v-bind:to="'/'">{{uiLabels.joinPoll}}</router-link>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <router-link v-bind:to="'/result/'+id">{{uiLabels.results}}</router-link>
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
  </ResponsiveNav>-->
<!--  <div id="pollWindow">
  <div class= "inputbox">
    {{uiLabels.pollId}} <input type="text" v-model="id"> 
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
  </div>
  </div>
  <br>-->
  <!-- <router-link v-bind:to="'/result/'+id" tag="button">{{uiLabels.results}}</router-link> 
  ##Commented this out cause I think it does not do anything/Allan 06/30/22 -->
  <page>
    <main class="main" id="main">
      <section class="section" id="createPoll">
        <div class="close-section">&times;</div>
        <div class="content-box">
          Create Poll
        </div>
      </section>
      <section class="section" id="joinPoll">
        <div class="close-section">&times;</div>
        <div class="content-box">
          Join Poll
          <div id = "join-input">
            Write Poll ID
            <input type="text" v-model="id">
            <transition name="fade">
              <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
            </transition>

          </div>
        </div>
      </section>
    </main>

  </page>

</template>

<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import '../assets/main.css';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  components: {
    //ResponsiveNav
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
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
  },
  mounted() {
    // UI Part Start
    const Boxlayout = (() => {
      const wrapper = document.body,
          sections = [...document.querySelectorAll(".section")],
          closeButtons = [...document.querySelectorAll(".close-section")],
          expandedClass = "is-expanded",
          hasExpandedClass = "has-expanded-item";
      const initEvents = () => {
        sections.forEach((element) => {
          element.addEventListener("click", () => openSection(element));
        });
        closeButtons.forEach((element) => {
          element.addEventListener("click", (event) => {
            event.stopPropagation();
            closeSection(element.parentElement);
          });
        });
      };
      const openSection = (element) => {
        if (!element.classList.contains(expandedClass)) {
          element.classList.add(expandedClass);
          wrapper.classList.add(hasExpandedClass);
          if (element.getAttribute('id') === "createPoll") {
            setTimeout(() => document.getElementById("main").classList.toggle('fadeOut'), 500);
            setTimeout(() => this.$router.push("/create/" + this.lang), 1000);
          }
          if (element.getAttribute('id') === "joinPoll") {
            document.getElementById("join-input").style = "display: flex";
          }
        }
      };
      const closeSection = (element) => {
        if (element.classList.contains(expandedClass)) {
          if (element.getAttribute('id') === "joinPoll") {
            document.getElementById("join-input").style = "display: none";
          }
          element.classList.remove(expandedClass);
          wrapper.classList.remove(hasExpandedClass);
        }
      };
      return { init: initEvents };
    })();
    Boxlayout.init();
    // UI Part End
  }
}






</script>

<style scoped>
  header {
    background-color: black;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  .MainScreen {
    background-color: black;
    
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .inputbox {
  -ms-transform: translateY(-50%);
  margin: auto;
  }
  #pollWindow {
    background-color: white;
  }

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}

/*New CSS*/

  .section {
    position: absolute;
    z-index: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    transform: scale(1);
    will-change: transform, contents;
    transition-property: all;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .section:nth-child(1) {
    top: 0;
    left: 0;
    background: #72cca7;
  }
  .section:nth-child(2) {
    top: 0;
    left: 50%;
    background: #10a296;
  }
  .section.is-expanded {
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    cursor: initial;
  }
  .has-expanded-item .section:not(.is-expanded) {
    transform: scale(0);
  }

  .close-section {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 2rem;
    text-align: center;
    color: #fff;
    opacity: 0;
    cursor: pointer;
    pointer-events: none;
    transition: opacity 150ms linear;
    will-change: opacity;
  }
  .section.is-expanded .close-section {
    opacity: 1;
    transition-delay: 500ms;
    pointer-events: initial;
  }

  * {
    box-sizing: border-box;
  }

  html {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    font: 16px/1.5 "Roboto Slab", sans-serif;
    background: #000;
  }

  .content-box {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 2rem;
    font-weight: 300;
  }

  #join-input {
    display: none;
  }
/*
  page {
    animation: none;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes fadeOutAnimation {
    0% {opacity: 1;}
    100% {opacity: 0;}
  }
*/

  main {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
  main.fadeOut {
    opacity:0;
  }

</style>
