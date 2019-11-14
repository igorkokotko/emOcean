<template>
  <q-page class="q-pa-lg">
    <q-form
      class="q-gutter-md"
    >
      <q-input
        label="Current password"
        placeholder="Type your current password"
        v-model="formModel.currentPassword"
        :type="isCurrentPassVisible ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isCurrentPassVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isCurrentPassVisible = !isCurrentPassVisible"
          />
        </template>
      </q-input>
      <q-input
        label="New password"
        placeholder="Type your new password"
        v-model="formModel.newPassword"
        :type="isNewPassVisible ? 'password' : 'text'"
        :rules="[val => val.length >=8 || 'Please use at least 8 characters']"
        lazy-rules
      >
        <template v-slot:append>
          <q-icon
            :name="isNewPassVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isNewPassVisible = !isNewPassVisible"
          />
        </template>
      </q-input>
      <q-input
        label="Confirm new password"
        placeholder="Confirm your new password"
        v-model="formModel.confirmNewPassword"
        :type="isConfirmNewPassVisible ? 'password' : 'text'"
        :rules="[val => formModel.newPassword === formModel.confirmNewPassword || 'Please type again your new password']"
        lazy-rules
      >
        <template v-slot:append>
          <q-icon
            :name="isConfirmNewPassVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isConfirmNewPassVisible = !isConfirmNewPassVisible"
          />
        </template>
      </q-input>
      <div class="q-pt-md">
        <q-btn label="Change password" type="submit" color="primary" no-caps/><br>
        <q-btn label="Forgot password?" type="submit" color="primary" flat no-caps class="q-mt-md"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isCurrentPassVisible: true,
      isNewPassVisible: true,
      isConfirmNewPassVisible: true,
      formModel: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  }
}
</script>

<style scoped>
.q-field--with-bottom {
  padding-bottom: 0;
}
</style>
