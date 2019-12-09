<template>
  <div>
    <q-footer>
      <q-tabs>
        <router-link to="/Feed">
          <q-tab name="feed">
            <q-icon name="videocam" size="1.5em" />
          </q-tab>
        </router-link>
        <router-link to="/AddPost">
          <q-tab name="add">
            <q-icon name="add_circle_outline" size="1.5em" />
          </q-tab>
        </router-link>
        <router-link to="/">
          <q-tab name="notifications">
            <q-icon name="notifications" size="1.5em" />
          </q-tab>
        </router-link>
        <router-link to="/profile">
          <q-tab name="profile">
            <q-icon name="tag_faces" size="1.5em" />
          </q-tab>
        </router-link>
      </q-tabs>
    </q-footer>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}

.q-footer {
  background: #00bcd4;

  .q-icon {
    color: #fff;
  }
}

@media screen and (min-width: 700px) {
  .q-footer {
    display: none;
  }
}
</style>
