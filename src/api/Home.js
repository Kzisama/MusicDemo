// 统一封装请求方式 -- 与模块名相同，方便查找
import request from '@/util/request';

// 获取推荐歌单
export const recommendMusic = params => request ({
    url: '/personalized',
    params
    // 将来外面可能传入params的值 {limit: 20}
})

export const newMusic = params => request ({
    url: '/personalized/newsong',
    params
})

