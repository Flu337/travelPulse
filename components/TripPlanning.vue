<script setup lang="ts">
const { t } = useLang()
const tabIdx = ref(0)
</script>

<template>
  <section id="plan" class="plan">
    <div class="wrap">
      <h2 class="zag">{{ t.planTitle }}</h2>

      <div class="knopki" role="tablist">
        <button
          v-for="(item, idx) in t.planTabs"
          :key="item"
          type="button"
          role="tab"
          :aria-selected="tabIdx === idx"
          class="pill"
          :class="{ on: tabIdx === idx }"
          @click="tabIdx = idx"
        >
          {{ item }}
        </button>
      </div>

      <div class="setka">
        <ul v-for="(col, i) in t.routeCols" :key="i" class="spisok">
          <li v-for="link in col" :key="link">
            <a href="#" class="ssylka">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped src="~/assets/styles/plan.css"></style>
