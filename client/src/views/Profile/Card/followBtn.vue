<template>
  <div>
     <button class="profile-card-button" :class="btnClasses" @click="changeFollowStatus">
       {{ following ? 'Unfollow' : 'Follow' }}
     </button>
  </div>
</template>

<script>
export default {
  props: {
    following: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    changeFollowStatus () {
      this.following = !this.following
    }
  },
  computed: {
    btnClasses () {
      return {
        'button-orange': !this.following,
        'button-blue': this.following
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile-card-button {
    min-width: 120px;
    padding: 5px 30px;
    cursor: pointer;
    transition: all .3s;
    border: none;
    font-weight: 700;
    font-size: 14px;
    border-radius: 50px;
    color: #FFF;
    outline: none;

    &.button-orange {
       background: linear-gradient(45deg, #D5135A, #F05924);
       box-shadow: 0 4px 30px rgba(223, 45, 70, 0.35);

      &:hover {
         box-shadow: 0 7px 30px rgba(223, 45, 70, 0.75);
         transform: translateY(-5px);
       }
      }
    &.button-blue {
      background: linear-gradient(45deg, lightseagreen, blue);
      box-shadow: 0 4px 30px lightblue;

      &:hover {
        box-shadow: 0 7px 30px cornflowerblue;
        transform: translateY(-5px);
      }
    }
  }
</style>
