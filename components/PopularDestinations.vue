<script setup lang="ts">
const { t } = useLang();

const photos = [
  "./images/dest-paris.png",
  "./images/dest-rome.png",
  "./images/dest-bali.png",
  "./images/dest-baikal.png",
];

const list = computed(() =>
  t.value.destNames.map((name, i) => ({
    name,
    photo: photos[i],
  })),
);

/* индекс слайдера на мобилке */
const mobStart = ref(0);

const mobPair = computed(() => {
  const arr = list.value;
  return [
    arr[mobStart.value % arr.length],
    arr[(mobStart.value + 1) % arr.length],
  ];
});

function prevMob() {
  mobStart.value = (mobStart.value - 1 + list.value.length) % list.value.length;
}

function nextMob() {
  mobStart.value = (mobStart.value + 1) % list.value.length;
}
</script>

<template>
  <section id="napravleniya" class="napr">
    <div class="wrap">
      <div class="verh">
        <h2 class="zag desk-zag">{{ t.popDestTitle }}</h2>
        <h2 class="zag mob-zag">{{ t.popDestTitleMob }}</h2>
        <a href="#" class="vse">{{ t.seeAll }}</a>
      </div>

      <!-- десктоп 4 круга -->
      <div class="setka-desk">
        <article v-for="item in list" :key="item.name" class="krug-card">
          <img :src="item.photo" :alt="item.name" class="krug-pic" />
          <p class="krug-name">{{ item.name }}</p>
        </article>
      </div>

      <div class="tochki-box">
        <img
          src="./images/slider-dots.png"
          alt=""
          class="tochki"
          width="83"
          height="23"
        />
      </div>

      <!-- мобилка 2 круга со стрелками как в макете -->
      <div class="mob-slider">
        <button
          type="button"
          class="mob-arrow"
          aria-label="Назад"
          @click="prevMob"
        >
          ‹
        </button>
        <div class="mob-para">
          <article v-for="item in mobPair" :key="item.name" class="krug-card">
            <img :src="item.photo" :alt="item.name" class="krug-pic" />
            <p class="krug-name">{{ item.name }}</p>
          </article>
        </div>
        <button
          type="button"
          class="mob-arrow"
          aria-label="Вперед"
          @click="nextMob"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped src="~/assets/styles/napr.css"></style>
