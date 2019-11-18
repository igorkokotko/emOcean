<template>
    <div>
      <div>
        <q-tabs
          v-model="tab"
          class="text-white  inline-label shadow-2"
        >
            <q-route-tab to="/MyVideos" name="mails" icon="movie"/>
            <q-route-tab to="/LikedVideos" name="alarms" icon="alarm"/>
            <q-route-tab to="/SavedVideos" name="movies" icon="movie" />
        </q-tabs>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .q-tabs {
    background-color: purple;
    font-family: "Roboto Slab", "Times New Roman", serif;;
  }

  .q-tab__icon {
    font-size: 22px;
  }

</style>
