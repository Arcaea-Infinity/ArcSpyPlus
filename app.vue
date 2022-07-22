<template>
  <NuxtPage></NuxtPage>
</template>
<script setup lang="ts">
import "./env";
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str: any, newStr: any) {
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    return this.replace(new RegExp(str, 'g'), newStr);

  };
}
</script>
<style>
@import url("./assets/css/base.css");
@import url("nprogress/nprogress.css");
</style>
