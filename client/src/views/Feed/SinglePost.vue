<template>
  <div class="single-post">
    <v-comments :isModelVisible="isModelVisible" :closePopup="closePopup" :id="post.postId" />
    <div class="video-container" @click="play">
      <figure class="image is-32x32">
        <span class="emoji video-emoji" v-html="post.emoji" />
        <avatar :img="post.avatarUrl" :size="'30px'" />
      </figure>
     <video ref="videoElm" width="480" v-observe-visibility="visibilityChanged">
        <q-resize-observer @resize="onResize" />
        <source :src="post.videoUrl" type="video/mp4" />
        <source :src="post.videoUrl" type="video/ogg" />
        <source :src="post.videoUrl" type="video/webm" />
    </video>
      <div class="bigger-video" @click="openModalVideo"><i ref="bigVideo" class="fas fa-compress fa-2x"></i></div>
    </div>
    <div class="content-wrapper">
      <div class="heart-and-comments">
        <div class="heart">
          <i class="far fa-heart fa-lg"
          :class="{'fas': isLiked}"
          @click="updateLikes(post)">
          </i>
          <p class="likes">{{ this.post.likesCount }}</p>
        </div>
        <div class="comments-icon" @click="closePopup(true)">
          <i class="far fa-comment-alt fa-md"></i>
          <p class="likes">{{ this.commentsCount(this.post.postId) }}</p>
        </div>
      </div>
      <div class="content">
        <p
          class="caption"
          ref="caption"
          :class="[post.caption.length > 40 ? 'caption' : 'caption2']"
        >
          <router-link :to="{ path: `/profile/${post.nickname}` }">
            <span>{{ post.nickname }}</span>
          </router-link>
          {{ post.caption }}
        </p>
      </div>
    </div>
    <LikesList v-bind:info="likesInfo" v-if="likesInfo.show" />
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
      <div class="qCard-wrapper" ref="qCard">
      <q-card id="feed-modal-video">
        <q-card-section>
          <template>
          <div class="video-container" @click="play">
            <figure class="image is-32x32">
              <avatar :img="post.avatarUrl" :size="'30px'" />
            </figure>
            <video ref="modalVideo" @click.once="incrementViewsCounter(post)">
                <q-resize-observer @resize="onResize" />
                <source :src="post.videoUrl" type="video/mp4" />
                <source :src="post.videoUrl" type="video/ogg" />
                <source :src="post.videoUrl" type="video/webm" />
            </video>
          </div>
          <div class="content-wrapper">
            <div class="heart-and-comments">
              <div class="heart">
                <i class="far fa-heart fa-lg"
                :class="{'fas': isLiked}"
                @click="updateLikes(post)">
                </i>
                <p class="likes">{{ this.post.likesCount }}</p>
              </div>
              <div class="comments-icon" @click="closePopup(true)">
                <i class="far fa-comment-alt fa-md"></i>
                <p class="likes">{{ this.commentsCount(this.post.postId) }}</p>
              </div>
            </div>
            <div class="content">
              <p
                ref="caption"
                :class="[post.caption.length > 40 ? 'caption-in-modal' : 'caption-in-modal']"
              >
                <router-link :to="{ path: `/profile/${post.nickname}` }">
                  <span>{{ post.nickname }}</span>
                </router-link>
                {{ post.caption }}
              </p>
            </div>
          </div>
          </template>
        </q-card-section>
      </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import PageComments from '../Comments/PageComments'
import Avatar from '@/components/Avatar.vue'
import { updateLikes, incrementViewsCounter } from '../../services/posts'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OnePost',
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isModelVisible: false,
      dialog: false,
      likesInfo: {
        show: false
      },
      isLiked: false,
      showNotAuth: false
    }
  },
  computed: {
    ...mapGetters({ myProfile: 'profile/myProfile' }),
    ...mapGetters({ comments: 'comments/myComments' }),
    ...mapGetters({ commentsCount: 'comments/commentsCount' })
  },

  methods: {
    ...mapActions({
      dislikePost: 'posts/dislikePost',
      likePost: 'posts/likePost'
    }),
    isPostLiked (post) {
      const likesArr = this.post.likes
      if (likesArr.includes(localStorage.getItem('profileId'))) {
        this.isLiked = true
      } else {
        this.isLiked = false
      }
    },
    incrementViewsCounter (post) {
      const postId = post.postId
      incrementViewsCounter(postId)
        .then(res => { })
        .catch(error => {
          console.log(error)
        })
    },
    updateLikes (post) {
      const postId = post.postId
      updateLikes(postId)
        .then(response => {
          if (response.data.result === 'dislike') {
            this.dislikePost(postId)
            this.isLiked = false
          } else {
            this.likePost(postId)
            this.isLiked = true
          }
          return response.data.result
        })
        .catch(error => {
          if (error.response.statusText === 'Unauthorized') {
            this.showNotif('center')
            return 'You are not authorized!!!'
          } else {
            console.log(error)
          }
        })
    },
    showNotif (position) {
      this.$q.notify({
        message: `<span style="font-size:1.3em;">You are not authorized!</span><br>
        <em>Please, login or create new account</em>`,
        color: 'primary',
        position,
        html: true,
        actions: [
          {
            label: 'Sign in',
            color: 'yellow',
            handler: () => {
              this.$router.push('/login')
            }
          },
          {
            label: 'Sign up',
            color: 'accent',
            handler: () => {
              this.$router.push('/register')
            }
          },
          { label: 'LAter', color: 'white', handler: () => { } }
        ]
      })
    },
    closePopup (visibility) {
      this.isModelVisible = visibility
    },
    openModalVideo (event) {
      this.$refs.videoElm.pause()
      this.dialog = true
    },
    onResize () {
      if (this.dialog && (this.$refs.modalVideo.videoHeight < this.$refs.modalVideo.videoWidth)) {
        this.$refs.modalVideo.classList.add("width-video")
        this.$refs.qCard.id = "qCard-width-video"
      }
      if (this.$refs.videoElm.videoHeight > this.$refs.videoElm.videoWidth) {
        this.$refs.videoElm.height = "270"
      }
    },
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      if (!isVisible) {
        entry.target.pause()
      }
    },
    play (event) {
      let currentVideo = event.target
      if (event.target.className === this.$refs.bigVideo.className) {
        return false
      }
      if (currentVideo.paused) {
        currentVideo.play()
      } else {
        currentVideo.pause()
      }
    }
  },
  components: {
    'v-comments': PageComments,
    Avatar
  },
  mounted () {
    this.isPostLiked()
  }
}
</script>

<style lang="scss">
.video-emoji {
  position: absolute;
  top: -40px;
  left: -50px;
  font-size: xx-large;
}
#qCard-width-video{
  width: -webkit-fill-available;
  max-width: 800px;
}
#feed-modal-video {
    .q-card__section {
    padding: 0;
    }
    .width-video{
      height: auto;
      width: 100%;
    }
    video {
    width: auto;
    height: -webkit-fill-available;
    background: #000;
    margin-bottom: -6px;
    }
    .video-container {
    padding: 0;
    background: #0000;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    }
}
.bigger-video{
  position: absolute;
  color:#fff;
  top: 3%;
  left: 2%;
  cursor: pointer;
}
.content .caption-in-modal {
  position: absolute;
  bottom: 1%;
  width: 90%;
  margin: 0;
  font-size: 0.85rem;
  word-wrap: break-word;
  span {
    font-weight: bold;
  }
}

@media (max-width: 417px){
  #feed-modal-video video {
    width: 100%;
    height: auto;
    max-width: 52vh;
    max-height: 92vh;
  }
  #feed-modal-video .width-video{
    width: auto;
    background: #000;
    margin-bottom: -6px;
    max-width: 100%
  }
}
</style>
