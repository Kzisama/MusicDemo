// api文件夹下 各个请求模块js, 都统一来到index.js再向外导出
import {recommendMusic, newMusic} from './Home'
import {hotSearch, getHotSearchList} from './Search';
import {getSongById, getLyricById} from './Play';

export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出
export const newMusicAPI = newMusic // 最新歌单
export const hotSearchAPI = hotSearch  // 热搜表单
export const getHotSearchListAPI = getHotSearchList  // 热搜详情表单
export const getSongByIdAPI = getSongById // 获取播放歌曲
export const getLyricByIdAPI = getLyricById // 获取播放歌曲
