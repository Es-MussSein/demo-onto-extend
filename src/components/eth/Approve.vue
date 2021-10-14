<template>
  <div>
    <el-card>
      <el-card>
        <el-button type="primary" @click="handlerApprove">Approve</el-button>
        <div class="result">Result: {{ resultData.approveResult }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerApproveCheck"
          >ApproveCheck</el-button
        >
        <div class="result">Result: {{ resultData.allowance }}</div>
      </el-card>
      <el-card>
        <el-button type="primary" @click="handlerSendTransaction"
          >SendTransaction</el-button
        >
        <div class="result">Result: {{ resultData.currentHash }}</div>
        <div class="result">Receipt: {{ resultData.receipt }}</div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { getAmount } from "../../utils/count";
const ERC20_ABI =
  '[{"inputs":[{"internalType":"address","name":"lockProxyContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
const supplyAbi =
  '{"constant":false,"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}';

export default {
  name: "Approve",
  methods: {
    async handlerApprove() {
      const web3 = new Web3(Web3.givenProvider);
      const account = await web3.eth.getAccounts();
      const underlying_address = "0x58708604BAE3e6133354cef87A042A14DcE9D1C7";
      const lock_address = "0x33BfF023467CF5ca53AEcd200a25A8C1a45a4b98";
      const float = 9;
      console.log("underlying_address", underlying_address);
      console.log("lock_address", lock_address);
      try {
        const Coin = new web3.eth.Contract(
          JSON.parse(ERC20_ABI),
          underlying_address
        );
        const tokenAmountToApprove = new BigNumber(99999999999999999999)
          .shiftedBy(Number(float))
          .toString();
        console.log("tokenAmountToApprove", tokenAmountToApprove);
        const tx = await Coin.methods
          .approve(lock_address, tokenAmountToApprove)
          .send({
            from: account[0],
            gas: 800000,
          })
          .on("transactionHash", (res) => {
            console.log("res1", res);
            this.resultData.approveResult = JSON.stringify(res);
          })
          .on("receipt", (receipt) => {
            console.log("on receipt", receipt);
          })
          .on("error", (err) => {
            console.log("err2", err);
          });
        console.log("approveAction tx", tx);
      } catch (e) {
        console.log("Approve FAIL");
        throw e;
      }
    },
    async handlerApproveCheck() {
      const web3 = new Web3(Web3.givenProvider);
      const underlying_address = "0x0d179931563D001D8211eEB70a7b9ddA03e5FBB5";
      const lock_address = "0x33BfF023467CF5ca53AEcd200a25A8C1a45a4b98";
      try {
        const Coin = new web3.eth.Contract(
          JSON.parse(ERC20_ABI),
          underlying_address
        );
        const account = await web3.eth.getAccounts();
        const balance = await Coin.methods
          .allowance(account[0], lock_address)
          .call();
        console.log("balance", balance);
        this.resultData.allowance = balance;
        console.log("Check SUCCESS");
      } catch (e) {
        console.log("Check FAIL");
        throw e;
      }
    },
    async handlerSendTransaction() {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const data = await web3.eth.abi.encodeFunctionCall(
        JSON.parse(supplyAbi),
        [getAmount("0.0000001", 9)]
      );
      const value = "0";
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      const contract = "0xa7AdA778eC809D5aABC9215A9D95F7903BC93AF4";
      const signParams = {
        from: accounts[0] || "",
        to: contract,
        value,
        gas: 800000,
        gasPrice,
        data,
        nonce,
      };
      console.log("signParams", signParams);
      web3.eth
        .sendTransaction(signParams)
        .on("transactionHash", (hash) => {
          console.log("on transactionHash:", hash);
          this.resultData.currentHash = hash;
        })
        .on("receipt", (receipt) => {
          console.log("on receipt:", receipt);
          this.resultData.receipt = receipt;
        })
        .on("error", (error) => {
          console.log("on err", err);
        });
    },
  },
  props: {
    resultData: {
      require: true,
      default() {
        return {
          approveResult: "",
          allowance: "",
          currentHash: "",
          receipt: "",
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
