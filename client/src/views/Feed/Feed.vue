<template>
<<<<<<< HEAD
  <div v-touch-swipe.left="handleSwipe" v-touch-swipe.right="handleSwipe">
    <q-tabs
      v-model="tab"
      v-if="!isSearch"
      class="bg-primary text-white shadow-2"
      active-color="black"
      indicator-color="black"
      align="justify"
    >
      <q-tab
        v-if="authorized"
        name="by-preferences"
        label="recommended"
        @click="getPosts('preferences')"
      />
      <q-tab name="by-views" label="popular" @click="getPosts('popular')" />
      <q-tab
        v-if="authorized"
        name="by-followings"
        label="Followings"
        @click="getPosts('followings')"
      />
    </q-tabs>
    <div id="feed">
      <div class="feed-wrapper">
        <div v-if="isSearch" class="q-mt-lg text-center text-h5">RESULTS</div>
        <div v-if="postsGetter && postsGetter.length > 0 && !isLoading">
          <div class="feed-post" v-for="(post, key) in postsGetter" :key="key">
            <one-post :post="post" />
=======
  <div id="feed">
    <div class="feed-wrapper">
      <div class="feed-post"
        v-for="(post, key) in getPosts"
        :key="key"
      >
        <div class="video-container"
        @dblclick="updateLikes({ key: key, updates: ({ hasBeenLiked : post.hasBeenLiked, likes: post.likes })  })"
        @click="play">
        <div class="test-wrapper">
          <figure class="image is-32x32">
            <img :src="post.userImage" />
          </figure>
          <video ref="videoElm" width="480">
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
        </div>
        <div class="content-wrapper">
          <div class="heart-and-comments">
            <div class="heart"
            @click="updateLikes({ key: key, updates: ({ hasBeenLiked : post.hasBeenLiked, likes: post.likes })  })"
            >
              <i class="far fa-heart fa-lg"
                :class="{'fas': post.hasBeenLiked}">
              </i>
              <p ref="likes" class="likes">{{post.likes}}</p>
            </div>
            <div class="comments-icon" @click="$router.push('/comments')">
              <i class="far fa-comment-alt fa-md"></i>
              <p>{{post.comments.length}}</p>
            </div>
>>>>>>> add some features and fixes
          </div>
        </div>
<<<<<<< HEAD
        <div
          v-if="(!postsGetter || postsGetter.length === 0) && !isLoading"
          class="text-center q-pa-md"
        >{{ this.emptyPostsMessage }}</div>
        <q-spinner v-if="isLoading" color="primary" size="7em" class="fixed-center" />
        <div v-if="authorized" class="big-btn" @click="$router.push('/addpost')">
          <i class="fas fa-2x fa-plus"></i>
=======
      </div>
      </div>
        <div class="big-btn" @click="$router.push('/addpost')">
          <i class="fas fa-2x fa-plus" ></i>
>>>>>>> add some features and fixes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SinglePost from './SinglePost'
import { mapGetters, mapActions } from 'vuex'

import { isAuthorized } from '../Authentication/Authorized'
export default {
  name: 'Feed',
  data () {
    return {
      isModelVisible: false,
      authorized: false,
      isSearch: false,
      tab: 'by-views',
      emptyPostsMessage: "You don't have any posts"
    }
  },
<<<<<<< HEAD
=======
  mounted () {
  // If value more than 999, function replaces thousends to "k"
    for (let i = 0; i < this.$refs.likes.length; i++) {
      if (this.$refs.likes[i].textContent.length > 3) {
        let len = this.$refs.likes[i].textContent.length
        this.$refs.likes[i].textContent = this.$refs.likes[i].textContent.slice(0, len - 3) + "k"
      }
    }
  },
  methods: {
    ...mapActions('posts', ['updateLikes']),
>>>>>>> add some features and fixes

  methods: {
    ...mapActions({
      getMyProfile: 'profile/getMyProfile',
      getPostsByViews: 'posts/getPostsByViewsAction',
      getPostsByPreferences: 'posts/getPostsByPreferencesAction',
      getPostsByFollowings: 'posts/getPostsByFollowingsAction',
      getPostsByTag: 'posts/getPostsByTagAction',
      clearPosts: 'posts/clearPostsAction'
    }),
    getPosts: function (action) {
      switch (action) {
        case 'preferences':
          if (this.$route.query.tab !== 'recommended') {
            this.$router.replace({ query: { tab: 'recommended' } })
          }
          this.clearPosts()
          this.emptyPostsMessage =
            "You don't have any recommended posts. Please go to settings and choose your preferences"
          this.getPostsByPreferences()
          break
        case 'popular': {
          if (this.$route.query.tab !== 'popular') {
            this.$router.replace({ query: { tab: 'popular' } })
          }
          this.clearPosts()
          this.emptyPostsMessage = "You don't have any posts"
          this.getPostsByViews()
          break
        }
        case 'followings': {
          if (this.$route.query.tab !== 'followings') {
            this.$router.replace({ query: { tab: 'followings' } })
          }
          this.clearPosts()
          this.emptyPostsMessage =
            "You don't have any posts from your followings. Follow your friends or someone else and get fun with us ^_^"
          this.getPostsByFollowings()
          break
        }
      }
    },
    handleSwipe: function (obj) {
      let dir = obj.direction
      if (this.tab === 'by-views') {
        if (dir === 'right') {
          this.tab = 'by-preferences'
          this.getPosts('preferences')
        }
        if (dir === 'left') {
          this.tab = 'by-followings'
          this.getPosts('followings')
        }
      } else {
        if (dir === 'left' && this.tab === 'by-preferences') {
          this.tab = 'by-views'
          this.getPosts('popular')
        }
        if (dir === 'right' && this.tab === 'by-followings') {
          this.tab = 'by-views'
          this.getPosts('popular')
        }
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.tab === 'search') {
      this.emptyPostsMessage = 'There is no posts with given tags'
      this.isSearch = true
      this.getPostsByTag(to.query.tag)
      next()
    }
    if (to.path === '/' && to.query.tab !== 'search') {
      if (isAuthorized()) {
        this.authorized = true
        this.isSearch = false
        this.getPostsByFollowings()
      } else {
        this.isSearch = false
        this.getPostsByViews()
      }
    }
    next()
  },
  created () {
    this.getMyProfile()
  },
  mounted () {
    if (this.$route.query.tab === 'search') {
      this.emptyPostsMessage = 'There is no posts with given tags'
      this.isSearch = true
      this.getPostsByTag(this.$route.query.tag)
    } else {
      if (isAuthorized()) {
        this.authorized = true
        if (this.$route.query.tab === 'recommended') {
          this.tab = 'by-preferences'
          this.emptyPostsMessage =
            "You don't have any recommended posts. Please go to settings and choose your preferences"
          this.getPostsByPreferences()
        } else {
          if (this.$route.query.tab !== 'followings') {
            this.$router.replace({ query: { tab: 'followings' } })
          }
          this.showAddButton = true
          this.tab = 'by-followings'
          this.getPostsByFollowings()
        }
      } else {
        if (this.$route.query.tab !== 'popular') {
          this.$router.replace({ query: { tab: 'popular' } })
        }
        this.getPostsByViews()
      }
    },
    onResize () {
      for (let i = 0; i < this.$refs.videoElm.length; i++) {
        if (this.$refs.videoElm[i].videoHeight > this.$refs.videoElm[i].videoWidth) {
          this.$refs.videoElm[i].height = "270"
        }
      }
    }
  },
  beforeDestroy () {
    this.clearPosts()
  },
  computed: {
    ...mapGetters({
      postsGetter: 'posts/postsGetter',
      myProfile: 'profile/myProfile',
      isLoading: 'posts/loadingGetter'
    })
  },
  components: {
    'one-post': SinglePost
  }
}
</script>
<style lang="scss">
.empty-message {
  width: 350px;
}
<<<<<<< HEAD
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
=======
// .feed-post {
//     padding-top: 50px;
//     height: fit-content;
//     padding: 6px 0px;
// }
>>>>>>> add some features and fixes
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
.test-wrapper {
  background: #000;
}
<<<<<<< HEAD
.video-container {
  padding: 7px;
  max-width: 800px;
  position: relative;
  background: #87e0f5;
  border-radius: 11px;
  box-shadow: 1px 1px 18px;
=======
.test-wrapper{
    background: #000;
}
.video-container{
    padding: 7px;
    max-width: 800px;
    position: relative;
    background: #87e0f5;
    border-radius: 11px;
    box-shadow: 1px 1px 18px;
>>>>>>> add some features and fixes
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
<<<<<<< HEAD
  position: relative;
  padding: 10px;
  .content-wrapper {
    margin: 7.5px 10px;
  }
  video {
    max-width: 100%;
    padding: 0px;
    background: #000;
    margin-bottom: -6px;
  }
  .fas.fa-heart {
    color: #f06595;
  }
=======
    position: relative;
    padding: 10px;
    .content-wrapper {
      margin: 7.5px 10px;
    }
    video{
      max-width: 100%;
      padding: 0px;
      margin-bottom: -6px;
    }
    .fas.fa-heart {
      color: #f06595;
    }
}
body,
html{
background: linear-gradient(90deg, rgba(38,183,233,0.7903536414565826) 0%, rgba(34,218,197,1) 100%);
>>>>>>> add some features and fixes
}
#feed {
  position: relative;
  width: 100%;
  max-width: 4200px;
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
