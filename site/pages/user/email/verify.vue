<template>
  <section class="main">
    <div class="container main-container is-white left-main">
      <div class="left-container">
        <div class="widget">
          <div class="widget-header">E-mail verification</div>
          <div class="widget-content">
            <div v-if="success">
              Congratulations, the email verification is successful. Your email is {{ currentUser.email }}，<a
                href="/user/settings"
                >Click to go to the profile page</a
              >
            </div>
            <div v-else>
              Email verification failed<span v-if="message" class="has-text-danger"
                >&nbsp;Reason:{{ message }}</span
              >，Goto&nbsp;<a href="/user/settings">Edit profile</a
              >&nbsp;The page tries to resend the verification email.
            </div>
          </div>
        </div>
      </div>
      <user-center-sidebar :user="currentUser" />
    </div>
  </section>
</template>

<script>
import UserCenterSidebar from '~/components/UserCenterSidebar'
export default {
  middleware: 'authenticated',
  components: { UserCenterSidebar },
  async asyncData({ $axios, query }) {
    try {
      await $axios.get('/api/user/email/verify?token=' + query.token)
      return { success: true }
    } catch (e) {
      return { success: false, message: e.message || '' }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.current
    },
  },
}
</script>

<style lang="scss" scoped></style>
