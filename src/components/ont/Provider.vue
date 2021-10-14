<template>
  <div class="g-card">
    <el-card>
      <el-button type="primary" @click="handlerGetProvider"
        >getProvider</el-button
      >
      <div class="result">Result: {{ resultData.providers }}</div>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";
export default {
  name: "ONTProvider",
  props: {
    resultData: {
      require: true,
      default() {
        return {
          providers: "",
        };
      },
    },
  },
  methods: {
    async handlerGetProvider() {
      try {
        const provider = await client.api.provider.getProvider();
        this.resultData.providers = JSON.stringify(provider);
        // setProviders(JSON.stringify(provider));
        alert("Get SUCCESS");
      } catch (e) {
        alert("No provider installed.");
        throw e;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.g-card {
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
