<script setup lang="ts">
// Chapter divider: big emoji or number, then the chapter title.
const props = defineProps<{ emoji?: string, nummer?: number | string }>()
</script>

<template>
  <div class="slidev-layout hoofdstuk">
    <div class="sb-badge">
      {{ props.emoji ?? props.nummer ?? '⭐' }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hoofdstuk {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: var(--sb-sun);
}
.sb-badge {
  flex: none;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: var(--sb-card);
  display: grid;
  place-content: center;
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--sb-coral);
  box-shadow: 0 8px 0 #0001;
}
.hoofdstuk :deep(h1) {
  font-size: 3.6rem;
  margin: 0;
}
</style>
