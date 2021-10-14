<template>
  <div class="g-card">
    <el-card>
      <el-button type="primary" @click="handlerGetNetwork"
        >getNetwork</el-button
      >
      <div class="result">Result: {{ resultData.network }}</div>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";
export default {
  name: "ONTNetwork",
  props: {
    resultData: {
      require: true,
      default() {
        return {
          network: "",
        };
      },
    },
  },
  methods: {
    async handlerGetNetwork() {
      try {
        const network = await client.api.network.getNetwork();
        this.resultData.network = JSON.stringify(network);
        // setNetwork(JSON.stringify(network));
        alert("Get SUCCESS");
      } catch (e) {
        alert("Get FAIL");
        throw e;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.g-content {
  margin: 0 auto;
  max-width: 1280px;
}
.el-button {
  width: 180px;
}
.result {
  padding-top: 15px;
}
</style>
