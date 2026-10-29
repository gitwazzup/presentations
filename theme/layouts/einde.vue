<template>
  <!-- Last slide. Default text "Vragen?"; put your own text in the slide to replace it. -->
  <div class="slidev-layout einde">
    <slot>
      <h1>Vragen? 🙋</h1>
    </slot>
  </div>
</template>

<style scoped>
.einde {
  display: grid;
  place-content: center;
  text-align: center;
  background: var(--sb-teal);
  color: white;
}
.einde :deep(h1) {
  font-size: 5rem;
}
.einde :deep(strong) {
  color: var(--sb-sun);
}
</style>
