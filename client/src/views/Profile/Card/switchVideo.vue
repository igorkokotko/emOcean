<template>
<div>
  <q-tabs
    v-model="tab"
    class="text-white  inline-label shadow-2"
  >
    <q-tab name="my-videos">
      <i class="far fa-play-circle"></i>
    </q-tab>
    <q-tab name="liked-videos">
      <i class="far fa-heart"></i>
    </q-tab>
    <q-tab name="saved-videos">
      <i class="far fa-bookmark"></i>
    </q-tab>
  </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
      class="bg-purple text-white text-center"
    >
      <q-tab-panel name="my-videos">
        <div class="text-h6">
          My videos
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="liked-videos">
        <div class="text-h6">Liked videos</div>
        Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
      </q-tab-panel>
      <q-tab-panel name="saved-videos">
        <div class="text-h6">Saved videos</div>
        Nostrum necessitatibus expedita dolores? Voluptatem repudiandae magni ea.
      </q-tab-panel>
    </q-tab-panels>
</div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'my-videos'
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-tabs {
    background: linear-gradient(45deg, blue, #F05924);
    font-family: "Roboto Slab", "Times New Roman", serif;
  }
  .far {
    font-size: 19px;
    color: white;
  }
</style>
