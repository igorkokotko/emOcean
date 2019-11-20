<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>General</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Accounts you follow</q-item-label>
          <q-item-label caption>
            Manage followings
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
          <q-toggle color="teal" v-model="comment" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Like post</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="teal" v-model="like" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Reply</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="teal" v-model="reply" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Video uploaded</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="teal" v-model="uploadPost" />
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
          <q-toggle color="blue" v-model="hideOffencive" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'EditPrivacy',
  data () {
    return {
      comment: true,
      like: true,
      reply: true,
      uploadPost: true,
      hideOffencive: false
    }
  }
}
</script>
