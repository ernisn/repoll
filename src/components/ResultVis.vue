<template>
<!--
  ALL DATA: {{ resultData }}
  Answers/Label: {{ resultData.item.itemAnswers }}
  <br> ---------- <br>
  Votes/Data: {{ resultData.votersResponds[resultData.itemId] }}
 -->

  <figure>
    <figcaption>Result of poll</figcaption>
    <svg class="chart" width="420" height="320" aria-labelledby="title desc" role="img">
      <title id="title">Result of poll</title>
      <desc id="desc">Answers: {{ resultData.item.itemAnswers }}; Votes: {{ resultData.votersResponds[resultData.itemId] }}</desc>

      <g class="barSvgBlock"
         v-for="(vote, answerId) in resultData.votersResponds[resultData.itemId]"
         v-bind:key="answerId">
        <text class="answerTitle"
              x="0"
              :y="answerId * 50"
              dy="1em">
          Answer {{ answerId }}
        </text>
        <text class="answerTip"
              x="90"
              :y="answerId * 50"
              dy="1.3em">
          {{ resultData.item.itemAnswers[answerId] }}
        </text>
        <rect :width="resultData.votersResponds[resultData.itemId][answerId] * 15"
              height="20"
              x="90"
              :y="answerId * 50 + 25">
        </rect>
        <text :x="resultData.votersResponds[resultData.itemId][answerId] * 15 + 100"
              :y="answerId * 50 + 25"
              dy="1em">
          {{ resultData.votersResponds[resultData.itemId][answerId] }} vote(s)
        </text>
      </g>
    </svg>
  </figure>

</template>

<script>

export default {
  name: 'ResultVis',
  props: {
    resultData: Object,
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.barSvgBlock {
  fill: #aaa;
  height: 20px;
  transition: fill .3s ease;
  cursor: pointer;
}
.barSvgBlock text {
  color: black;
}
.barSvgBlock:hover,
.barSvgBlock:focus {
  fill: teal;
}
.barSvgBlock:hover text,
.barSvgBlock:focus text {
  fill: darkslategrey;
}

.answerTitle {
  font-weight: bold;
  font-size: 1.1em;
}

.barSvgBlock .answerTip {
  font-size: 0.8em;
}




</style>