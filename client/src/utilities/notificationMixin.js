export const notificationMixin = {
  methods: {
    showNotif (message) {
      this.$q.notify({
        color: 'primary',
        textColor: 'white',
        message: message,
        actions: [{ icon: 'close', color: 'white' }],
        timeout: 3000
      })
    }
  }
}
