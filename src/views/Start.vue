<template>
<page>

  <header id="header">
    <div class="logo"
         v-on:click="this.$router.push('/')">
      <img src="/img/logo.png">
      rePoll
    </div>

    <div v-on:click="switchLanguage"
         class="switch-language">
      🌍 {{uiLabels.changeLanguage}}
    </div>
  </header>

  <main class="main" id="main">
    <section class="section" id="createPoll">
      <div class="close-section">&times;</div>
      <div class="content-box">
        {{uiLabels.createPoll}}
      </div>
    </section>
    <section class="section" id="joinPoll">
      <div class="close-section">&times;</div>
      <div class="content-box">
        <div id = "join-text">Have a Poll ID?</div>
        <div id = "join-input">
          <input type="text"
                 class = "input-box"
                 v-model="id"
                 placeholder="Poll ID">
          <div class = "clickable-text"
               v-on:click="this.$router.push('/poll/'+id)">
            {{uiLabels.participatePoll}} ⇾
          </div>
          <div class = "clickable-text"
               v-on:click="this.$router.push('/result/'+ id)">
            {{uiLabels.results}} ⇾
          </div>
        </div>
      </div>
    </section>
  </main>

</page>
</template>

<script>
import '../assets/main.css';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
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
          document.getElementById("header").style = "display: none";
          if (element.getAttribute('id') === "createPoll") {
            setTimeout(() => document.getElementById("main").classList.toggle('fadeOut'), 500);
            setTimeout(() => this.$router.push("/create/" + this.lang), 1000);
          }
          if (element.getAttribute('id') === "joinPoll") {
            document.getElementById("join-text").style = "display: none";
            document.getElementById("join-input").style = "display: block";
          }
        }
      };
      const closeSection = (element) => {
        if (element.classList.contains(expandedClass)) {
          document.getElementById("header").style = "display: block";
          if (element.getAttribute('id') === "joinPoll") {
            document.getElementById("join-input").style = "display: none";
            document.getElementById("join-text").style = "display: block";
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

/* Header */
header {
  background-color: rgba(114, 204, 167, 0);
}

/* Page sections */
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
.section:nth-child(1):not(.is-expanded):hover {
  width: 51%;
}
.section:nth-child(1):not(.is-expanded):hover ~ .section:nth-child(2) {
  left: 51%;
  width: 49%;
}
.section:nth-child(2) {
  top: 0;
  left: 50%;
  background: #10a296;
}
.section:nth-child(2):not(.is-expanded):hover {
  left: 49%;
  width: 51%;
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
.content-box {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 300;
}

/* Transitions */
#join-input {
  display: none;
}
/* Page leave transition */
main {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
main.fadeOut {
  opacity:0;
}

</style>
