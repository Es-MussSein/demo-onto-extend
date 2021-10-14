<template>
  <div class="g-content">
    <HeadInfo :account="resultData.account"></HeadInfo>
    <el-card>
      <el-card>
        <el-button type="primary" @click="handlerInitETH">initETH</el-button>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetChainId"
          >getChainId</el-button
        >
        <div class="result">Result: {{ resultData.chainId }}</div>
      </el-card>
    </el-card>
    <el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetAccount"
          >getAccount</el-button
        >
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetBalance"
          >getBalance</el-button
        >
        <div class="result">Result: {{ resultData.balance }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetTransactionCount"
          >getTransactionCount</el-button
        >
        <div class="result">Result: {{ resultData.count }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerGetTransactionReceipt"
          >getTransactionReceipt</el-button
        >
        <div class="result">Result: {{ resultData.receipt }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerEstimateGas"
          >estimateGas</el-button
        >
        <div class="result">Result: {{ resultData.estimateGas }}</div>
      </el-card>
    </el-card>
    <ETHBlockNumber :blockNumber="resultData.blockNumber" :blockResult="resultData.blockResult" />
    <ETHCoinBase :coinBase="resultData.coinBase" />
    <ETHApprove
      :approveResult="resultData.approveResult"
      :allowance="resultData.allowance"
      :currentHash="resultData.currentHash"
      :receipt="resultData.receipt"
    />
  </div>
</template>
<script>
import HeadInfo from "../components/HeadInfo.vue";
import ETHApprove from "../components/eth/Approve.vue";
import ETHBlockNumber from "../components/eth/BlockNumber.vue";
import ETHCoinBase from "../components/eth/CoinBase.vue";
import Web3 from "web3";

export default {
  name: "Eth",
  components: { HeadInfo, ETHApprove, ETHBlockNumber, ETHCoinBase },
  props: {
    resultData: {
      require: true,
      default() {
        return {
          account: "",
          chainId: 0,
          balance: "",
          count: 0,
          receipt: "",
          estimateGas: "",
          blockNumber:0,
          blockResult:"",
          coinBase: "",
          approveResult: "",
          allowance: "",
          currentHash: "",
          receipt: "",
        };
      },
    },
  },
  methods: {
    initEvent() {
      window.onto.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts);
      });
      window.onto.on("networkChanged", (result) => {
        console.log("networkChanged", result);
      });
      window.onto.on("connect", (result) => {
        console.log("connect", result);
      });
      window.onto.on("disconnect", (result) => {
        console.log("disconnect", result);
      });
      window.onto.on("message", (result) => {
        console.log("message", result);
      });
    },
    async handlerInitETH() {
      const web3 = new Web3(Web3.givenProvider);
      
    //   const web3 = new Web3(window.onto);

      console.log("global:", web3);
      const accounts = await web3.eth.requestAccounts();
      console.log("accounts", accounts);
      console.log("web3.currentProvider", web3.currentProvider);
      if (accounts.length > 0) {
        this.resultData.account = accounts[0];
        this.initEvent();
      }
    },
    async handlerGetChainId() {
      const web3 = new Web3(Web3.givenProvider);
      const id = await web3.eth.getChainId();
      console.log("id", id);
      //   setChainId(id);
      this.resultData.chainId = id;
    },
    async handlerGetAccount() {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);
      if (accounts.length > 0) {
        this.resultData.account = accounts[0];
      }
    },
    async handlerGetBalance() {
      const web3 = new Web3(Web3.givenProvider);
      if (!this.resultData.account) {
        alert("please get account");
      }
      console.log("account", this.resultData.account);
      const balance = await web3.eth.getBalance(this.resultData.account);
      console.log("balance", balance);
      this.resultData.balance = balance;
    },
    async handlerGetTransactionCount() {
      const web3 = new Web3(Web3.givenProvider);
      if (!this.resultData.account) {
        alert("please get account");
      }
      const count = await web3.eth.getTransactionCount(this.resultData.account);
      console.log("count", count);
      this.resultData.count = count;
    },
    async handlerGetTransactionReceipt() {
      const web3 = new Web3(Web3.givenProvider);
      const receipt = await web3.eth.getTransactionReceipt(
        "0x4c9e6d8d598111e11a7642118107a73d6c6e2800654b1d1d3fd602bf926796c8"
      );
      console.log("receipt", receipt);
      this.resultData.receipt = JSON.stringify(receipt);
    },
    async handlerEstimateGas() {
      const web3 = new Web3(Web3.givenProvider);
      const estimate = await web3.eth.estimateGas({
        to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003",
      });
      console.log("estimate", estimate);
      this.resultData.estimateGas = JSON.stringify(estimate);
    },
  },
};
</script>
<style lang="scss" scoped>
.g-content {
  margin: 0 auto;
  max-width: 1280px;
  height: 80px;
}
.el-button {
  width: 180px;
}
.result {
  margin-top: 15px;
}
</style>