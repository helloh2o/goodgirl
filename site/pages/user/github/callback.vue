<template>
  <div>
    <div v-if="loading" class="loading modal is-active">
      <div class="modal-background" />
      <div class="modal-content">
        <div class="loading-animation" />
        <span class="loading-text">Logging in, please wait...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-footer',
  asyncData({ params, query }) {
    return {
      code: query.code,
      state: query.state,
      ref: query.ref,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    this.callback()
  },
  methods: {
    async callback() {
      this.loading = true
      try {
        const user = await this.$store.dispatch('user/signinByGithub', {
          code: this.code,
          state: this.state,
        })

        if (this.ref) {
          // 跳到登录前
          this.$linkTo(this.ref)
        } else {
          // 跳到个人主页
          this.$linkTo('/user/' + user.id)
        }
      } catch (e) {
        const me = this
        this.$msg({
          message: 'Login failed' + (e.message || e),
          onClose() {
            me.$linkTo('/user/signin')
          },
        })
      } finally {
        this.loading = false
      }
    },
  },
  head() {
    return {
      title: this.$siteTitle('Processing...'),
    }
  },
}
</script>

<style lang="scss" scoped>
.loading {
  .modal-background {
    background-color: rgba(10, 10, 10, 0.6);
  }
  .modal-content {
    text-align: center;
    color: #fdfdfd;
    font-weight: bold;
    font-size: 18px;
  }

  .loading-text {
    margin-left: 10px;
  }
}
</style>
