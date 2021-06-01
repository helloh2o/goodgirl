<template>
  <div>
    <el-dropdown
      placement="bottom"
      trigger="hover"
      @command="handlePostCommand"
    >
      <span class="el-dropdown-link">
        <el-button type="primary" icon="el-icon-plus">Publish</el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="topic" icon="iconfont icon-topic"
          >Post topic</el-dropdown-item
        >
        <el-dropdown-item command="article" icon="iconfont icon-article"
          >Post an article</el-dropdown-item
        >
        <el-dropdown-item command="tweet" icon="iconfont icon-tweet2"
        >Tweet</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    handlePostCommand(cmd) {
      if (cmd === 'topic') {
        this.$linkTo('/topic/create')
      } else if (cmd === 'tweet') {
        // this.$linkTo('/tweets')
        this.$linkTo('/topic/create?type=1')
      } else if (cmd === 'article') {
        this.$linkTo('/article/create')
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
