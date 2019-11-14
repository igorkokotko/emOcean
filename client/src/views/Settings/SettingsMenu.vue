<template>
  <div>
    <q-card class="my-card q-ma-sm">
      <q-splitter
        v-model="splitterModel"
        :[attrPosition]="true"
        style="height: 250px"
      >
        <template v-slot:before>
          <q-tabs v-model="tab"
            :[attrPosition]="true"
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
          <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
            <q-tab-panel v-for="(item, index) in routeItems" :key="index" name="{item.title}">
              <router-view></router-view>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'settings-menu',
  data: function () {
    return {
      tab: 'mail',
      windowWidth: 0,
      attrPosition: '',
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
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
    })
  },
  methods: {
    position () {
      if (window.innerWidth >= 599) {
        this.attrPosition = 'vertical'
      } else {
        this.attrPosition = 'horizontal'
      }
    },
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
      this.position()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
