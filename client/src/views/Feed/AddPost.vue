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
                @change="uploadVideo"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
    </template>
    <div id="chip" ref="chip" :style="{ display: 'none' }">
        <template>
          <q-banner
            inline-actions
            dense
            class="text-white bg-red">
            File format that you want to download is incorrect. Please select a video file.
          </q-banner>
        </template>
      </div>
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
      <video ref="video" width="480" controls>
        <q-resize-observer @resize="onResize" />
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
import axios from 'axios'

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
        tag: [],
        caption: '',
        comments: []
      }
    }
  },
  updated () {
    if (!this.dialog && this.post.postVideo === "") {
      this.$router.push('/feed')
    }
  },
  methods: {
    ...mapActions('posts', ['addPost']),
    async addToFeed () {
      let valueArr = this.$refs.textarea.value.split(" ")
      valueArr.filter((word) => {
        if (word.match(/#\w+/)) {
          word = word.slice(1)
          this.post.tag.push(word)
        }
      })
      this.post.caption = this.$refs.textarea.value
      this.addPost(this.post)
      axios.post('/api/posts/save-post', this.post)
        .then((response) => {
        })
        .catch(error => {
          console.log(error)
        })
      this.$router.push('/feed')
    },
    async uploadVideo (e) {
      const files = e.target.files
      if (!files.length) return
      if (files[0].type.match(/video..../gi)) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        const formData = new FormData()
        formData.append('file', files[0])
        try {
          const videoUrl = await axios.post('https://emocean.dev/api/posts/upload-videos?type=single-video', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          this.post.postVideo = videoUrl.data.videoUrl
          this.$refs.video.src = this.post.postVideo
          this.dialog = false
        } catch (err) {
          console.log(err)
        }
      } else {
        this.$refs.chip.style.display = "block"
        setTimeout(() => {
          this.$refs.chip.style.display = "none"
          this.$refs.input.value = ""
        }, 5000)
      }
    },
    onResize () {
      if (this.$refs.video.videoHeight > this.$refs.video.videoWidth) {
        this.$refs.video.height = "270"
      }
    }
  },
  computed: {
    ...mapGetters('posts', ['getPosts']),
    ...mapGetters('authentication', ['getToken'])
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

#chip .q-banner{
  z-index: 9999;
    position: absolute;
    width: 100%;
    top: 0
}

#chip .q-banner__content{
    padding: 3px;
    text-align: center;
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
    background: #000;
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
