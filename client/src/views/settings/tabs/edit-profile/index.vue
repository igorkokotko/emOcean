<template>
  <q-page class="q-pa-lg">
    <q-form
      class="q-gutter-md"
    >
      <div>
        <q-avatar
          size="100px"
          font-size="100px"
          color="primary"
          text-color="white"
          :icon="photoUrl ? null : 'account_circle'"
        >
          <img :src="photoUrl">
        </q-avatar>
        <q-input
          @input="uploadAvatar"
          type="file"
          class="inputFile"
      />
      </div>
      <q-input
        label="Name"
        placeholder="Add your name"
        v-model="profile.name"
        :rules="[val => val.length <=30 || 'Please use maximum 30 characters']"
      />
      <q-input
        label="Username"
        placeholder="Add your username"
        v-model="profile.username"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length <=30 || 'Please use maximum 30 characters'
        ]"
      />
      <q-input
        label="Bio" type="textarea"
        placeholder="Add a bio to your profile"
        v-model="profile.bio"
        autogrow
        counter
        :rules="[val => val.length <= 100 || 'Please use maximum 100 characters']"
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
        v-model="profile.socialMedia.youTube"
        type="url"
      />
      <q-input
        label="Instagram"
        placeholder="Add Instagram link to your profile"
        v-model="profile.socialMedia.instagram"
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
const suggestedInterests = ['nature', 'IT', 'innovation', 'tourism', 'music']

export default {
  data () {
    return {
      filterOptions: suggestedInterests,
      photoUrl: '',
      profile: {
        name: 'Bohdan Gavrylyshyn',
        username: 'Dreamer',
        bio: 'I have big dreams',
        avatarUrl: null,
        interests: null,
        socialMedia: {
          youTube: '',
          instagram: ''
        }
      }
    }
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
      this.profile.avatarUrl = val[0]
      this.photoUrl = URL.createObjectURL(val[0])
    }
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
</style>

<style>
.inputFile .q-field__control:before, .q-field__control:after {
  content: none;
}
</style>
