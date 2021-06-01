<template>
  <footer class="footer">
    <div class="container content">
      <div>
        <a href="/about">About</a>
        <a href="/tags">Tags</a>
        <a href="/links">Link</a>
      </div>
      <div>
        © 2021 Powered by
        <a href="http://cowxy.pro" target="_blank" class="light"
          >Cow Proxy</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  font-size: 14px;
  color: #666;
  background: none;
  text-align: left;
  margin: 0 10px;
  a {
    color: #666;
    text-decoration: none;
  }

  .light {
    color: #eb5424;
    font-weight: bold;
  }
}
</style>
