<template>
  <div class="card">
    <div class="card-header" v-if="this.$slots['header']">
      <slot name="header"></slot>
    </div>
    <slot name="afterheader"></slot>
    <div class="card-body" v-if="this.$slots['body']">
      <div class="lc-body" :class="showModal?'ce_open':''">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="card-footer" v-if="this.$slots['footer']">
      <slot name="footer" class="card-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
   props:["showModal"]
};
</script>

