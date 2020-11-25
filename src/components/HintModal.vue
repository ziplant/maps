<template lang="pug">
.hint-modal
  slot
</template>

<script>
export default {

};
</script>

<style lang="sass">
.hint-modal
  position: fixed
  top: 10px
  right: 10px
  width: 300px
  padding: 10px
  background-color: #fff
  font-size: 14px
  border-radius: 4px
  box-shadow: 1px 1px 6px -2px #000
  opacity: .85
  z-index: 20
</style>
