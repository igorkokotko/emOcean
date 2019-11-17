<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>General</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Accounts you follow</q-item-label>
          <q-item-label caption>
            Add or delete followings users
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Blocked accounts</q-item-label>
          <q-item-label caption>
            Block and unblock user accounts
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item-label header>Notifications</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Comment to video</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="notif1" val="battery" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Comment to comment</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="green" v-model="notif2" val="friend" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Video uploaded</q-item-label>
          <q-item-label caption>Allow notification when uploading video</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="red" v-model="notif3" val="picture" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Filters</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Hide offensive comments</q-item-label>
          <q-item-label caption>Hide comments</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="notif1" val="battery" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'EditPrivacy'
}
</script>
