<template>
  <div class="comment-form">
    <div v-if="isLogin" class="comment-create">
      <div ref="commentEditor" class="comment-input-wrapper">
        <div v-if="quote" class="comment-quote-info">
          Reply:
          <label v-text="quote.user.nickname" />
          <i class="iconfont icon-close" alt="Cancel reply" @click="cancelReply" />
        </div>
        <textarea
          v-model="content"
          placeholder="Please express your opinion..."
          class="text-input"
          @keydown.ctrl.enter="create"
          @keydown.meta.enter="create"
        />
      </div>
      <div class="comment-button-wrapper">
        <span>Ctrl or ⌘ + Enter</span>
        <button
          class="button is-small is-success"
          @click="create"
          v-text="btnName"
        />
      </div>
    </div>
    <div v-else class="comment-not-login">
      <div class="comment-login-div">
        Please
        <a style="font-weight: 700;" @click="toLogin">Login</a>before post a point of view
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    entityType: {
      type: String,
      default: '',
      required: true,
    },
    entityId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      content: '', // 内容
      sending: false, // 发送中
      quote: null, // 引用的对象
    }
  },
  computed: {
    btnName() {
      return this.sending ? 'Posting...' : 'Post'
    },
    user() {
      return this.$store.state.user.current
    },
    isLogin() {
      return this.$store.state.user.current != null
    },
  },
  methods: {
    async create() {
      if (!this.content) {
        this.$message.error('Please enter the content of the comment')
        return
      }
      if (this.sending) {
        console.log('Sending, please do not submit again...')
        return
      }
      this.sending = true
      try {
        const data = await this.$axios.post('/api/comment/create', {
          contentType: 'text',
          entityType: this.entityType,
          entityId: this.entityId,
          content: this.content,
          quoteId: this.quote ? this.quote.commentId : '',
        })
        this.$emit('created', data)
        this.content = ''
        this.quote = null
      } catch (e) {
        console.error(e)
        this.$message.error('Comment failed：' + (e.message || e))
      } finally {
        this.sending = false
      }
    },
    reply(quote) {
      this.quote = quote
      this.$refs.commentEditor.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    },
    cancelReply() {
      this.quote = null
    },
    toLogin() {
      this.$toSignin()
    },
  },
}
</script>

<style scoped lang="scss"></style>
