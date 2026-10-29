<script setup lang="ts">
import { computed } from 'vue'
import { backgroundStyle } from '../layoutHelper'

// Full-screen picture; the slide text becomes a caption strip at the bottom.
const props = defineProps<{ image: string }>()
const style = computed(() => backgroundStyle(props.image))
</script>

<template>
  <div class="slidev-layout plaatje" :style="style">
    <div class="sb-caption">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.plaatje {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
}
.sb-caption:empty {
  display: none;
}
.sb-caption {
  background: #fffffff0;
  border-radius: var(--sb-radius);
  padding: 0.6rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
}
.sb-caption :deep(p) {
  margin: 0;
}
</style>
