<template>
  <div>
    <van-cell center :title="name" :label="author +' -- '+ name">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" size=".6rem" @click="play"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    author: String,
    id: Number
  },
  methods: {
    play () {
      this.$router.push ({
        path: '/play',
        query: {
          id: this.id // 通过路由跳转传递过去
        }
      })
    }
  }
}
</script>

<style scoped>

</style>