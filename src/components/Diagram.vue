<template>
    <div class="diagramPage">
        <div class="pieDiagram" v-for="(item, key) in data" v-bind:key="key">
            <div class="pie" v-bind:style="{height: item + '10px', width: item + '10px'}">
                <span> {{ item }} </span>
            </div>

            <p> {{key}} </p>

        </div>

    </div>

</template>

<script>

export default {
    name: "Diagram",
    props: {
        data: Object,
    }
}

</script>

<style scoped>
.diagramPage {
    display: inline-block;
    word-wrap: break-word;
}
.pieDiagram {
    display: inline-block;
    height: 1em;
    text-align: center;
    width: 1em;
    margin: 1.5em;
    vertical-align: middle;
    vertical-align: top;
}
.pie {
    border-radius: 10px;
    padding: 2em;
    margin: 2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:green;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}
</style>