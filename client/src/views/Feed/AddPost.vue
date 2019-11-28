<template>
  <div class="add-post">
    <template>
        <div class="q-pa-md q-gutter-sm">
          <q-dialog
            v-model="dialog"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="bg-white text-black h-70" id="modal-window">
              <q-bar>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup></q-btn>
              </q-bar>
              <q-card-section>
                <div class="text-h6 text-center">Choose your video here</div>
              </q-card-section>
              <q-card-section>
                <label for="file" class="custom-file-upload">
                  <p>Choose Video</p>
                </label>
                <input ref="input" type="file"
                name="file"
                id="file"
                class="inputfile"
                @change="uploadImage"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
    </template>
        <div class="step-buttons">
            <a class="cancel-btn"
              @click="$router.push('/feed')">
                Cancel
            </a>
            <a class="share-btn"
            @click="addToFeed"
              >
                Share
            </a>
          </div>
        <div class="wrapper">
        <div class="adder-wrapper">
          <div class="selected-video">
      <video ref="video" width="480"  max-height="270" controls>
          <source
        :src="post.postVideo"
        type="video/mp4">
      <source
        :src="post.postVideo"
        type="video/ogg">
      <source
        :src="post.postVideo"
        type="video/webm">
        </video>
            </div>
          <div class="caption-container">
            <textarea ref="textarea" maxlength="128"
              placeholder="Write a caption..."
              type="text">
            </textarea>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AddPost',
  data () {
    return {
      dialog: true,
      display: 'block',
      post: {
        createdOn: new Date(),
        username: 'fullstack_vue',
        userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_lg_bg.png',
        postVideo: '',
        likes: 0,
        hasBeenLiked: false,
        caption: '',
        comments: []
      }
    }
  },
  methods: {
    ...mapActions('posts', ['addPost']),
    addToFeed () {
      this.post.caption = this.$refs.textarea.value
      this.addPost(this.post)
      this.$router.push('/feed')
    },
    uploadImage (e) {
      const files = e.target.files
      if (!files.length) return
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = e => {
        this.post.postVideo = e.target.result
        this.$refs.video.src = this.post.postVideo
        this.dialog = false
      }
    }
  },
  computed: {
    ...mapGetters('posts', ['getPosts'])
  }
}
</script>

<style lang='scss'>
body{
  background: linear-gradient(90deg, rgba(38,183,233,0.7903536414565826) 0%, rgba(34,218,197,1) 100%);
}
.caption-container {
    height: auto;
    display: flex;
    textarea {
     border: 0;
    font-size: 1rem;
    width: 100%;
    padding: 10px;
    }
    textarea:focus {
        outline: 0;
    }
}
#modal-window{
    width: 320px;
    position: absolute;
    top: 25%;
}
.inputfile{
  display: none;
}
#modal-window .q-card__section{
  height: 70px;
}
#modal-window .q-bar{
  background: #87e0f5
}
#modal-window label p{
  background: #87e0f5;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  width:115px
}
.wrapper{
      padding: 7px;
      margin-top: -40px;
}
.adder-wrapper{
  width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    background: #87e0f5;
    border-radius: 11px;
    box-shadow: 1px 1px 18px;
    padding: 7px;
}
.selected-video{
   max-width: 480px;
   video{
     width: 100%;
   }
}
.step-buttons{
    margin-top: 20px;
    display: flex;
    padding: 0 66px;
    justify-content: space-between;
 .cancel-btn,
 .share-btn{
    padding: 7px;
    font-size: 1rem;
    background: #87e0f5;
    border-radius: 10px;
    box-shadow: 1px 1px 10px;
    cursor: pointer;
  }
}
</style>
