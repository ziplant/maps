/* eslint-disable no-undef */
<template lang="pug">
#map
</template>

<script>
import { watch } from '@vue/composition-api';
import useMap from '@/compositions/map';

export default {
  setup(props, { emit }) {
    const mapCore = useMap();

    mapCore.maps.ready(() => {
      mapCore.createMap();
      mapCore.createArea();
    });

    watch(mapCore.address, (value) => {
      emit('show-hint', value);
    });
  },
};
</script>

<style lang="sass">
#map
  width: 100%
  height: 100%
</style>
