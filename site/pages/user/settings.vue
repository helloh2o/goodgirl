<template>
  <section class="main">
    <div class="container main-container left-main size-320">
      <div class="left-container">
        <div class="widget">
          <div class="widget-header">
            <nav class="breadcrumb">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a :href="'/user/' + user.id">{{ user.nickname }}</a>
                </li>
                <li class="is-active">
                  <a href="#" aria-current="page">Edit profile</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="widget-content">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Username:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <label v-if="user.username">{{ user.username }}</label>
                    <a v-else @click="showSetUsername = true">Settings</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 邮箱 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Email:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <template v-if="user.email">
                      <label>{{ user.email }}</label>
                      <a @click="showSetEmail = true">Edit</a>
                      <a
                        v-if="!user.emailVerified"
                        class="has-text-danger"
                        style="font-weight: 700;"
                        @click="requestEmailVerify"
                        >Verify&gt;&gt;</a
                      >
                    </template>
                    <template v-else>
                      <a @click="showSetEmail = true">Set Email</a>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- 密码 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Password:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <template v-if="user.passwordSet">
                      <label>Password is set&nbsp;</label>
                      <a @click="showUpdatePassword = true">Click edit</a>
                    </template>
                    <a v-else @click="showSetPassword = true">Click Settings</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 头像 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">
                  <span style="color: red;">*&nbsp;</span>Avatar:
                </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      style="width: 150px; height: 150px;"
                    />
                    <div class="file">
                      <label class="file-label">
                        <input
                          class="file-input"
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          @change="uploadAvatar"
                        />
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="iconfont icon-upload" />
                          </span>
                          <span class="file-label">Select avatar</span>
                        </span>
                      </label>
                    </div>
                    <span style="font-weight: bold; color: red;"
                      >*The image must be square and the size should not exceed 1M.</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- 昵称 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">
                  <span style="color: red;">*&nbsp;</span>Nickname:
                </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      v-model="form.nickname"
                      class="input"
                      type="text"
                      autocomplete="off"
                      placeholder="input nickname"
                    />
                    <span class="icon is-small is-left">
                      <i class="iconfont icon-username" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 简介 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Introduction:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <textarea
                      v-model="form.description"
                      class="textarea"
                      rows="2"
                      placeholder="Introduce yourself in one sentence"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 个人主页 -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Homepage:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      v-model="form.homePage"
                      class="input"
                      type="text"
                      autocomplete="off"
                      placeholder="Please enter your personal homepage"
                    />
                    <span class="icon is-small is-left">
                      <i class="iconfont icon-net" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal" />
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <a class="button is-success" @click="submitForm"
                      >Submit</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <user-center-sidebar :user="user" />
    </div>

    <!-- 设置用户名 -->
    <div :class="{ 'is-active': showSetUsername }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <div class="widget">
          <div class="widget-header">
            Set username
            <button
              class="delete"
              aria-label="close"
              @click="showSetUsername = false"
            />
          </div>
          <div class="widget-content">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.username"
                  class="input is-success"
                  type="text"
                  placeholder="please enter user name"
                  @keydown.enter="setUsername"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-username" />
                </span>
              </div>
            </div>
          </div>
          <div class="widget-footer is-right">
            <a class="button is-success" @click="setUsername">OK</a>
            <a class="button" @click="showSetUsername = false">Cancel</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 设置邮箱 -->
    <div :class="{ 'is-active': showSetEmail }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <div class="widget">
          <div class="widget-header">
            Set up email
            <button
              class="delete"
              aria-label="close"
              @click="showSetEmail = false"
            />
          </div>
          <div class="widget-content">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.email"
                  class="input is-success"
                  type="text"
                  placeholder="please input your email"
                  @keydown.enter="setEmail"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-email" />
                </span>
              </div>
            </div>
          </div>
          <div class="widget-footer is-right">
            <a class="button is-success" @click="setEmail">OK</a>
            <a class="button" @click="showSetEmail = false">Cancel</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 设置密码 -->
    <div :class="{ 'is-active': showSetPassword }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <div class="widget">
          <div class="widget-header">
            set password
            <button
              class="delete"
              aria-label="close"
              @click="showSetPassword = false"
            />
          </div>
          <div class="widget-content">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.password"
                  class="input is-success"
                  type="password"
                  placeholder="Please enter the password"
                  @keydown.enter="setPassword"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.rePassword"
                  class="input is-success"
                  type="password"
                  placeholder="Please confirm the password again"
                  @keydown.enter="setPassword"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>
          </div>
          <div class="widget-footer is-right">
            <a class="button is-success" @click="setPassword">OK</a>
            <a class="button" @click="showSetPassword = false">Cancel</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <div :class="{ 'is-active': showUpdatePassword }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <div class="widget">
          <div class="widget-header">
            change Password
            <button
              class="delete"
              aria-label="close"
              @click="showUpdatePassword = false"
            />
          </div>
          <div class="widget-content">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.oldPassword"
                  class="input is-success"
                  type="password"
                  placeholder="Please enter the current password"
                  @keydown.enter="updatePassword"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.password"
                  class="input is-success"
                  type="password"
                  placeholder="Please enter the password"
                  @keydown.enter="updatePassword"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="form.rePassword"
                  class="input is-success"
                  type="password"
                  placeholder="Please confirm the password again"
                  @keydown.enter="updatePassword"
                />
                <span class="icon is-small is-left">
                  <i class="iconfont icon-password" />
                </span>
              </div>
            </div>
          </div>
          <div class="widget-footer is-right">
            <a class="button is-success" @click="updatePassword">OK</a>
            <a class="button" @click="showUpdatePassword = false">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserCenterSidebar from '~/components/UserCenterSidebar'
export default {
  middleware: 'authenticated',
  components: {
    UserCenterSidebar,
  },
  async asyncData({ $axios, params }) {
    const user = await $axios.get('/api/user/current')
    const form = { ...user }
    return {
      user,
      form,
    }
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        nickname: '',
        avatar: '',
        homePage: '',
        description: '',
        password: '',
        rePassword: '',
        oldPassword: '',
      },

      showSetUsername: false,
      // username: '',

      showSetEmail: false,
      // email: '',

      showSetPassword: false, // 显示设置密码
      showUpdatePassword: false, // 显示修改密码
      // password: '',
      // rePassword: '',
      // oldPassword: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$axios.post('/api/user/edit/' + this.user.id, {
          nickname: this.form.nickname,
          avatar: this.form.avatar,
          homePage: this.form.homePage,
          description: this.form.description,
        })
        await this.reload()
        this.$message.success('Submit successfully')
      } catch (e) {
        console.error(e)
        this.$message.error('Edit failed：' + (e.message || e))
      }
    },
    async uploadAvatar(e) {
      const files = e.target.files
      if (files.length <= 0) {
        return
      }
      try {
        // 上传头像
        const file = files[0]
        const formData = new FormData()
        formData.append('image', file, file.name)
        const ret = await this.$axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        // 设置头像
        await this.$axios.post('/api/user/update/avatar', {
          avatar: ret.url,
        })

        // 重新加载数据
        await this.reload()

        this.$message.success('Avatar updated successfully')
      } catch (e) {
        console.error(e)
      }
    },
    async setUsername() {
      try {
        const me = this
        await this.$axios.post('/api/user/set/username', {
          username: me.form.username,
        })
        await this.reload()
        this.$message.success('Username is set successfully')
        this.showSetUsername = false
      } catch (err) {
        this.$message.error('Username setting failed:' + (err.message || err))
      }
    },
    async setEmail() {
      try {
        const me = this
        await this.$axios.post('/api/user/set/email', {
          email: me.form.email,
        })
        await this.reload()
        this.$message.success('Email set successfully')
        this.showSetEmail = false
      } catch (err) {
        this.$message.error('Email set failed:' + (err.message || err))
      }
    },
    async setPassword() {
      try {
        const me = this
        await this.$axios.post('/api/user/set/password', {
          password: me.form.password,
          rePassword: me.form.rePassword,
        })
        await this.reload()
        this.$message.success('Password set successfully')
        this.showSetPassword = false
      } catch (err) {
        this.$message.error('Password set failed:' + (err.message || err))
      }
    },
    async updatePassword() {
      try {
        const me = this
        await this.$axios.post('/api/user/update/password', {
          oldPassword: me.form.oldPassword,
          password: me.form.password,
          rePassword: me.form.rePassword,
        })
        await this.reload()
        this.$message.success('Password reset complete')
        this.showUpdatePassword = false
      } catch (err) {
        this.$message.error('Password change failed：' + (err.message || err))
      }
    },
    async reload() {
      this.user = await this.$axios.get('/api/user/current')
      this.form = { ...this.user }
    },
    async requestEmailVerify() {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.post('/api/user/email/verify')
        this.$message.success(
          'The mail has been sent to your mailbox:' + this.user.email + ', Please pay attention to check.'
        )
      } catch (err) {
        this.$message.error('Request verification failed:' + (err.message || err))
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
  head() {
    return {
      title: this.$siteTitle(this.user.nickname + ' - Edit profile'),
    }
  },
}
</script>

<style lang="scss" scoped>
.control {
  a,
  label {
    // padding-top: .375em;
    // font-size: 14px;
    line-height: 32px;
  }
}

.modal {
  .widget {
    background: #ffffff;
    margin: 0px;
    padding: 10px;
  }
}
</style>
