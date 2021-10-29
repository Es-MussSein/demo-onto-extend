<template>
  <div class="g-content">
    <HeadInfo :account="resultData.account"></HeadInfo>
    <el-card>
      <el-button type="primary" @click="handlerInitOnt">initONT</el-button>
      <el-button type="primary" @click="handlerSendAsset">Send Asset</el-button>
    </el-card>
    <el-card>
      <el-button type="primary" @click="handlerGetAccount"
        >getAccount</el-button
      >
    </el-card>
    <ONTNetwork :network="resultData.network" />
    <ONTProvider :providers="resultData.providers" />
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane>
        <router-link slot="label" to="/ont" class="router-to">
          invoke
          <!-- <ONTInvoke /> -->
        </router-link>
      </el-tab-pane>

      <el-tab-pane>
        <router-link slot="label" to="/ont/InvokeWasm" class="router-to">
         invokeWasm
          <!-- <ONTInvokeWasm /> -->
        </router-link>
      </el-tab-pane>

      <router-view />
    </el-tabs>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";
import HeadInfo from "../components/HeadInfo.vue";
import ONTProvider from "../components/ont/Provider.vue";
import ONTNetwork from "../components/ont/Network.vue";
import ONTInvoke from "../components/ont/Invoke.vue";
import ONTInvokeWasm from "../components/ont/InvokeWasm.vue";
export default {
  name: "Ont",
  components: { HeadInfo, ONTProvider, ONTNetwork, ONTInvoke, ONTInvokeWasm },
  props: {
    resultData: {
      require: true,
      default() {
        return {
          account: "",
          network: "",
          providers: "",
        };
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlerInitOnt() {
      try {
        client.registerClient({
          extension: provider.ExtensionType.Onto,
        });
        alert("init SUCCESS");
      } catch (e) {
        alert("init FAIL");
        console.log(e);
      }
    },
    async handlerSendAsset() {
      try {
        const result = await client.api.asset.send({
          to: "AVagaSMzMHdRGDn6HbW7NtTejzpvkYU5o8",
          asset: "ONG",
          amount: "1000000000",
        });
        console.log("result", result);
      } catch (e) {
        alert("Send fail, please try again.");
        throw e;
      }
    },
    async handlerGetAccount() {
      try {
        const account = await client.api.asset.getAccount();
        console.log("account: ", account);
        this.resultData.account = account;
      } catch (e) {
        alert("Get fail,please init ont.");
        throw e;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.router-to {
  margin: 0 auto;
  color:#000;
  text-decoration: none;
}
.g-content {
  margin: 0 auto;
  max-width: 1280px;
  height: 80px;
}
.el-button {
  width: 180px;
}
</style>
