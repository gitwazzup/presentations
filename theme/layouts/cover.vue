<script setup lang="ts">
import { computed } from 'vue'
import { backgroundStyle } from '../layoutHelper'

// Title slide. `image` (optional) becomes a darkened full-screen background photo.
const props = defineProps<{ image?: string }>()
const style = computed(() => backgroundStyle(props.image, true))
</script>

<template>
  <div class="slidev-layout cover" :class="{ 'met-foto': props.image }" :style="style">
    <div v-if="!props.image" class="sb-blob sb-blob-1" />
    <div v-if="!props.image" class="sb-blob sb-blob-2" />
    <slot />
  </div>
</template>

<style scoped>
.cover {
  /* Own stacking context so the z-index:-1 blobs sit above the background but behind the text. */
  isolation: isolate;
}
.sb-blob {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  opacity: 0.35;
}
.sb-blob-1 {
  width: 340px;
  height: 340px;
  background: var(--sb-sun);
  top: -110px;
  left: -90px;
}
.sb-blob-2 {
  width: 260px;
  height: 260px;
  background: var(--sb-teal);
  bottom: -90px;
  right: -60px;
}
</style>
