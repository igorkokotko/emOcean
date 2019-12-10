<template>
  <q-dialog v-model="test" @input="todo">
    <q-card ref="pageChat">
      <q-card-section>
        <div class="q-pa-md justify-end">
          <div class="column">
            <div>
              <div v-for="(message, key) in messages" :key="key" class="row no-wrap">
                <q-chat-message
                  :bg-color="whoseMessage(message)"
                  :name="message.from"
                  :uid="message.userId"
                  :text="[message.text]"
                  avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :stamp="message.postTime"
                />
                <div
                  class="column justify-center q-mt-sm"
                  v-if="message.userId === userDetails.uid"
                >
                  <q-btn
                    @click="deleteMessage(message, key)"
                    flat
                    round
                    color="cyan"
                    icon="delete"
                    size="xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-footer elevated>
          <q-toolbar>
            <q-input
              v-model="newMessage"
              ref="newMessage"
              bg-color="white"
              outlined
              rounded
              placeholder="Message"
              dense
              @keyup.enter="sendMessage"
              class="full-width"
            >
              <template v-slot:after>
                <q-btn
                  @click="sendMessage"
                  round
                  dense
                  flat
                  type="submit"
                  color="white"
                  icon="send"
                />
              </template>
            </q-input>
          </q-toolbar>
        </q-footer>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['isModelVisible', 'closePopup'],
  data () {
    return {
      newMessage: '',
      test: false,
      showMessage: false
    }
  },
  computed: {
    ...mapState('comments', ['messages', 'userDetails'])
  },
  methods: {
    ...mapActions('comments', [
      'firebaseGetMessages',
      'firebaseStopGettingMessages',
      'firebaseSendMessage',
      'firebaseDeleteMessage'
    ]),
    todo (evt) {
      if (evt === false) {
        this.closePopup(evt)
      }
    },
    sendMessage () {
      if (this.newMessage !== '') {
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: this.userDetails.name,
            userId: this.userDetails.uid,
            // postId: this.$route.params.postId,
            postTime: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        })
      }
      this.clearMessage()
    },
    clearMessage () {
      this.newMessage = ''
      this.$refs.newMessage.$el.focus()
    },
    deleteMessage (message, key) {
      if (this.userDetails.uid === message.userId) {
        this.firebaseDeleteMessage({ postId: message.postId, id: key })
      }
    },
    whoseMessage (message) {
      if (message.userId === this.userDetails.uid) {
        return 'primary'
      } else {
        return 'secondary'
      }
    },
    scrollToBottom () {
      setTimeout(() => {
        if (this.$refs.pageChat) {
          let pageChat = this.$refs.pageChat.$el
          pageChat.scrollTo(0, pageChat.scrollHeight)
        }
      }, 20)
    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
      }
    },
    isModelVisible: function (val) {
      this.test = val
    }
  },
  mounted () {
    this.firebaseGetMessages(this.$route.params.postId)
  },
  destroyed () {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style>
</style>
