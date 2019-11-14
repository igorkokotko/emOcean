<template>
  <ul>
    <li
      v-for="(item, index) in routeItems"
      :key="index"
    >
      <router-link :to="item.to">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SettingsMenu',
  data: function () {
    return {
      routeItems: [
        { to: '/settings/editProfile', title: 'User profile', show: true },
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

<style scoped>
ul {
  list-style: none;
  padding-inline-start: 0;
  width: 200px;
}

li {
  border: 1px solid;
}
</style>
