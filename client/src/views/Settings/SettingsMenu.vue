<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 350px" class="shadow-2 rounded-borders">
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple v-for="(item, index) in routeItems" :key='index'>
                <router-link class="black-color" :to="item.to">{{item.title}}</router-link>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'settings-menu',
  data: function () {
    return {
      drawer: false,
      routeItems: [
        { to: '/settings/editProfile', title: 'Edit profile', show: true },
        { to: '/settings/editPreferences', title: 'Preferences', show: true },
        { to: '/settings/editFollowers', title: 'Followers', show: true },
        { to: '/settings/editSaved', title: 'Saved', show: true },
        { to: '/settings/editLiked', title: 'Liked', show: true },
        { to: '/settings/editPrivacy', title: 'Privacy', show: true },
        { to: '/settings/changePassword', title: 'Change password', show: true },
        { to: '/settings/deleteAccount', title: 'Delete account', show: true }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.menu-list .q-item {
  border-radius: 0 32px 32px 0;
  margin: 0 15px 0 0;
}
.black-color{
  color: black;
}
.q-item a:link {
  text-decoration: none;
}

</style>
