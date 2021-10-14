<template>
  <div>
    <el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetBlockNumber"
          >getBlockNumber</el-button
        >
        <div class="result">Result: {{ resultData.blockNumber }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetBlock">getBlock</el-button>
        <div class="result">Result: {{ resultData.blockResult }}</div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import Web3 from "web3";

export default {
  name: "BlockNUmber",
  methods: {
    async handlerGetBlockNumber() {
      const web3 = new Web3(Web3.givenProvider);
      try {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log("blockNumber", blockNumber);
        this.resultData.blockNumber = blockNumber;
        alert("Get SUCCESS");
      } catch (e) {
        alert("Get FAIL");
        throw e;
      }
    },
    async handlerGetBlock() {
      const web3 = new Web3(Web3.givenProvider);
      try {
        const block = await web3.eth.getBlock(1);
        console.log("block", block);
        this.resultData.blockResult = JSON.stringify(block);
        alert("Get SUCCESS");
      } catch (e) {
        alert("Get FAIL");
        throw e;
      }
    },
  },
  props: {
    resultData: {
      require: true,
      default() {
        return {
          blockNumber: 0,
          blockResult: "",
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button {
  width: 180px;
}
.result {
  margin-top: 15px;
}
</style>
