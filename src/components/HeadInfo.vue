<template>
  <div class="head-info">Current Account: {{ account }}</div>
</template>
<script>
export default {
  name: "HeadInfo",
  props: ["account"],
};
</script>
<style lang="scss" scoped>
.head-info {
  margin: 0 auto;
  max-width: 1280px;
  height: 80px;
  line-height: 80px;
  background-color: #2f2f2f;
  color: #fff;
  padding-left: 30px;
}
</style>
