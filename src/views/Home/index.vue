<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in reList" :key="obj.id">
        <van-image
            width="100%"
            height="3rem"
            fit="cover"
            :src="obj.picUrl"
        />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title" style="margin-bottom: 0">最新歌单</p>
    <van-cell-group v-for="obj in newList" :key="obj.id">
      <!-- <van-cell center :title="obj.name" :label="obj.song.artists[0].name+' &#45;&#45; '+obj.name">-->
      <!--   &lt;!&ndash; 使用 right-icon 插槽来自定义右侧图标 &ndash;&gt;-->
      <!--   <template #right-icon>-->
      <!--     <van-icon name="play-circle-o" size=".6rem"/>-->
      <!--   </template>-->
      <!-- </van-cell>-->
      <SongItem :name="obj.name" :author="obj.song.artists[0].name" :id="obj.id"></SongItem>
    </van-cell-group>
  </div>
</template>

<script>
import {recommendMusicAPI, newMusicAPI} from '@/api'
import SongItem from '@/components/SongItem';

export default {
  components: {
    recommendMusicAPI,
    newMusicAPI,
    SongItem
  },
  data () {
    return {
      reList: [],
      newList: []
    }
  },
  async created () {
    let reRes = await recommendMusicAPI ({limit: 6})
    this.reList = reRes.data.result
    let newRes = await newMusicAPI ({limit: 20})
    this.newList = newRes.data.result
  }
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}

/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>