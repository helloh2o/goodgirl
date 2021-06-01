<template>
  <div class="widget markdown-help">
    <div class="widget-header">
      Markdown Grammar reference
    </div>
    <div class="widget-content content">
      <ol>
        <li>
          <span style="font-weight: 700; color: red;"
            >Copy or drag the picture into the editor to upload</span
          >
        </li>
        <li>## Single-line heading</li>
        <li>**Bold**</li>
        <li>`console.log('Inline code')`</li>
        <li>```js\n code \n``` Mark code block</li>
        <li>[Content] (link)</li>
        <li>![Text description](Image link)</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.markdown-help {
  .content {
    font-size: 12px !important;
  }
}
</style>
