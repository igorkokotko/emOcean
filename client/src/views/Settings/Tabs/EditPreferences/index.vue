<template>
  <div>
    <q-btn
      round
      v-for="(preference, index) in preferences" :key="index">
      <q-avatar size="42px">
        <img :src="preference.src">
      </q-avatar>
    </q-btn>
    <img src="@/assets/preferences/animals.jpg">
  </div>
</template>

<script>
export default {
  name: 'EditPreferences',
  data () {
    return {
      preferences: [
        { src: '@/assets/preferences/animals.jpg', title: 'animals' }
        // {src='@/assets/preferences/cinema.jpg', title='cinema'},
        // {src='@/assets/preferences/culinary.jpg', title='culinary'},
        // {src='@/assets/preferences/dance.jpg', title='dance'},
        // {src='@/assets/preferences/extreme.jpg', title='extreme'},
        // {src='@/assets/preferences/game.jpg', title='game'},
        // {src='@/assets/preferences/health.jpg', title='health'},
        // {src='@/assets/preferences/learn.jpg', title='learn'},
        // {src='@/assets/preferences/nature.jpg', title='nature'},
        // {src='@/assets/preferences/prank.jpg', title='prank'},
        // {src='@/assets/preferences/science.jpg', title='science'},
        // {src='@/assets/preferences/sport.jpg', title='sport'},
        // {src='@/assets/preferences/travel.jpg', title='travel'}
      ]
    }
  }
}
</script>
