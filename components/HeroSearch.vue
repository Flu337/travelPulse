<script setup lang="ts">
type OpenMenu =
  | "otkuda"
  | "kuda"
  | "tuda"
  | "obratno"
  | "ludi"
  | "klass"
  | null;

const { t } = useLang();

const tab = ref<"cars" | "flights" | "hotels">("flights");
const menu = ref<OpenMenu>(null);
const formaRef = ref<HTMLElement | null>(null);

const otkuda = ref("Иркутск (IKT)");
const mobOtkuda = ref("Из Улан-Удэ");
const kuda = ref("");
const dataTuda = ref("");
const dataObratno = ref("");
const vzroslye = ref(1);
const deti = ref(0);
const klassIndex = ref(0);

const rezhimDat = ref<"exact" | "flex">("exact");
const tipPoezdki = ref<"round" | "oneway">("round");
const mesyacStart = ref(5);
const god = ref(2025);
const tempTuda = ref("");
const tempObratno = ref("");

const mesyacy = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const mesShort = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

const dniNedeli = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const goroda = [
  {
    name: "Россия (RU)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-flag.png",
    sz: 25,
  },
  {
    name: "Москва (Любой)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-pointer.png",
    sz: 25,
  },
  {
    name: "Санкт-Петербург Пулково (LED)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Казань (KZN)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Сочи (AER)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Мома (MQJ)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Москва Шереметьево (SVO)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Москва Внуково (VKO)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
  {
    name: "Москва Жуковский (ZIA)",
    sub: "Россия",
    icon: "/travelPulse/images/icon-airplane.png",
    sz: 29,
  },
];

const ludiText = computed(() => {
  const vsego = vzroslye.value + deti.value;
  if (deti.value === 0) {
    return vzroslye.value === 1
      ? t.value.oneAdult
      : `${vzroslye.value} ${t.value.adultsWord}`;
  }
  return `${vsego} ${t.value.travelersShort}`;
});

const klassText = computed(
  () => t.value.cabinOptions[klassIndex.value] || t.value.economy,
);

/* генерация дней месяца для календаря */
function getMonth(offset: number) {
  const raw = mesyacStart.value + offset;
  const y = god.value + Math.floor(raw / 12);
  const m = ((raw % 12) + 12) % 12;
  const start = (new Date(y, m, 1).getDay() + 6) % 7;
  const total = new Date(y, m + 1, 0).getDate();

  const cells: Array<{ d: number | null; k: string; txt: string }> = [];
  for (let i = 0; i < start; i++)
    cells.push({ d: null, k: `e-${y}-${m}-${i}`, txt: "" });
  for (let d = 1; d <= total; d++) {
    cells.push({ d, k: `${y}-${m + 1}-${d}`, txt: `${d} ${mesShort[m]}` });
  }
  return { title: mesyacy[m], cells };
}

const m1 = computed(() => getMonth(0));
const m2 = computed(() => getMonth(1));

function openMenu(name: OpenMenu) {
  if (menu.value === name) {
    menu.value = null;
    return;
  }
  if (name === "tuda" || name === "obratno") {
    tempTuda.value = dataTuda.value;
    tempObratno.value = dataObratno.value;
  }
  menu.value = name;
}

function closeMenu() {
  menu.value = null;
}

function pickGorod(name: string) {
  otkuda.value = name;
  mobOtkuda.value = `Из ${name.split(" ")[0]}`;
  closeMenu();
}

function pickDay(cell: { d: number | null; txt: string }) {
  if (!cell.d) return;
  if (menu.value === "obratno") tempObratno.value = cell.txt;
  else tempTuda.value = cell.txt;
}

function applyDates() {
  dataTuda.value = tempTuda.value;
  dataObratno.value = tempObratno.value;
  closeMenu();
}

function clickOutside(e: MouseEvent) {
  if (formaRef.value && !formaRef.value.contains(e.target as Node)) {
    closeMenu();
  }
}

onMounted(() => document.addEventListener("click", clickOutside));
onBeforeUnmount(() => document.removeEventListener("click", clickOutside));
</script>

<template>
  <section id="poisk" class="hero">
    <div ref="formaRef" class="wrap">
      <!-- вкладки сервисов на десктопе -->
      <nav class="servisy" aria-label="Сервисы">
        <button
          type="button"
          class="tab"
          :class="{ active: tab === 'cars' }"
          @click="tab = 'cars'"
        >
          <img
            src="/travelPulse/images/icon-car.png"
            alt=""
            class="tab-ico car"
            width="41"
            height="41"
          />
          <span>{{ t.cars }}</span>
        </button>

        <button
          type="button"
          class="tab"
          :class="{ active: tab === 'flights' }"
          @click="tab = 'flights'"
        >
          <img
            src="/travelPulse/images/icon-airport.png"
            alt=""
            class="tab-ico"
            width="36"
            height="36"
          />
          <span>{{ t.flights }}</span>
        </button>

        <button
          type="button"
          class="tab"
          :class="{ active: tab === 'hotels' }"
          @click="tab = 'hotels'"
        >
          <img
            src="/travelPulse/images/icon-bed.png"
            alt=""
            class="tab-ico"
            width="37"
            height="37"
          />
          <span>{{ t.hotels }}</span>
        </button>
      </nav>

      <h1 class="zag desk-zag">{{ t.heroTitle }}</h1>
      <h1 class="zag mob-zag">
        {{ t.heroTitleMob1 }}<br />{{ t.heroTitleMob2 }}
      </h1>

      <!-- десктопная форма поиска frame 1 - frame 7 -->
      <div class="forma-desk">
        <div class="pole-box">
          <button type="button" class="pole" @click="openMenu('otkuda')">
            <span class="metka">{{ t.fromLabel }}</span>
            <span class="znach">{{ otkuda }}</span>
          </button>

          <div v-if="menu === 'otkuda'" class="vypad vypad-otkuda">
            <button
              type="button"
              class="krest"
              aria-label="Закрыть"
              @click="closeMenu"
            >
              <img
                src="/travelPulse/images/icon-close.png"
                alt=""
                width="23"
                height="23"
              />
            </button>
            <ul class="spisok-gorodov">
              <li v-for="g in goroda" :key="g.name">
                <button
                  type="button"
                  class="gorod-btn"
                  @click="pickGorod(g.name)"
                >
                  <img
                    :src="g.icon"
                    alt=""
                    :width="g.sz"
                    :height="g.sz"
                    class="gorod-ico"
                  />
                  <span class="gorod-txt">
                    <span class="gorod-name">{{ g.name }}</span>
                    <span class="gorod-sub">{{ g.sub }}</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="pole-box">
          <div class="pole" @click="openMenu('kuda')">
            <span class="metka mal">{{ t.toLabel }}</span>
            <input
              v-model="kuda"
              type="text"
              class="vvod-polya"
              :placeholder="t.toPlaceholder"
              @focus="menu = 'kuda'"
            />
          </div>

          <div v-if="menu === 'kuda'" class="vypad vypad-kuda">
            <button
              type="button"
              class="krest"
              aria-label="Закрыть"
              @click="closeMenu"
            >
              <img
                src="/travelPulse/images/icon-close.png"
                alt=""
                width="23"
                height="23"
              />
            </button>
            <button
              type="button"
              class="kuda-opt"
              @click="
                kuda = t.searchEverywhere;
                closeMenu();
              "
            >
              <img
                src="/travelPulse/images/icon-search-sm.png"
                alt=""
                width="26"
                height="26"
              />
              <span>{{ t.searchEverywhere }}</span>
            </button>
            <button
              type="button"
              class="kuda-opt"
              @click="
                kuda = t.searchMulti;
                closeMenu();
              "
            >
              <img
                src="/travelPulse/images/icon-airplane-sm.png"
                alt=""
                width="26"
                height="26"
              />
              <span>{{ t.searchMulti }}</span>
            </button>
          </div>
        </div>

        <div class="pole-box">
          <button type="button" class="pole" @click="openMenu('tuda')">
            <span class="metka">{{ t.departLabel }}</span>
            <span class="znach">{{ dataTuda || t.pickDate }}</span>
          </button>

          <div v-if="menu === 'tuda'" class="vypad vypad-kalendar">
            <div class="kal-verh">
              <div class="kal-tabs">
                <button
                  type="button"
                  class="kal-tab"
                  :class="{ on: rezhimDat === 'exact' }"
                  @click="rezhimDat = 'exact'"
                >
                  {{ t.exactDates }}
                </button>
                <span class="kal-line" />
                <button
                  type="button"
                  class="kal-tab"
                  :class="{ on: rezhimDat === 'flex' }"
                  @click="rezhimDat = 'flex'"
                >
                  {{ t.flexDates }}
                </button>
              </div>
              <button
                type="button"
                class="krest stat"
                aria-label="Закрыть"
                @click="closeMenu"
              >
                <img
                  src="/travelPulse/images/icon-close.png"
                  alt=""
                  width="22"
                  height="22"
                />
              </button>
            </div>

            <div class="kal-tip-row">
              <button
                type="button"
                class="kal-tip"
                @click="
                  tipPoezdki = tipPoezdki === 'round' ? 'oneway' : 'round'
                "
              >
                <span>{{
                  tipPoezdki === "round" ? t.roundTrip : t.oneWay
                }}</span>
                <span>▾</span>
              </button>
            </div>

            <div class="kal-mesyacy">
              <div class="mes-box">
                <div class="mes-head">
                  <button
                    type="button"
                    class="strelka"
                    @click="mesyacStart -= 1"
                  >
                    ‹
                  </button>
                  <p class="mes-name">{{ m1.title }}</p>
                  <span class="pusto" />
                </div>
                <div class="dni-zag">
                  <span v-for="w in dniNedeli" :key="w">{{ w }}</span>
                </div>
                <div class="dni-grid">
                  <button
                    v-for="c in m1.cells"
                    :key="c.k"
                    type="button"
                    class="den"
                    :class="{ off: !c.d, vybran: c.txt && c.txt === tempTuda }"
                    :disabled="!c.d"
                    @click="pickDay(c)"
                  >
                    {{ c.d || "" }}
                  </button>
                </div>
              </div>

              <div class="mes-box">
                <div class="mes-head">
                  <span class="pusto" />
                  <p class="mes-name">{{ m2.title }}</p>
                  <button
                    type="button"
                    class="strelka"
                    @click="mesyacStart += 1"
                  >
                    ›
                  </button>
                </div>
                <div class="dni-zag">
                  <span v-for="w in dniNedeli" :key="w">{{ w }}</span>
                </div>
                <div class="dni-grid">
                  <button
                    v-for="c in m2.cells"
                    :key="c.k"
                    type="button"
                    class="den"
                    :class="{ off: !c.d, vybran: c.txt && c.txt === tempTuda }"
                    :disabled="!c.d"
                    @click="pickDay(c)"
                  >
                    {{ c.d || "" }}
                  </button>
                </div>
              </div>
            </div>

            <div class="kal-niz">
              <p class="kal-podskaz">{{ tempTuda || t.pickDepartHint }}</p>
              <button type="button" class="kal-ok" @click="applyDates">
                {{ t.apply }}
              </button>
            </div>
          </div>
        </div>

        <div class="pole-box">
          <button type="button" class="pole" @click="openMenu('obratno')">
            <span class="metka">{{ t.returnLabel }}</span>
            <span class="znach">{{ dataObratno || t.pickDate }}</span>
          </button>

          <div v-if="menu === 'obratno'" class="vypad vypad-kalendar">
            <div class="kal-verh">
              <div class="kal-tabs">
                <button
                  type="button"
                  class="kal-tab"
                  :class="{ on: rezhimDat === 'exact' }"
                  @click="rezhimDat = 'exact'"
                >
                  {{ t.exactDates }}
                </button>
                <span class="kal-line" />
                <button
                  type="button"
                  class="kal-tab"
                  :class="{ on: rezhimDat === 'flex' }"
                  @click="rezhimDat = 'flex'"
                >
                  {{ t.flexDates }}
                </button>
              </div>
              <button
                type="button"
                class="krest stat"
                aria-label="Закрыть"
                @click="closeMenu"
              >
                <img
                  src="/travelPulse/images/icon-close.png"
                  alt=""
                  width="22"
                  height="22"
                />
              </button>
            </div>

            <div class="kal-tip-row">
              <button
                type="button"
                class="kal-tip"
                @click="
                  tipPoezdki = tipPoezdki === 'round' ? 'oneway' : 'round'
                "
              >
                <span>{{
                  tipPoezdki === "round" ? t.roundTrip : t.oneWay
                }}</span>
                <span>▾</span>
              </button>
            </div>

            <div class="kal-mesyacy">
              <div class="mes-box">
                <div class="mes-head">
                  <button
                    type="button"
                    class="strelka"
                    @click="mesyacStart -= 1"
                  >
                    ‹
                  </button>
                  <p class="mes-name">{{ m1.title }}</p>
                  <span class="pusto" />
                </div>
                <div class="dni-zag">
                  <span v-for="w in dniNedeli" :key="w">{{ w }}</span>
                </div>
                <div class="dni-grid">
                  <button
                    v-for="c in m1.cells"
                    :key="c.k"
                    type="button"
                    class="den"
                    :class="{
                      off: !c.d,
                      vybran: c.txt && c.txt === tempObratno,
                    }"
                    :disabled="!c.d"
                    @click="pickDay(c)"
                  >
                    {{ c.d || "" }}
                  </button>
                </div>
              </div>

              <div class="mes-box">
                <div class="mes-head">
                  <span class="pusto" />
                  <p class="mes-name">{{ m2.title }}</p>
                  <button
                    type="button"
                    class="strelka"
                    @click="mesyacStart += 1"
                  >
                    ›
                  </button>
                </div>
                <div class="dni-zag">
                  <span v-for="w in dniNedeli" :key="w">{{ w }}</span>
                </div>
                <div class="dni-grid">
                  <button
                    v-for="c in m2.cells"
                    :key="c.k"
                    type="button"
                    class="den"
                    :class="{
                      off: !c.d,
                      vybran: c.txt && c.txt === tempObratno,
                    }"
                    :disabled="!c.d"
                    @click="pickDay(c)"
                  >
                    {{ c.d || "" }}
                  </button>
                </div>
              </div>
            </div>

            <div class="kal-niz">
              <p class="kal-podskaz">{{ tempObratno || t.pickDepartHint }}</p>
              <button type="button" class="kal-ok" @click="applyDates">
                {{ t.apply }}
              </button>
            </div>
          </div>
        </div>

        <div class="pole-box">
          <button type="button" class="pole" @click="openMenu('ludi')">
            <span class="metka">{{ t.travelersLabel }}</span>
            <span class="znach">{{ ludiText }}</span>
          </button>

          <div v-if="menu === 'ludi'" class="vypad vypad-ludi">
            <button
              type="button"
              class="krest"
              aria-label="Закрыть"
              @click="closeMenu"
            >
              <img
                src="/travelPulse/images/icon-close.png"
                alt=""
                width="22"
                height="22"
              />
            </button>

            <div class="ludi-row">
              <div>
                <p class="ludi-name">{{ t.adults }}</p>
                <p class="ludi-sub">{{ t.adultsAge }}</p>
              </div>
              <div class="schet">
                <button
                  type="button"
                  class="pm"
                  @click="vzroslye = Math.max(1, vzroslye - 1)"
                >
                  -
                </button>
                <span class="cifra">{{ vzroslye }}</span>
                <button
                  type="button"
                  class="pm"
                  @click="vzroslye = Math.min(9, vzroslye + 1)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="ludi-row">
              <div>
                <p class="ludi-name">{{ t.children }}</p>
                <p class="ludi-sub">{{ t.childrenAge }}</p>
              </div>
              <div class="schet">
                <button
                  type="button"
                  class="pm"
                  @click="deti = Math.max(0, deti - 1)"
                >
                  -
                </button>
                <span class="cifra">{{ deti }}</span>
                <button
                  type="button"
                  class="pm"
                  @click="deti = Math.min(9, deti + 1)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="pole-box">
          <button type="button" class="pole" @click="openMenu('klass')">
            <span class="metka">{{ t.classLabel }}</span>
            <span class="znach">{{ klassText }}</span>
          </button>

          <div v-if="menu === 'klass'" class="vypad vypad-klass">
            <button
              type="button"
              class="krest"
              aria-label="Закрыть"
              @click="closeMenu"
            >
              <img
                src="/travelPulse/images/icon-close.png"
                alt=""
                width="22"
                height="22"
              />
            </button>
            <p class="klass-zag">{{ t.cabinTitle }}</p>
            <ul class="klass-list">
              <li v-for="(opt, idx) in t.cabinOptions" :key="opt">
                <button
                  type="button"
                  class="klass-opt"
                  :class="{ on: klassIndex === idx }"
                  @click="
                    klassIndex = idx;
                    closeMenu();
                  "
                >
                  {{ opt }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button type="button" class="btn-poisk" @click="closeMenu">
          {{ t.searchBtn }}
        </button>
      </div>

      <!-- мобилная форма поиска по макету 428px -->
      <div class="mob-forma">
        <button type="button" class="mob-otkuda" @click="openMenu('otkuda')">
          <span>{{ mobOtkuda }}</span>
          <span class="mob-galka">▾</span>
        </button>

        <div class="mob-kuda">
          <img
            src="/travelPulse/images/icon-pointer.png"
            alt=""
            width="21"
            height="21"
          />
          <input
            v-model="kuda"
            type="text"
            class="mob-vvod"
            :placeholder="t.toPlaceholderMob"
          />
        </div>

        <div class="mob-setka">
          <button type="button" class="mob-knopka" @click="openMenu('tuda')">
            <svg
              class="mob-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{{ dataTuda || t.pickDateMob }}</span>
          </button>

          <button type="button" class="mob-knopka" @click="openMenu('obratno')">
            <svg
              class="mob-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 15" />
            </svg>
            <span>{{ dataObratno || t.nightsMob }}</span>
          </button>

          <button type="button" class="mob-knopka" @click="openMenu('ludi')">
            <svg
              class="mob-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            <span>{{ vzroslye + deti > 1 ? ludiText : t.peopleMob }}</span>
          </button>

          <button type="button" class="mob-knopka" @click="openMenu('klass')">
            <img
              src="/travelPulse/images/icon-airplane-sm.png"
              alt=""
              class="mob-svg"
              width="21"
              height="21"
            />
            <span>{{ klassIndex > 0 ? klassText : t.classMob }}</span>
          </button>
        </div>

        <button type="button" class="mob-btn-poisk" @click="closeMenu">
          {{ t.searchBtnMob }}
        </button>

        <!-- общие выпадашки для мобилки -->
        <div v-if="menu === 'otkuda'" class="mob-drop">
          <button
            type="button"
            class="krest"
            aria-label="Закрыть"
            @click="closeMenu"
          >
            <img
              src="/travelPulse/images/icon-close.png"
              alt=""
              width="22"
              height="22"
            />
          </button>
          <ul class="spisok-gorodov">
            <li v-for="g in goroda" :key="g.name">
              <button
                type="button"
                class="gorod-btn"
                @click="pickGorod(g.name)"
              >
                <img
                  :src="g.icon"
                  alt=""
                  :width="22"
                  :height="22"
                  class="gorod-ico"
                />
                <span class="gorod-txt">
                  <span class="gorod-name">{{ g.name }}</span>
                  <span class="gorod-sub">{{ g.sub }}</span>
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div v-if="menu === 'tuda' || menu === 'obratno'" class="mob-drop">
          <div class="kal-verh">
            <div class="kal-tabs">
              <button
                type="button"
                class="kal-tab"
                :class="{ on: rezhimDat === 'exact' }"
                @click="rezhimDat = 'exact'"
              >
                {{ t.exactDates }}
              </button>
              <span class="kal-line" />
              <button
                type="button"
                class="kal-tab"
                :class="{ on: rezhimDat === 'flex' }"
                @click="rezhimDat = 'flex'"
              >
                {{ t.flexDates }}
              </button>
            </div>
            <button
              type="button"
              class="krest stat"
              aria-label="Закрыть"
              @click="closeMenu"
            >
              <img
                src="/travelPulse/images/icon-close.png"
                alt=""
                width="22"
                height="22"
              />
            </button>
          </div>

          <div class="mes-box">
            <div class="mes-head">
              <button type="button" class="strelka" @click="mesyacStart -= 1">
                ‹
              </button>
              <p class="mes-name">{{ m1.title }}</p>
              <button type="button" class="strelka" @click="mesyacStart += 1">
                ›
              </button>
            </div>
            <div class="dni-zag">
              <span v-for="w in dniNedeli" :key="w">{{ w }}</span>
            </div>
            <div class="dni-grid">
              <button
                v-for="c in m1.cells"
                :key="c.k"
                type="button"
                class="den"
                :class="{
                  off: !c.d,
                  vybran:
                    c.txt && (c.txt === tempTuda || c.txt === tempObratno),
                }"
                :disabled="!c.d"
                @click="pickDay(c)"
              >
                {{ c.d || "" }}
              </button>
            </div>
          </div>

          <div class="kal-niz">
            <button
              type="button"
              class="kal-ok"
              style="width: 100%"
              @click="applyDates"
            >
              {{ t.apply }}
            </button>
          </div>
        </div>

        <div v-if="menu === 'ludi'" class="mob-drop">
          <button
            type="button"
            class="krest"
            aria-label="Закрыть"
            @click="closeMenu"
          >
            <img
              src="/travelPulse/images/icon-close.png"
              alt=""
              width="22"
              height="22"
            />
          </button>
          <div class="ludi-row">
            <div>
              <p class="ludi-name">{{ t.adults }}</p>
              <p class="ludi-sub">{{ t.adultsAge }}</p>
            </div>
            <div class="schet">
              <button
                type="button"
                class="pm"
                @click="vzroslye = Math.max(1, vzroslye - 1)"
              >
                -
              </button>
              <span class="cifra">{{ vzroslye }}</span>
              <button
                type="button"
                class="pm"
                @click="vzroslye = Math.min(9, vzroslye + 1)"
              >
                +
              </button>
            </div>
          </div>
          <div class="ludi-row" style="margin-top: 14px">
            <div>
              <p class="ludi-name">{{ t.children }}</p>
              <p class="ludi-sub">{{ t.childrenAge }}</p>
            </div>
            <div class="schet">
              <button
                type="button"
                class="pm"
                @click="deti = Math.max(0, deti - 1)"
              >
                -
              </button>
              <span class="cifra">{{ deti }}</span>
              <button
                type="button"
                class="pm"
                @click="deti = Math.min(9, deti + 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div v-if="menu === 'klass'" class="mob-drop">
          <button
            type="button"
            class="krest"
            aria-label="Закрыть"
            @click="closeMenu"
          >
            <img
              src="/travelPulse/images/icon-close.png"
              alt=""
              width="22"
              height="22"
            />
          </button>
          <p class="klass-zag">{{ t.cabinTitle }}</p>
          <ul class="klass-list">
            <li v-for="(opt, idx) in t.cabinOptions" :key="opt">
              <button
                type="button"
                class="klass-opt"
                :class="{ on: klassIndex === idx }"
                @click="
                  klassIndex = idx;
                  closeMenu();
                "
              >
                {{ opt }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="~/assets/styles/poisk.css"></style>
