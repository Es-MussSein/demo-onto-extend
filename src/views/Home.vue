<template>
  <div class="home">
    <el-card class="box-card">
      <el-button
        class="button"
        type="primary"
        @click="$router.push({ name: 'ont' })"
        >ONT</el-button
      >
      <el-button
        class="button"
        type="primary"
        @click="$router.push({ name: 'eth' })"
        >ETH</el-button
      >
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.home {
  min-height: 100vh;
  margin: 0 auto;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: 100%;
  border-radius: 5px;
  width: 180px;
  margin: 10px 0;
}
</style>
