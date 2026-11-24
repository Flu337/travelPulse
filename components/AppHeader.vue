<script setup lang="ts">
const { lang, t, otherLangs, setLang } = useLang()
const { openAuth } = useAuthModal()

const poiskText = ref('')
const langOpen = ref(false)
const langBoxRef = ref<HTMLElement | null>(null)

function pickLang(code: 'RUS' | 'ENG' | '中国人') {
  setLang(code)
  langOpen.value = false
}

function closeOutside(e: MouseEvent) {
  if (langBoxRef.value && !langBoxRef.value.contains(e.target as Node)) {
    langOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOutside))
onBeforeUnmount(() => document.removeEventListener('click', closeOutside))
</script>

<template>
  <header id="shapka" class="shapka">
    <div class="wrap shapka-row">
      <a href="#" class="logo">
        <img src="/images/logo.png" alt="TravelPulse" class="logo-pic" width="83" height="83" />
        <span class="logo-name">Travel<br />Pulse</span>
      </a>

      <!-- поиск в шапке скрыт на мобилке как в макете -->
      <div class="shapka-poisk">
        <input
          v-model="poiskText"
          type="text"
          class="poisk-vvod"
          :placeholder="t.searchPlaceholder"
          :aria-label="t.searchPlaceholder"
        />
        <button type="button" class="poisk-btn" :aria-label="t.searchPlaceholder">
          <img src="/images/icon-search.png" alt="" width="34" height="34" />
        </button>
      </div>

      <div class="pravo">
        <!-- переключение язка frame 9 -->
        <div ref="langBoxRef" class="yazyk-box">
          <button type="button" class="yazyk-btn" @click="langOpen = !langOpen">
            {{ lang }}
          </button>

          <div v-if="langOpen" class="yazyk-menu">
            <button
              v-for="item in otherLangs"
              :key="item"
              type="button"
              class="yazyk-opt"
              @click="pickLang(item)"
            >
              {{ item }}
            </button>
            <img src="/images/icon-add.png" alt="" class="yazyk-plus" width="20" height="20" />
          </div>
        </div>

        <button type="button" class="vhod-btn" @click="openAuth('choice')">
          <img src="/images/icon-user.png" alt="" class="user-pic" width="48" height="48" />
          <span class="vhod-text">{{ t.login }}</span>
        </button>

        <button type="button" class="menu-btn" aria-label="Меню">
          <img src="/images/icon-menu.png" alt="" class="menu-pic" width="46" height="46" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped src="~/assets/styles/shapka.css"></style>
