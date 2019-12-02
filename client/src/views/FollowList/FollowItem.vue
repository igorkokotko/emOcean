<template>
  <q-list class="follow-list">
    <q-item
      v-for="followItem in follow"
      :key="followItem.id"
      class="q-my-sm"
      clickable
    >
      <q-item-section avatar>
        <avatar
          class="follow-avatar"
          :img="followItem.avatar"
          :size="30"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label class="name">
          <strong>{{ followItem.name }} </strong>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <FollowButton class="follow-btn"></FollowButton>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import FollowButton from '../Profile/Card/followBtn'
import Avatar from '../../components/Avatar'
export default {
  components: {
    FollowButton,
    Avatar
  },
  props: {
    follow: Array
  }
}
</script>

<style lang="scss">
  .follow-list {
    .q-item__section {
      .follow-avatar {
        @media only screen and (min-width: 768px) {
          font-size: 70px;
        }
      }
      .follow-btn {
        .profile-card-button {
          @media only screen and (max-width: 767px) {
            min-width: 80px;
            padding: 2px 15px;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
