<template>
  <!-- Small credit line pinned to the bottom of a slide: <Bron>Foto: ...</Bron> -->
  <div class="sb-bron">
    <slot />
  </div>
</template>

<style scoped>
.sb-bron {
  position: absolute;
  left: 1rem;
  bottom: 0.6rem;
  font-size: 0.75rem;
  color: var(--sb-muted);
  background: #ffffffd0;
  border-radius: 8px;
  padding: 0.1rem 0.5rem;
}
.sb-bron :deep(p) {
  margin: 0;
}
</style>
