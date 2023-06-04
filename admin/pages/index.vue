<script lang="ts" setup>
const { readFreelanceInfo } = useFreelanceInfo();
const {response,pending,error} = await readFreelanceInfo();
</script>
<template>
  <div>
    <div v-if="response">{{ response }}</div>
  </div>
</template>