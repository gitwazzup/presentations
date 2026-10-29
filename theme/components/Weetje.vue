<script setup lang="ts">
// Fun-fact box: <Weetje>Een vulkaan kan ... </Weetje>
const props = withDefaults(defineProps<{ titel?: string }>(), { titel: 'Wist je dat?' })
</script>

<template>
  <div class="sb-weetje">
    <div class="sb-weetje-titel">
      💡 {{ props.titel }}
    </div>
    <div class="sb-weetje-tekst">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sb-weetje {
  background: var(--sb-card);
  border: 5px solid var(--sb-sun);
  border-radius: var(--sb-radius);
  padding: 1.2rem 1.8rem;
  box-shadow: 0 8px 0 #0001;
}
.sb-weetje-titel {
  font-weight: 900;
  font-size: 1.3em;
  color: var(--sb-coral);
  margin-bottom: 0.3rem;
}
.sb-weetje-tekst :deep(p) {
  margin: 0.2rem 0;
}
</style>
