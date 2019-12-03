<template>
  <q-page>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Avatar</div>
        </q-card-section>
        <q-card-section>
          <template v-if="photoUrl===''">
            <div class="row justify-center">
              <avatar :img="photoUrl" />
            </div>
          </template>
          <template v-else>
            <edit-image
              :src="photoUrl"
              class="avatar"
            />
          </template>
          <div class="row justify-center q-mt-sm">
            <label
              for="inputAvatar"
              ref="photoUrlLabel"
            >
              <input
                ref="avatar"
                type="file"
                id="inputAvatar"
                accept="image/*"
                @input="uploadPhotoUrl"
                class="uploadImage"
              >
              <q-btn
                round
                color="secondary"
                icon="cloud_upload"
                @click="btnUploadPhotoUrl"
                class="q-mr-md"
              />
            </label>
            <q-btn
              round
              color="negative"
              icon="delete"
              @click="deletePhotoUrl"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Cover photo</div>
        </q-card-section>
        <q-card-section>
          <template v-if="backgroundUrl===''">
            <div class="row justify-center">
              <img
                src="@/assets/img/cover_photo.jpg"
                class="coverPhoto"
              />
            </div>
          </template>
          <template v-else>
            <edit-image
              class="backgroundImage"
              :src="backgroundUrl"
              :aspectRatio="16 / 9"
            />
          </template>
          <div class="row justify-center q-mt-sm">
            <label
              for="inputImage"
              ref="backgroundUrlLabel"
            >
              <input
                ref="background"
                type="file"
                id="inputImage"
                accept="image/*"
                @input="uploadBackgroundUrl"
                class="uploadImage"
              >
              <q-btn
                round
                color="secondary"
                icon="cloud_upload"
                @click="btnUploadBackgroundUrl"
                class="q-mr-md"
              />
            </label>
            <q-btn
              round
              color="negative"
              icon="delete"
              @click="deleteBackgroundUrl"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card q-pb-md">
        <q-card-section>
          <div class="text-h6">Personal info</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="Username"
            placeholder="Add your username"
            v-model="profile.nickname"
            :rules="[requiredField, checkNicknameField]"
            lazy-rules
          />
          <q-input
            label="Bio"
            type="textarea"
            placeholder="Add a bio to your profile"
            v-model="profile.bio"
            autogrow
            counter
            :rules="[checkUserDescriptionField]"
            lazy-rules
          />
          <q-input
            label="Status"
            type="textarea"
            placeholder="Add a status to your profile"
            v-model="profile.status"
            autogrow
            counter
            :rules="[checkUserDescriptionField]"
            lazy-rules
          />
        </q-card-section>
      </q-card>

      <q-card class="my-card q-pb-sm">
        <q-card-section>
          <div class="text-h6">Social medias</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="YouTube"
            placeholder="Add YouTube link to your profile"
            v-model="profile.socialAccounts.youtube"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-youtube youtube" />
            </template>
          </q-input>
          <q-input
            label="Instagram"
            placeholder="Add Instagram link to your profile"
            v-model="profile.socialAccounts.instagram"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-instagram instagram" />
            </template>
          </q-input>
          <q-input
            label="Facebook"
            placeholder="Add Facebook link to your profile"
            v-model="profile.socialAccounts.facebook"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-facebook-f facebook" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <div class="q-pt-md">
        <q-btn
          label="Edit profile"
          type="submit"
          rounded
          color="secondary"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="secondary"
          flat
          class="q-ml-sm"
        />
      </div>

    </q-form>
  </q-page>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import EditImage from './EditImage.vue'
import {
  requiredField,
  checkNicknameField,
  checkUserDescriptionField,
  checkURL
} from '@/utilities/validation.js'
import authService from '@/services/auth.js'

export default {
  components: {
    Avatar,
    EditImage
  },

  data () {
    const emptyProfile = {
      nickname: '',
      bio: '',
      status: '',
      avatar_url: null,
      user_background: null,
      socialAccounts: {
        youtube: '',
        instagram: '',
        facebook: ''
      }
    }
    return {
      photoUrl: '',
      backgroundUrl: '',
      profile: { ...emptyProfile },
      emptyProfile,
      notifyParameters: {
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        timeout: 3000
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
    this.$store.dispatch('getProfile')
  },

  methods: {
    uploadPhotoUrl (val) {
      if (val.target.files[0].size > 2097152) {
        this.$q.notify({
          ...this.notifyParameters,
          color: 'negative',
          message: 'File is too big.'
        })
        this.$refs.avatar.val = ""
        return
      }
      this.profile.avatar_url = val.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.photoUrl = reader.result
      }
      reader.readAsDataURL(val.target.files[0])
    },

    btnUploadPhotoUrl () {
      this.$refs.photoUrlLabel.click()
    },

    deletePhotoUrl (val) {
      this.photoUrl = ""
    },

    uploadBackgroundUrl (val) {
      if (val.target.files[0].size > 2097152) {
        this.$q.notify({
          ...this.notifyParameters,
          color: 'negative',
          message: 'File is too big.'
        })
        this.$refs.background.val = ""
        return
      }
      this.profile.user_background = val.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.backgroundUrl = reader.result
      }
      reader.readAsDataURL(val.target.files[0])
    },

    btnUploadBackgroundUrl () {
      this.$refs.backgroundUrlLabel.click()
    },

    deleteBackgroundUrl (val) {
      this.backgroundUrl = ""
    },

    onSubmit () {
      const profile = { ...this.profile, socialAccounts: [] }
      Object.keys(this.profile.socialAccounts).forEach(item => {
        profile.socialAccounts.push({ type: item, link: this.profile.socialAccounts[item] })
      })
      if (!profile.interests) { profile.interests = [] }
      this.$store.dispatch('updateProfile', profile)
        .then(() => {
          this.$q.notify({
            ...this.notifyParameters,
            color: 'primary',
            message: 'Your profile was edited.'
          })
        })
        .catch(err => {
          this.$q.notify({
            ...this.notifyParameters,
            color: 'negative',
            message: err && err.response && err.response.data ? err.response.data.error : 'Unknown error.'
          })
        })
      const avatarFormData = new FormData()
      avatarFormData.append('file', this.profile.avatar_url)
      authService.uploadAvatar(avatarFormData)

      const coverPhotoFormData = new FormData()
      coverPhotoFormData.append('file', this.profile.user_background)
      authService.uploadBackground(coverPhotoFormData)
    },

    onReset () {
      this.loadDataFromStore()
    },

    loadDataFromStore () {
      const socialAccounts = {}
      if (this.profileGetter.socialAccounts) {
        this.profileGetter.socialAccounts.forEach(item => {
          socialAccounts[item.type] = item.link
        })
      }
      this.profile = { ...this.emptyProfile, ...this.profileGetter, socialAccounts }
      if (this.profile.avatar_url && JSON.stringify(this.profile.avatar_url) !== JSON.stringify({})) {
        this.photoUrl = this.profile.avatar_url
      }
      if (this.profile.user_background && JSON.stringify(this.profile.user_background) !== JSON.stringify({})) {
        this.backgroundUrl = this.profile.user_background
      }
    },

    requiredField,
    checkNicknameField,
    checkUserDescriptionField,
    checkURL
  }
}
</script>

<style scoped>
.q-avatar__content, .q-avatar img:not(.q-icon) {
  width: auto;
}

.coverPhoto {
  max-width: 500px;
}

.uploadImage {
  display: none;
}
</style>

<style>
.inputFile {
  display: none;
}

.inputFile .q-field__control:before, .q-field__control:after {
  content: none;
}

.avatar .cropper-view-box,
.avatar .cropper-face {
  border-radius: 50%;
}

.facebook {
  color: #3b5999;
}

.youtube {
  color: #FF0000;
}

.instagram {
  color: #e4405f;
}

.backgroundImage .vueCropperWrapper {
  max-width: 500px;
}
</style>
