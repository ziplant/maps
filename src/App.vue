<template lang="pug">
#app
  Map(@show-hint="showHint")
  HintModal(v-if="hintMessage") {{hintMessage}}
</template>

<script>
import useHint from '@/compositions/hint';
import Map from '@/components/Map.vue';
import HintModal from '@/components/HintModal.vue';

export default {
  name: 'App',
  setup() {
    const {
      hintMessage,
      showHint,
    } = useHint();

    return {
      hintMessage,
      showHint,
    };
  },
  components: {
    Map,
    HintModal,
  },
};
</script>

<style lang="sass">
html,
body
  height: 100%

body
  margin: 0

#app
  height: 100%
  font-family: sans-serif
</style>
