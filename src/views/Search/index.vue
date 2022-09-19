<template>
  <div>
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @input="inputFn"/>
    <div class="search_wrap" v-if="searchList.length===0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span class="hot_item" v-for="(obj,index) in hotList" :key="index" @click="btn(obj.first)">{{
            obj.first
          }}</span>
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell-group v-for="obj in searchList" :key="obj.id">
          <!--  <van-cell center :title="obj.name" :label="obj.name+' &#45;&#45; '+ obj.ar[0].name">-->
          <!--    &lt;!&ndash; 使用 right-icon 插槽来自定义右侧图标 &ndash;&gt;-->
          <!--    <template #right-icon>-->
          <!--      <van-icon name="play-circle-o" size=".6rem"/>-->
          <!--    </template>-->
          <!--  </van-cell>-->
          <SongItem :name="obj.name" :author="obj.song.artists[0].name" :id="obj.id"></SongItem>
        </van-cell-group>
      </van-list>

    </div>

  </div>
</template>

<script>
import {hotSearchAPI, getHotSearchListAPI} from '@/api';
import SongItem from '@/components/SongItem';

export default {
  components: {
    hotSearchAPI,
    getHotSearchListAPI,
    SongItem
  },
  data () {
    return {
      value: '',
      hotList: [], // 热门搜索
      searchList: [], // 搜索结果
      loading: false,  // loading 为 false，触底后会触发onload事件，同时将loading修改为true
      finished: false, // finished 为 true，表示数据全部加载完成
      page: 1,  // 当前页码
      timer: null
    };
  },
  methods: {
    async getListFn () {
      return getHotSearchListAPI ({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20  // 默认公式
      }); // 返回一个promise对象
      //  这个promise对象的结果就是 getListFn 的返回值
      //  用await来提取返回的结果
    },
    async btn (val) {
      this.page = 1  // 让页面回到第一页
      this.value = val
      const re = await this.getListFn ()
      console.log (re)
      this.searchList = re.data.result.songs
    },
    async inputFn () { // 输入内容查询相关列表
      // 实现输入框防抖
      if (this.timer) clearTimeout (this.timer)
      setTimeout (async () => {
        this.page = 1  // 让页面回到第一页
        if (this.value.trim ().length === 0) {
          this.searchList = []  // 清空数组，直接reuturn 阻止请求发送
          return
        }
        const re = await this.getListFn ()
        if (re.data.result.songs === undefined) { // 没有songs这个属性，表示没有数据
          this.searchList = []
          return
        }
        this.searchList = re.data.result.songs
      }, 500)
    },
    async onLoad () { // 触底事件（加载下一页的数据）--会将loading修改为true，
      this.page++
      const re = await this.getListFn ()
      if (re.data.result.songs === undefined) { // 没有songs这个属性，表示没有数据
        this.finished = true // 再次触底时不会再触发onload事件
        return
      }
      this.searchList = [...this.searchList, ...re.data.result.songs]
      this.loading = false // 数据加载完毕--保证下一次还能触发onload事件
    }
  },
  async created () {
    const res = await hotSearchAPI ()
    this.hotList = res.data.result.hots
  },

}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>