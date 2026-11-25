<script setup lang="ts">
const { t } = useLang();

const baseTours = [
  {
    loc: "France, Paris",
    title: "DisneyLand",
    rate: "4.7",
    img: "/travelPulse/images/tour-disneyland.png",
  },
  {
    loc: "Italy, Roma",
    title: "Coliseum",
    rate: "4.2",
    img: "/travelPulse/images/tour-coliseum.png",
  },
  {
    loc: "Indonesia, Bali",
    title: "Tanakh-Lot",
    rate: "5.0",
    img: "/travelPulse/images/tour-tanah-lot.png",
  },
  {
    loc: "Russia, Irkutsk",
    title: "Olkhon",
    rate: "4.0",
    img: "/travelPulse/images/tour-olkhon.png",
  },
  {
    loc: "China",
    title: "The Great Wall of China",
    rate: "4.1",
    img: "/travelPulse/images/tour-great-wall.png",
  },
  {
    loc: "UAE, Dubai",
    title: "Burj Khalifa",
    rate: "4.8",
    img: "/travelPulse/images/tour-burj-khalifa.png",
  },
];

const tury = computed(() =>
  baseTours.map((item) => ({
    ...item,
    desc: `${item.title} - ${t.value.tourDescSuffix}`,
  })),
);
</script>

<template>
  <section id="tury" class="tury">
    <div class="wrap">
      <div class="verh">
        <h2 class="zag">{{ t.popToursTitle }}</h2>
        <a href="#" class="vse desk-vse">{{ t.seeAll }}</a>
      </div>

      <!-- сетка карточек туров -->
      <div class="tury-grid">
        <article v-for="item in tury" :key="item.loc" class="karta">
          <div class="foto-box">
            <img :src="item.img" :alt="item.loc" class="foto" />
          </div>

          <div class="info">
            <p class="mesto">{{ item.loc }}</p>
            <p class="opis">{{ item.desc }}</p>

            <div class="reiting">
              <span class="ocenka">{{ item.rate }}</span>
              <img
                src="/travelPulse/images/icon-star.png"
                alt=""
                class="zvezda"
                width="26"
                height="26"
              />
            </div>
          </div>
        </article>
      </div>

      <div class="mob-vse-box">
        <a href="#" class="vse mob-vse">{{ t.seeAll }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped src="~/assets/styles/tury.css"></style>
