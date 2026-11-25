<script setup lang="ts">
const { step, openAuth, closeAuth } = useAuthModal();
const { t } = useLang();

const remember = ref(false);
const acceptTerms = ref(false);
const email = ref("");
const pass = ref("");
const firstName = ref("");
const lastName = ref("");
const confirmPass = ref("");

function submitLogin() {
  closeAuth();
}

function submitReg() {
  closeAuth();
}
</script>

<template>
  <!-- модалка входа и регисрации -->
  <div v-if="step" id="auth-okno" class="fon-okna" @click.self="closeAuth">
    <!-- шаг 1 выбор способа входа frame 8 -->
    <div v-if="step === 'choice'" class="okno okno-vybor">
      <button
        type="button"
        class="zakryt"
        aria-label="Закрыть"
        @click="closeAuth"
      >
        <img src="./images/icon-x.png" alt="" width="28" height="28" />
      </button>

      <div class="okno-logo">
        <img
          src="./images/logo-big.png"
          alt="TravelPulse"
          class="logo-img"
          width="116"
          height="116"
        />
        <p class="logo-text">TravelPulse</p>
      </div>

      <h2 class="okno-zag">{{ t.authTitle }}</h2>

      <div class="knopki-vhoda">
        <button type="button" class="btn-seraya" @click="openAuth('login')">
          <span>{{ t.authEmailBtn }}</span>
        </button>

        <button type="button" class="btn-seraya btn-soc" @click="closeAuth">
          <img src="./images/icon-fb.png" alt="" width="26" height="26" />
          <span>Facebook</span>
        </button>

        <button type="button" class="btn-seraya btn-soc" @click="closeAuth">
          <img src="./images/icon-google.png" alt="" width="28" height="26" />
          <span>Google</span>
        </button>

        <button type="button" class="btn-seraya btn-soc" @click="closeAuth">
          <img src="./images/icon-apple.png" alt="" width="27" height="27" />
          <span>Apple</span>
        </button>
      </div>

      <label class="galochka">
        <input v-model="remember" type="checkbox" class="chek" />
        <span>{{ t.rememberMe }}</span>
      </label>

      <p class="pravila">{{ t.authLegal }}</p>
    </div>

    <!-- шаг 2 вход по почте frame 13 -->
    <form
      v-else-if="step === 'login'"
      class="okno okno-forma"
      @submit.prevent="submitLogin"
    >
      <button
        type="button"
        class="zakryt"
        aria-label="Закрыть"
        @click="closeAuth"
      >
        <img src="./images/icon-x.png" alt="" width="28" height="28" />
      </button>

      <div class="okno-logo">
        <img
          src="./images/logo-big.png"
          alt="TravelPulse"
          class="logo-img"
          width="118"
          height="118"
        />
        <p class="logo-text">TravelPulse</p>
      </div>

      <h2 class="okno-zag centr">{{ t.loginTitle }}</h2>

      <div class="polya">
        <div class="ramka-polya">
          <input
            v-model="email"
            type="email"
            class="vvod"
            :placeholder="t.emailPh"
            required
          />
        </div>

        <div class="ramka-polya">
          <input
            v-model="pass"
            type="password"
            class="vvod"
            :placeholder="t.passPh"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn-otpravit">{{ t.loginSubmit }}</button>

      <label class="galochka v-forme">
        <input v-model="remember" type="checkbox" class="chek" />
        <span>{{ t.rememberMe }}</span>
      </label>

      <button type="button" class="ssylka-reg" @click="openAuth('register')">
        {{ t.noAccount }}
      </button>
    </form>

    <!-- шаг 3 регистрация frame 14 -->
    <form
      v-else-if="step === 'register'"
      class="okno okno-forma"
      @submit.prevent="submitReg"
    >
      <button
        type="button"
        class="zakryt"
        aria-label="Закрыть"
        @click="closeAuth"
      >
        <img src="./images/icon-x.png" alt="" width="28" height="28" />
      </button>

      <div class="okno-logo">
        <img
          src="./images/logo-big.png"
          alt="TravelPulse"
          class="logo-img"
          width="118"
          height="118"
        />
        <p class="logo-text">TravelPulse</p>
      </div>

      <h2 class="okno-zag centr">{{ t.regTitle }}</h2>

      <div class="polya">
        <div class="ramka-polya">
          <input
            v-model="firstName"
            type="text"
            class="vvod"
            :placeholder="t.firstNamePh"
            required
          />
        </div>

        <div class="ramka-polya">
          <input
            v-model="lastName"
            type="text"
            class="vvod"
            :placeholder="t.lastNamePh"
            required
          />
        </div>

        <div class="ramka-polya">
          <input
            v-model="email"
            type="email"
            class="vvod"
            :placeholder="t.emailPh"
            required
          />
        </div>

        <div class="ramka-polya">
          <input
            v-model="pass"
            type="password"
            class="vvod"
            :placeholder="t.passPh"
            required
          />
        </div>

        <div class="ramka-polya">
          <input
            v-model="confirmPass"
            type="password"
            class="vvod"
            :placeholder="t.confirmPassPh"
            required
          />
        </div>
      </div>

      <label class="galochka v-forme malaya">
        <input v-model="acceptTerms" type="checkbox" class="chek" required />
        <span>{{ t.acceptTerms }}</span>
      </label>

      <button type="submit" class="btn-otpravit">{{ t.regSubmit }}</button>
    </form>
  </div>
</template>

<style scoped src="~/assets/styles/okno.css"></style>
