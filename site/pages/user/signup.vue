<template>
  <section class="main">
    <div class="container">
      <div class="main-body no-bg">
        <div class="widget signup">
          <div class="widget-header">
            Sign up
          </div>
          <div class="widget-content">
            <div class="field">
              <label class="label">Nickname</label>
              <div class="control has-icons-left">
                <input
                  v-model="nickname"
                  class="input is-success"
                  type="text"
                  placeholder="Please enter a nickname"
                  @keyup.enter="signup"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-username" />
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  v-model="email"
                  class="input is-success"
                  type="text"
                  placeholder="please input your email"
                  @keyup.enter="signup"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-email" />
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Please enter the password"
                  @keyup.enter="signup"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">confirm password</label>
              <div class="control has-icons-left">
                <input
                  v-model="rePassword"
                  class="input"
                  type="password"
                  placeholder="Please enter the password again"
                  @keyup.enter="signup"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Captcha Code</label>
              <div class="control has-icons-left">
                <div class="field is-horizontal">
                  <div class="field" style="width: 100%;">
                    <input
                      v-model="captchaCode"
                      class="input"
                      type="text"
                      placeholder="Captcha Code"
                      @keyup.enter="signup"
                    />
                    <span class="icon is-small is-left"
                      ><i class="iconfont icon-captcha"
                    /></span>
                  </div>
                  <div v-if="captchaUrl" class="field">
                    <a @click="showCaptcha"
                      ><img :src="captchaUrl" style="height: 40px;"
                    /></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-success" @click="signup">
                  Sign up
                </button>
                <!--<github-login :ref-url="ref" />
                <qq-login :ref-url="ref" />-->
              </div>
            </div>

            <div class="field">
              <nuxt-link class="button is-text" to="/user/signin">
                Already have an account, go to Sign in&gt;&gt;
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GithubLogin from '~/components/GithubLogin'
import QqLogin from '~/components/QqLogin'
export default {
  components: {
    GithubLogin,
    QqLogin,
  },
  asyncData({ params, query }) {
    return {
      ref: query.ref,
    }
  },
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      rePassword: '',
      captchaId: '',
      captchaUrl: '',
      captchaCode: '',
    }
  },
  mounted() {
    this.showCaptcha()
  },
  methods: {
    async signup() {
      try {
        await this.$store.dispatch('user/signup', {
          captchaId: this.captchaId,
          captchaCode: this.captchaCode,
          nickname: this.nickname,
          email: this.email,
          password: this.password,
          rePassword: this.rePassword,
          ref: this.ref,
        })
        if (this.ref) {
          // 跳到登录前
          this.$linkTo(this.ref)
        } else {
          // 跳到个人主页
          this.$linkTo('/user/settings')
        }
      } catch (err) {
        this.$message.error(err.message || err)
        await this.showCaptcha()
      }
    },
    async showCaptcha() {
      try {
        const ret = await this.$axios.get('/api/captcha/request')
        this.captchaId = ret.captchaId
        this.captchaUrl = ret.captchaUrl
        this.captchaCode = ''
      } catch (e) {
        this.$message.error(e.message || e)
      }
    },
  },
  head() {
    return {
      title: this.$siteTitle('Sign up'),
    }
  },
}
</script>

<style lang="scss" scoped>
.signup {
  max-width: 480px;
  margin: auto;
  padding: 0 20px;
}
</style>
