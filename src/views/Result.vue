<template>
<section id = "screen">
<section id = "question">
  <header>
    <a href="/"><h3>This is the repoll</h3> </a>

  </header>
</section>
</section>

  <div>
    {{question}}
  </div>
  <Bars v-bind:data="data"/>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      question: "",
      data: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
}
</script>

<style scoped>
.screen {
  background-color: green;;
}

</style>