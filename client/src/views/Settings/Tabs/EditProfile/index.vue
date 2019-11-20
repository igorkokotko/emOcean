<template>
  <q-page class="q-pa-lg">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div>
        <avatar :img="photoUrl" />
        <q-input
          @input="uploadAvatar"
          type="file"
          class="inputFile"
        />
      </div>
      <div>
        <img
          :src="backgroundUrl"
          class="backgroundUrl"
        />
        <q-input
          @input="uploadBackgroundUrl"
          type="file"
          class="inputFile"
        />
      </div>
      <q-input
        label="Username"
        placeholder="Add your username"
        v-model="profile.nickname"
        :rules="[requiredField, checkNicknameField]"
      />
      <q-input
        label="Bio"
        type="textarea"
        placeholder="Add a bio to your profile"
        v-model="profile.bio"
        autogrow
        counter
        :rules="[checkUserDescriptionField]"
      />
      <q-input
        label="Status"
        type="textarea"
        placeholder="Add a status to your profile"
        v-model="profile.status"
        autogrow
        counter
        :rules="[checkUserDescriptionField]"
      />
      <q-select
        label="Interests"
        v-model="profile.interests"
        use-input
        use-chips
        multiple
        input-debounce="0"
        @new-value="createValue"
        :options="filterOptions"
        @filter="filterFn"
      />
      <q-input
        label="YouTube"
        placeholder="Add YouTube link to your profile"
        v-model="profile.socialAccounts.youtube"
        type="url"
      />
      <q-input
        label="Instagram"
        placeholder="Add Instagram link to your profile"
        v-model="profile.socialAccounts.instagram"
        type="url"
      />
      <q-input
        label="Facebook"
        placeholder="Add Facebook link to your profile"
        v-model="profile.socialAccounts.facebook"
        type="url"
      />
      <div class="q-pt-md">
        <q-btn label="Edit profile" type="submit" color="primary" no-caps/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" no-caps/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import {
  requiredField,
  checkNicknameField,
  checkUserDescriptionField
} from '@/utilities/validation.js'
const suggestedInterests = ['nature', 'IT', 'innovation', 'tourism', 'music', 'football', 'flowers']

export default {
  components: {
    Avatar
  },

  data () {
    return {
      filterOptions: suggestedInterests,
      photoUrl: '',
      backgroundUrl: '',
      profile: {
        nickname: '',
        bio: '',
        status: '',
        avatar_url: null,
        user_background: null,
        interests: null,
        socialAccounts: {
          youtube: '',
          instagram: '',
          facebook: ''
        }
      }
    }
  },

  computed: {
    profileGetter () {
      return this.$store.getters.profileGetter
    }
  },

  watch: {
    profileGetter (newValue) {
      this.loadDataFromStore()
    }
  },

  created () {
    this.$store.dispatch('uploadProfile')
  },

  methods: {
    createValue (val, done) {
      if (val.length > 2) {
        if (!suggestedInterests.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },

    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = suggestedInterests
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = suggestedInterests.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },

    uploadAvatar (val) {
      this.profile.avatar_url = val[0]
      this.photoUrl = URL.createObjectURL(val[0])
    },

    uploadBackgroundUrl (val) {
      this.profile.user_background = val[0]
      this.backgroundUrl = URL.createObjectURL(val[0])
    },

    onSubmit () {
      const profile = { ...this.profile, socialAccounts: [] }
      Object.keys(this.profile.socialAccounts).forEach(item => {
        profile.socialAccounts.push({ type: item, link: this.profile.socialAccounts[item] })
      })
      this.$store.commit('updateProfile', profile)
    },

    onReset () {
      this.loadDataFromStore()
    },

    loadDataFromStore () {
      const socialAccounts = {}
      this.profileGetter.socialAccounts.forEach(item => {
        socialAccounts[item.type] = item.link
      })
      this.profile = { ...this.profileGetter, socialAccounts }
      this.photoUrl = this.profile.avatar_url
      this.backgroundUrl = this.profile.user_background
    },

    requiredField,
    checkNicknameField,
    checkUserDescriptionField
  }
}
</script>

<style scoped>
.q-field--with-bottom {
  padding-bottom: 0;
}

.q-avatar__content, .q-avatar img:not(.q-icon) {
  width: auto;
}

.backgroundUrl {
  width: 260px;
}
</style>

<style>
.inputFile .q-field__control:before, .q-field__control:after {
  content: none;
}
</style>
