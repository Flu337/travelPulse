<script setup lang="ts">
const { t } = useLang()
const { openAuth } = useAuthModal()
</script>

<template>
  <footer id="podval" class="podval">
    <div class="wrap">
      <div class="podval-grid">
        <ul class="kolonka">
          <li v-for="item in t.footerCol1" :key="item">
            <a href="#" class="ssylka">{{ item }}</a>
          </li>
        </ul>

        <ul class="kolonka">
          <li v-for="(item, i) in t.footerCol2" :key="item">
            <button v-if="i === 2" type="button" class="ssylka" @click="openAuth('choice')">
              {{ item }}
            </button>
            <a v-else href="#" class="ssylka">{{ item }}</a>
          </li>
        </ul>

        <ul class="kolonka">
          <li v-for="item in t.footerCol3" :key="item">
            <a href="#" class="ssylka">{{ item }}</a>
          </li>
        </ul>

        <div class="valuta-box">
          <button type="button" class="valuta">{{ t.localeText }}</button>
        </div>
      </div>

      <p class="kopirait desk-only">{{ t.copyright }}</p>
      <div class="kopirait mob-only">
        <p>{{ t.copyrightMob1 }}</p>
        <p>{{ t.copyrightMob2 }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped src="~/assets/styles/podval.css"></style>
