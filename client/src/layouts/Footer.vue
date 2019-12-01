<template>
  <div>
    <q-footer>
      <q-tabs>
        <q-tab name="feed">
          <router-link to="/Feed">
            <q-icon name="videocam" size="1.5em"/>
          </router-link>
        </q-tab>
        <q-tab name="add">
          <router-link to="/AddPost">
            <q-icon name="add_circle_outline" size="1.5em" />
          </router-link>
        </q-tab>
        <q-tab name="notifications">
          <router-link to="/">
            <q-icon name="notifications" size="1.5em" />
          </router-link>
        </q-tab>
        <q-tab name="profile">
          <router-link to="/profile">
            <q-icon name="tag_faces" size="1.5em" />
          </router-link>
        </q-tab>
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
  background: #00BCD4;
  .q-icon {
    color: #fff;
  }
}
@media screen and (min-width: 700px){
  .q-footer {
    display:none;
  }
}
</style>
