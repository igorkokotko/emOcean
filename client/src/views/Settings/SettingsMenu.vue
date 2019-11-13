<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 250px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-route-tab
            v-for="(item, index) in routeItems"
            :key="index"
            :to="item.to"
            name="{item.title}"
            exact
          >{{item.title}}</q-route-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
          v-for="(item, index) in routeItems"
          :key="index"
          name="{item.title}">
            <!-- <div class="text-h4 q-mb-md">{{item.title}}</div> -->
            <router-view></router-view>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>

</template>

<script>
export default {
  name: 'settings-menu',
  data: function () {
    return {
      tab: 'mails',
      splitterModel: 20,
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
  },
  methods: {
    activate: function () {
      this.isActive = !this.isActive
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
