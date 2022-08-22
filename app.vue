<template>

  <Head>
    <Link rel="shortcut icon" href="/favicon.ico" />
    <Link href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
    <Title>ArcSpy+</Title>
    <Meta charset="UTF-8" />
    <Meta http-equiv="x-ua-compatible" content="IE=edge" />
    <Meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
    <Meta name="description" content="Arcaea查分站点" />
    <Script src="https://unpkg.com/nprogress@0.2.0/nprogress.js" defer> </Script>
  </Head>
  <NuxtPage></NuxtPage>
</template>
<script setup lang="ts">

useHead({
  htmlAttrs: {
    lang: "zh-cn"
  }
})

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
/* @import url("nprogress/nprogress.css"); */
</style>
