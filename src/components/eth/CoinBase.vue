<template>
  <div>
    <el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetCoinBase"
          >getCoinBase</el-button
        >
        <div class="result">Result: {{ resultData.coinBase }}</div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import Web3 from 'web3'
export default {
  name: "CoinBase",
  methods: {
    async handlerGetCoinBase() {
        const web3=new Web3(Web3.givenProvider);
        try{
            const coinBase = await web3.eth.getCoinbase();
            console.log('coinBase',coinBase);
            this.resultData.coinBase=coinBase;
            alert("Get SUCCESS");
        }catch(e){
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
          coinBase: "",
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
