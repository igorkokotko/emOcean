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
            <avatar :img="photoUrl" />
          </template>
          <template v-else>
            <edit-image
              :src="photoUrl"
              class="avatar"
            />
          </template>
          <div class="row justify-center">
            <q-input
              @input="uploadAvatar"
              type="file"
              class="inputFile"
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
            <img src="" />
          </template>
          <template v-else>
            <edit-image
              :src="backgroundUrl"
              :aspectRatio="16 / 9"
            />
          </template>
          <div class="row justify-center">
            <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
            <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
            <span class="docs-tooltip" data-toggle="tooltip" title="Import image with Blob URLs">
              <span class="fa fa-upload"></span>
            </span>
          </label>
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
  checkUserDescriptionField
} from '@/utilities/validation.js'

export default {
  components: {
    Avatar,
    EditImage
  },

  data () {
    return {
      photoUrl: '',
      backgroundUrl: '',
      profile: {
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
    uploadAvatar (val) {
      this.profile.avatar_url = val[0]
      this.photoUrl = URL.createObjectURL(val[0])
    },

    uploadBackgroundUrl (val) {
      console.log(val)
      this.profile.user_background = val.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.backgroundUrl = reader.result
      }
      reader.readAsDataURL(val.target.files[0])
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
  max-width: 300px;
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
</style>
