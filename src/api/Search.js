// 搜索模块
import request from '@/util/request';

export const hotSearch = params => request ({
    url: '/search/hot',
    params
})

export const getHotSearchList = params => request ({
    url: '/cloudsearch',
    params
})