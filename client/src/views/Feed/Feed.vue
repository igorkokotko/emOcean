<template>
  <div id="feed">
    <v-comments :isModelVisible="isModelVisible" :closePopup="closePopup" />
    <div class="feed-wrapper">
      <div class="feed-post" v-for="(post, key) in getPosts" :key="key">
        <div
          class="image-container"
          @dblclick="updateLikes({ key: key, updates: ({ hasBeenLiked : post.hasBeenLiked, likes: post.likes })  })"
          @click="play"
        >
          <figure class="image is-32x32">
            <img :src="post.userImage" />
          </figure>
          <video ref="videoElm" width="480" max-height="270">
            <source :src="post.postVideo" type="video/mp4" />
            <source :src="post.postVideo" type="video/ogg" />
            <source :src="post.postVideo" type="video/webm" />
          </video>
        </div>
        <div class="content-wrapper">
          <div class="heart-and-comments">
            <div
              class="heart"
              @click="updateLikes({ key: key, updates: ({ hasBeenLiked : post.hasBeenLiked, likes: post.likes })  })"
            >
              <i class="far fa-heart fa-lg" :class="{'fas': post.hasBeenLiked}"></i>
              <p class="likes">{{post.likes}}</p>
            </div>
            <div class="comments-icon" @click="closePopup(true)">
              <i class="far fa-comment-alt fa-md"></i>
              <p>{{post.comments.length}}</p>
            </div>
          </div>
          <div class="content">
            <p
              class="caption"
              ref="caption"
              :class="[post.caption.length > 40 ? 'caption' : 'caption2']"
            >
              <span>{{post.username}}</span>
              {{post.caption}}
            </p>
          </div>
        </div>
      </div>
      <div class="big-btn" @click="$router.push('/addpost')">
        <i class="fas fa-2x fa-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import PageComments from '../Comments/PageComments'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

const Authorized = require('../Authentication/Authorized.js')

export default {
  name: 'Feed',
  data () {
    return {
      isModelVisible: false
    }
  },
  created () {
    let route = ''
    if (Authorized.isAuthorized()) {
      route = '/api/feed/authorized'
    } else {
      route = '/api/feed/anonimus'
    }
    axios.get(route)
      .then((response) => {
        this.updateState(response.data)
      })
      .catch(error => {
        if (error.response) {
          this.$q.notify({
            message: 'Oooops, something went wrong',
            icon: 'announcement'
          })
        }
      })
  },
  methods: {
    ...mapActions('posts', ['updateLikes', 'updateState']),
    closePopup (visibility) {
      // close | open
      this.isModelVisible = visibility
    },
    play: function (event) {
      let currentVideo = event.target
      if (currentVideo.paused) {
        currentVideo.play()
      } else {
        currentVideo.pause()
      }
    }
  },
  computed: {
    ...mapGetters('posts', ['getPosts'])
  },
  components: {
    'v-comments': PageComments
  }
}
</script>

<style lang="scss">
.big-btn {
  width: 75px;
  background: #87e0f5;
  border-radius: 50%;
  height: 75px;
  position: fixed;
  bottom: 8%;
  right: 3%;
  cursor: pointer;
  i {
    position: absolute;
    color: #fff;
    left: 25px;
    top: 23px;
  }
}
.feed-post {
  padding-top: 50px;
  height: fit-content;
  padding: 6px 0px;
}
.heart-and-comments {
  flex-direction: column;
  position: absolute;
  right: 3%;
  top: 35%;
  bottom: 65%;
  cursor: pointer;
  .heart i {
    display: inline;
    color: #dbe4e2;
  }
  .likes {
    display: inline-block;
    text-align: center;
    font-size: 3.2vmin;
    width: 7vmin;
    margin: 5px 0;
    font-weight: 100;
    color: #dbe4e2;
  }
  .comments-icon {
    display: inline-block;
    font-size: large;
    height: 25px;
    cursor: pointer;
  }
  .comments-icon i::before,
  .heart i::before {
    font-size: 4vmin;
    color: #dbe4e2;
  }
  .comments-icon p {
    display: inline-block;
    vertical-align: bottom;
    font-size: 3.2vmin;
    width: 7vmin;
    margin: 5px 0;
    text-align: center;
    color: #dbe4e2;
  }
  .comments-counter {
    text-align: center;
  }
}
.content .caption {
  position: absolute;
  bottom: 3%;
  width: 90%;
  font-size: 0.85rem;
  word-wrap: break-word;
  span {
    font-weight: bold;
  }
}
.content .caption2 {
  position: absolute;
  width: 88%;
  bottom: 4%;
  font-size: 0.85rem;
  word-wrap: break-word;
  span {
    font-weight: bold;
  }
}
.content p {
  color: #dbe4e2;
}
.image-container {
  max-width: 800px;
  position: relative;
  background: #87e0f5;
  border-radius: 11px;
  box-shadow: 1px 1px 18px;
  img {
    border-radius: 99px;
    top: 17%;
  }
  .image {
    right: 5%;
    position: absolute;
    top: 8%;
    margin: 0;
  }
  .image.is-32x32 img {
    height: 32px;
    width: 32px;
  }
}
.feed-post {
  position: relative;
  padding: 10px;
  .content-wrapper {
    margin: 7.5px 10px;
  }
  video {
    max-width: 100%;
    padding: 7px 7px 2px 7px;
  }
  .fas.fa-heart {
    color: #f06595;
  }
}
body,
html {
  background: linear-gradient(
    90deg,
    rgba(38, 183, 233, 0.7903536414565826) 0%,
    rgba(34, 218, 197, 1) 100%
  );
}

#feed {
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: grid;
  justify-content: center;
}
::-webkit-scrollbar {
  display: none;
}
.caption-container {
  display: flex;
  textarea {
    border: 0;
    font-size: 1rem;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  textarea:focus {
    outline: 0;
  }
}
@media (max-width: 699px) {
  .big-btn {
    display: none;
  }
}
</style>
