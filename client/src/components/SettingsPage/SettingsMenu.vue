<template>
  <ul>
    <li><router-link to='/settings/editUserInfo/'>User info</router-link></li>
    <li><router-link to='/settings/editPreferences'>Preferences</router-link></li>
    <li>Followers</li>
    <li>Followings</li>
    <li>Savings</li>
    <li>Liked</li>
    <li>Privacy</li>
    <li>Change password</li>
    <li>Delete account</li>
  </ul>
</template>

<script>
export default {
  name: 'settings-menu'
}
</script>

<style>
  ul {
    list-style: none;
    padding-inline-start: 0;
    width: 200px;
  }

  li {
    border: 1px solid;
  }

</style>
