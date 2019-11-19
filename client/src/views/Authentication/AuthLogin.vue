<template>
  <div class="row login-container">
    <div class="gt-xs offset-sm-2 col-sm-4 offset-md-3 col-md-3 simple-container"><h2>Logo and Motto</h2></div>
    <AuthLoginComponent :loginClassList="'offset-xs-1 col-xs-10 col-sm-4 col-md-3 column simple-container'"/>
  </div>
</template>

<script>
import AuthLoginComponent from './AuthLoginComponent.vue'

export default {
  components: {
    AuthLoginComponent
  }
}
</script>

<style scoped>
.login-container {
  overflow: auto;
  padding: 50px 0 30px 0;
}

.simple-container {
  padding: 1rem;
  background: #e7f0f1;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
