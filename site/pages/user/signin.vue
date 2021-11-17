<template>
  <section class="main">
    <div class="container">
      <div class="main-body no-bg">
        <div class="widget signin">
          <div class="widget-header">
            Sign in
          </div>
          <div class="widget-content">
            <div class="field">
              <label class="label">Username/Email</label>
              <div class="control has-icons-left">
                <input
                  v-model="username"
                  class="input is-success"
                  type="text"
                  placeholder="Enter username or email"
                  @keyup.enter="submitLogin"
                />
                <span class="icon is-small is-left"
                  ><i class="iconfont icon-username"
                /></span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="enter password"
                  @keyup.enter="submitLogin"
                />
                <span class="icon is-small is-left"
                  ><i class="iconfont icon-password"
                /></span>
              </div>
            </div>

            <div class="field">
              <label class="label">Captcha Code</label>
              <div class="control has-icons-left">
                <div class="field is-horizontal">
                  <div class="field login-captcha-input">
                    <input
                      v-model="captchaCode"
                      class="input"
                      type="text"
                      placeholder="Captcha Code"
                      @keyup.enter="submitLogin"
                    />
                    <span class="icon is-small is-left"
                      ><i class="iconfont icon-captcha"
                    /></span>
                  </div>
                  <div v-if="captchaUrl" class="field login-captcha-img">
                    <a @click="showCaptcha"><img :src="captchaUrl" /></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="field login-button">
              <button class="button is-success" @click="submitLogin">
                Sign in
              </button>
              <nuxt-link class="button is-text" to="/user/signup">
                No account? Click here to register&gt;&gt;
              </nuxt-link>
            </div>
            <!--<div class="third-party-line">
              <div class="third-party-title">
                <span>Third-party account login</span>
              </div>
            </div>
            <div class="third-parties">
              <github-login :ref-url="ref" />
              <qq-login :ref-url="ref" />
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  asyncData({ params, query }) {
    return {
      ref: query.ref,
    }
  },
  data() {
    return {
      username: '',
      password: '',
      captchaId: '',
      captchaUrl: '',
      captchaCode: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.current
    },
    isLogin() {
      return !!this.currentUser
    },
  },
  mounted() {
    if (this.redirectIfLogined()) {
      return
    }
    this.showCaptcha()
  },
  methods: {
    async submitLogin() {
      try {
        if (!this.username) {
          this.$message.error('Please enter your username or email')
          return
        }
        if (!this.password) {
          this.$message.error('Please enter the password')
          return
        }
        if (!this.captchaCode) {
          this.$message.error('please enter verification code')
          return
        }
        const user = await this.$store.dispatch('user/signin', {
          captchaId: this.captchaId,
          captchaCode: this.captchaCode,
          username: this.username,
          password: this.password,
          ref: this.ref,
        })
        if (this.ref) {
          // 跳到登录前
          this.$linkTo(this.ref)
        } else {
          // 跳到个人主页
          this.$linkTo('/user/' + user.id)
        }
      } catch (e) {
        this.$message.error(e.message || e)
        await this.showCaptcha()
      }
    },
    async showCaptcha() {
      try {
        const ret = await this.$axios.get('/api/captcha/request', {
          params: {
            captchaId: this.captchaId || '',
          },
        })
        this.captchaId = ret.captchaId
        this.captchaUrl = ret.captchaUrl
      } catch (e) {
        this.$message.error(e.message || e)
      }
    },
    /**
     * 如果已经登录了，那么直接跳转
     * @returns {boolean}
     */
    redirectIfLogined() {
      if (this.isLogin) {
        const me = this
        this.$msg({
          message: 'Sign in successful',
          onClose() {
            if (me.ref && !me.$isSigninUrl(me.ref)) {
              me.$linkTo(me.ref)
            } else {
              me.$linkTo('/')
            }
          },
        })
        return true
      }
      return false
    },
  },
  head() {
    return {
      title: this.$siteTitle('Sign in'),
    }
  },
}
</script>
<style scoped lang="scss">
.signin {
  max-width: 480px;
  margin: auto;
  padding: 0 20px;

  .login-captcha-input {
    width: 100%;
    margin-right: 20px;
    .input {
      width: 100% !important;
    }
  }

  .login-captcha-img {
    img {
      height: 40px;
    }
  }

  .login-button {
    .button {
      width: 100%;
    }
  }

  .third-party-line {
    border-bottom: 1px solid #dedede;
    margin-bottom: 24px;
    .third-party-title {
      margin-bottom: -12px;
      text-align: center;

      span {
        background-color: #fff;
        padding: 0 10px;
        font-size: 13px;
      }
    }
  }

  .third-parties {
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
