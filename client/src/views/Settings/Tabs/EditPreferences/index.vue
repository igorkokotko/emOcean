<template>
  <div>
    <q-btn
      round
      size="50px"
      v-for="(preference, index) in preferences" :key="index">
      <q-avatar size="150px">
        <img :src="preference.src">
      </q-avatar>
    </q-btn>
  </div>
</template>

<script>

export default {
  name: 'EditPreferences',
  data () {
    return {
      preferences: [
        { src: '/preferences/animals.jpg', title: 'animals' },
        { src: '/preferences/cinema.jpg', title: 'cinema' },
        { src: '/preferences/culinary.jpg', title: 'culinary' },
        { src: '/preferences/dance.jpg', title: 'dance' },
        { src: '/preferences/extreme.jpg', title: 'extreme' },
        { src: '/preferences/game.jpg', title: 'game' },
        { src: '/preferences/health.jpg', title: 'health' },
        { src: '/preferences/learn.jpg', title: 'learn' },
        { src: '/preferences/nature.jpg', title: 'nature' },
        { src: '/preferences/prank.jpg', title: 'prank' },
        { src: '/preferences/science.jpg', title: 'science' },
        { src: '/preferences/sport.jpg', title: 'sport' },
        { src: '/preferences/travel.jpg', title: 'travel' }
      ]
    }
  }
}
</script>
