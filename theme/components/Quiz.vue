<script setup lang="ts">
// Question for the class; the answer (slot) appears on the next click.
// <Quiz vraag="Hoe heet hete, vloeibare steen?">Magma! 🔥</Quiz>
const props = defineProps<{ vraag: string }>()
</script>

<template>
  <div class="sb-quiz">
    <div class="sb-quiz-vraag">
      ❓ {{ props.vraag }}
    </div>
    <div v-click class="sb-quiz-antwoord">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sb-quiz {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.sb-quiz-vraag {
  background: var(--sb-sky);
  color: white;
  font-weight: 900;
  font-size: 1.4em;
  border-radius: var(--sb-radius);
  padding: 1.2rem 1.8rem;
}
.sb-quiz-antwoord {
  background: var(--sb-teal);
  color: white;
  font-weight: 800;
  font-size: 1.3em;
  border-radius: var(--sb-radius);
  padding: 1rem 1.8rem;
}
.sb-quiz-antwoord :deep(strong) {
  color: var(--sb-sun);
}
.sb-quiz-antwoord :deep(p) {
  margin: 0;
}
</style>
