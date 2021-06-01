<template>
  <el-dropdown v-if="hasPermission" @command="handleCommand">
    <span class="el-dropdown-link">
      management<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-if="topic.type === 0" command="edit"
        >modify</el-dropdown-item
      >
      <el-dropdown-item command="recommend">{{
        topic.recommend ? 'Cancel recommendation' : 'recommendation'
      }}</el-dropdown-item>
      <el-dropdown-item command="delete">delete</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import UserHelper from '~/common/UserHelper'
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasPermission() {
      return (
        this.isOwner ||
        UserHelper.isOwner(this.user) ||
        UserHelper.isAdmin(this.user)
      )
    },
    isOwner() {
      if (!this.user || !this.topic) {
        return false
      }
      return this.user.id === this.topic.user.id
    },
    user() {
      return this.$store.state.user.current
    },
  },
  methods: {
    handleCommand(command) {
      if (!this.topic || !this.topic.topicId) {
        return
      }
      if (command === 'edit') {
        this.editTopic(this.topic.topicId)
      } else if (command === 'delete') {
        this.deleteTopic(this.topic.topicId)
      } else if (command === 'recommend') {
        this.switchRecommend(this.topic)
      } else {
        console.log('click on item ' + command)
      }
    },
    deleteTopic(topicId) {
      if (!process.client) {
        return
      }
      const me = this
      this.$confirm('Are you sure to delete this post？').then(function () {
        me.$axios
          .post('/api/topic/delete/' + topicId)
          .then(() => {
            me.$msg({
              message: 'successfully deleted',
              onClose() {
                me.$linkTo('/topics')
              },
            })
          })
          .catch((e) => {
            me.$message.error('failed to delete：' + (e.message || e))
          })
      })
    },
    editTopic(topicId) {
      this.$linkTo('/topic/edit/' + topicId)
    },
    switchRecommend(topic) {
      const me = this
      const action = topic.recommend ? 'Cancel recommendation' : 'recommendation'
      this.$confirm(`Confirm${action}this post?`).then(function () {
        me.$axios
          .post('/api/topic/recommend/' + topic.topicId, {
            recommend: !topic.recommend,
          })
          .then(() => {
            me.$msg({
              message: `${action}success`,
            })
          })
          .catch((e) => {
            me.$message.error(`${action}failed:` + (e.message || e))
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #909399;
  font-size: 12px;
}
.el-dropdown-menu__item {
  font-size: 12px;
}
</style>
