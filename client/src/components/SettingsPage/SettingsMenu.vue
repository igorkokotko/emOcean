<template>
  <ul>
    <li><router-link to='/settings/editUserInfo/'>User info</router-link></li>
    <li><router-link to='/settings/editPreferences'>Preferences</router-link></li>
    <li><router-link to='/settings/editFollowers'>Followers</router-link></li>
    <li><router-link to='/settings/editSaved'>Saved</router-link></li>
    <li><router-link to='/settings/editLiked'>Liked</router-link></li>
    <li><router-link to='/settings/editPrivacy'>Privacy</router-link></li>
    <li><router-link to='/settings/editPassword'>Change password</router-link></li>
    <li><router-link to='/settings/deleteAccount'>Delete account</router-link></li>
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
