<template>
  <div class="asset">
    <el-card>
      <div slot="header"><h2>ScCall</h2></div>
      <el-form ref="form" :model="initialValues" label-width="80px">
        <el-form-item label="Contract">
          <el-input v-model="initialValues.contract"></el-input>
        </el-form-item>
        <el-form-item label="Method">
          <el-input v-model="initialValues.method"></el-input>
        </el-form-item>
        <el-form-item label="Gas Price">
          <el-input v-model="initialValues.gasPrice"></el-input>
        </el-form-item>
        <el-form-item label="Gas Limit">
          <el-input v-model="initialValues.gasLimit"></el-input>
        </el-form-item>

        <el-form-item label="Require" type="checkbox">
          <el-switch v-model="initialValues.requireIdentity"></el-switch>
        </el-form-item>

        <!-- <el-form-item label="Parameters">
          <el-button type="primary" >
            Add Parameters
          </el-button>
        </el-form-item> -->
        <div>
          <el-form-item label="Type">
            <el-select
              v-model="initialValues.type"
              placeholder="Please select the type"
              style="width: 100%"
            >
              <el-option label="Boolean" value="Boolean"></el-option>
              <el-option label="Integer" value="Integer"></el-option>
              <el-option label="ByteArray" value="ByteArray"></el-option>
              <el-option label="String" value="String"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Value">
            <el-input v-model="initialValues.value"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="submit" @click="onScCall">Call SC</el-button>
          <div class="result">Result: {{ resultData.sccall }}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onScCallRead"
            >Call SC ReadOnly</el-button
          >
          <div class="result">Result: {{ resultData.sccallRead }}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onScCallReadArray"
            >Call SC ReadOnly</el-button
          >
          <div class="result">Result: {{ resultData.sccallArray }}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="onScCallReadMap"
            >Call SC ReadOnly</el-button
          >
          <div class="result">Result: {{ resultData.sccallReadMap }}</div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { client, provider } from "@ont-dev/ontology-dapi";

export default {
  props: {
    resultData: {
      require: true,
      default() {
        return {
          sccall: "",
          sccallRead: "",
          sccallArray: "",
          sccallReadMap: "",
        };
      },
    },
  },
  data() {
    return {
      initialValues: {
        contract: "bd76a5917e0444d4b615b87c5912362164676dc7",
        method: "Add",
        gasPrice: "3000",
        gasLimit: "100000000",
        requireIdentity: "",
        parameters: [
          { type: "Integer", value: "5" },
          { type: "Integer", value: "4" },
        ],
      },
    };
  },
  methods: {
    async onScCall() {
      const scriptHash = this.initialValues.contract;
      const operation = this.initialValues.method;
      const gasPrice = this.initialValues.gasPrice;
      const gasLimit = this.initialValues.gasLimit;
      const requireIdentity = this.initialValues.requireIdentity;
      const parametersRaw = this.initialValues.parameters;
      const args = parametersRaw.map((item) => {
        return {
          type: item.type,
          value: this.convertValue(item.value, item.type),
        };
      });

      try {
        const result = await client.api.smartContract.invoke({
          scriptHash,
          operation,
          args,
          gasPrice,
          gasLimit,
          requireIdentity,
        });
        console.log("onScCall finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCall canceled");
        console.log("onScCall error:", e);
      }
    },
    async onScCallRead() {
      const scriptHash = "b4c21cf0d9a33613a63e6af4b5cb95e9d532d3eb";
      const operation = "Hello";
      const parametersRaw = [{ type: "Integer", value: "5" }];
      const args = parametersRaw.map((raw) => ({
        type: raw.type,
        value: this.convertValue(raw.value, raw.type),
      }));

      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          operation,
          args,
        });
        console.log("onScCallRead finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCallRead canceled");
        // tslint:disable-next-line:no-console
        console.log("onScCallRead error:", e);
      }
    },
    async onScCallReadArray() {
      const scriptHash = "b4c21cf0d9a33613a63e6af4b5cb95e9d532d3eb";
      const operation = "Hello";
      const parameter0 = "5";
      const parameter1 = "6";
      const parameter0type = "Integer";
      const parameter1type = "Integer";
      const args = [
        {
          type: "",
          value: [
            {
              type: parameter0type,
              value: this.convertValue(parameter0, parameter0type),
            },
            {
              type: parameter1type,
              value: this.convertValue(parameter1, parameter1type),
            },
          ],
        },
      ];
      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          operation,
          args,
        });
        // tslint:disable-next-line:no-console
        console.log("onScCallRead finished, result:" + JSON.stringify(result));
      } catch (e) {
        alert("onScCallRead canceled");
        // tslint:disable-next-line:no-console
        console.log("onScCallRead error:", e);
      }
    },
    async onScCallReadMap() {
      const scriptHash = "b4c21cf0d9a33613a63e6af4b5cb95e9d532d3eb";
      const operation = "Hello";
      const parameter0 = "5";
      const parameter1 = "6";
      const parameter0type = "Integer";
      const parameter1type = "Integer";
      const parameter0name = "x";
      const parameter1name = "y";
      const args = [
        {
          type: "",
          value: {
            [parameter0name]: {
              type: parameter0type,
              value: this.convertValue(parameter0, parameter0type),
            },
            [parameter1name]: {
              type: parameter1type,
              value: this.convertValue(parameter1, parameter1type),
            },
          },
        },
      ];

      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          operation,
          args,
        });
        console.log("onScCallRead finished, result:" + JSON.stringify(result));
        setSccallreadmap(JSON.stringify(result));
      } catch (e) {
        alert("onScCallRead canceled");
        console.log("onScCallRead error:", e);
      }
    },
    convertValue(value, type) {
      switch (type) {
        case "Boolean":
          return Boolean(value);
        case "Integer":
          return Number(value);
        case "ByteArray":
          return value;
        case "String":
          return client.api.utils.strToHex(value);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.asset {
  width: 60%;
  margin: 0 auto;
}
.item {
  margin-bottom: 20px;
}
.el-button {
  width: 180px;
}
.result {
  margin-top: 10px;
}
</style>
