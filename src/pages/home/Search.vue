<template>
  <div class="search-bg">
    <HeaderBack @headerAction="submitSearch" :header="header" :color="'rgb(214,83,228)'">
      <div class="home-ipt">
        <!--<img src="./icon-search.png"/>-->
        <input ref="search"
          v-focus
          id="search-ipt"
          v-model="curSearch"
          @keyup.enter="submitSearch"
          @keyup.delete="showSearchHistory"
          class="bg-search-ipt home-ipt-search-bg search-ipt-pos"
          type="text"
          placeholder="输入昵称搜索日记"></div>
    </HeaderBack>
    <!-- 搜索你感兴趣的项目 -->
    <div class="search-history-wrapper" v-show="searches.length !== 0 && !isHasSearched">
      <div class="search-history-title">历史搜索</div>
      <ul class="search-history-list">
        <li v-for="(item,idx) in searches" :key="idx" @click="submitHistorySearch(item)">{{item}}</li>
      </ul>
      <div class="clear-history-wrapper">
        <button class="clear-history-btn" @click="clearHistory"><img class="clear-history-icon" src="./icon-recycle.png">清空搜索历史</button>
      </div>
    </div>
    <div class="mt110 home-search-rst-wrapper" v-show="isHasSearched">
      <div class="cases-wrapper"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="diableLoad"
        infinite-scroll-distance="0">
        <DiaryItem
          v-show="searchRst.length >= 1"
          v-for="diray in searchRst"
          :key="diray.id"
          :diary="diray"
        ></DiaryItem>
      </div>
      <div class="no-search-rst mt20" v-show="searchRst.length !== 0 && allLoaded">无更多搜索结果</div>
      <div class="no-search-rst" v-show="searchRst.length === 0 && allLoaded">无搜索结果</div>
    </div>
  </div>
</template>

<script>
import { SEARCH } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryItem from '@/components/diary/DiaryItem/DiaryItem'
import { Toast, MessageBox } from 'mint-ui'

export default {
  name: 'Search',
  components: {
    HeaderBack,
    DiaryItem,
    Toast
  },
  data () {
    return {
      header: {
        title: '',
        action: '搜索'
      },
      curSearch: '',
      searches: [], // 搜索历史
      searchRst: [], // 搜索结果
      isHasSearched: false, // 搜索结果与搜索历史的切换
      isSearching: false, // 阻止多次重复提交 to do
      isLoading: false, // 长时间未拿到数据时，2s后是否显示loading图标
      // 初始化滚动加载相关参数
      queryLoading: false,
      diableLoad: true, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageNum: 1,
      pageSize: 2
    }
  },
  methods: {
    /* 我想的交互方式： 搜索前，第一次直接显示历史记录，不论是否含有搜索内容；搜索后，马上显示搜索内容，一旦用户删除输入显示搜索历史 */
    /* 历史 与 搜索结果的显示是互斥的 */
    submitSearch () {
      console.log('提交搜索')
      const self = this
      // 判断是否为空
      if (this.curSearch === '') {
        Toast({
          message: `请输入搜索内容`,
          duration: 1000
        })
        return
      }
      let searches = self.searches
      searches.push(self.curSearch)
      localStorage.setItem('searches', JSON.stringify(searches))
      // 进行搜索
      self.pageNum = 1
      self['searchRst'] = []
      self._search(self, 'searchRst', self.curSearch, self.pageNum, self.pageSize)
    },
    submitHistorySearch (content) {
      const self = this
      // 搜索历史搜索
      self.pageNum = 1
      self['searchRst'] = []
      self._search(self, 'searchRst', content, self.pageNum, self.pageSize)
      self.curSearch = content
    },
    showSearchHistory () {
      // 不确定该事件，能否在移动端触发
      // 最初始使用watch实现，但是存在问题，判断变化即显示历史的逻辑显然是不正确的
      this.isHasSearched = false
    },
    clearHistory () {
      console.log('清空')
      localStorage.removeItem('searches')
      this.searches = []
    },
    _search (self, receiverName, content, pageSize, pageNum) {
      SEARCH.diary(content, pageSize, pageNum).then(res => {
        if (res.data.retCode === 0) {
          // 这里可不可以用哨兵呢？
          if (res.data.data.data.length === 0) {
            self.allLoaded = true
            self.diableLoad = true
            self.isHasSearched = true
            return
          }
          self[receiverName] = self[receiverName].concat(res.data.data.data)
          self.queryLoading = false
          self.diableLoad = false
        } else if (res.data.retCode === 1) {
          // 没有数据
          self.queryLoading = false
          self.diableLoad = true
          self.allLoaded = true
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
        self.isHasSearched = true
      })
    },
    _storageSearches () {
      let searches = localStorage.getItem('searches')
      if (searches === null) {
        return []
      }
      return JSON.parse(searches)
    },
    // 无限加载函数
    loadMore () {
      if (this.allLoaded) {
        this.diableLoad = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.pageNum++
      let self = this
      self._search(self, 'searchRst', self.curSearch, self.pageNum, self.pageSize)
    }
  },
  directives: {
    focus: {
      // 指令的定义 -- 初次进入页面，自动获取焦点
      inserted: function (el) {
        el.focus()
      }
    }
  },
  created () {
    this.searches = this._storageSearches('searches')
  }
}
</script>

<style scoped>
.mt20{
  margin-top: .2rem;
}
.mt110{
  margin-top: 1.1rem;
}
.search-bg {
  min-height: 100%;
  background-color: #F8F8F8;
  overflow: auto;
}
.home-ipt input {
    height: .5rem;
    line-height: .5rem;
    width: 5.22rem;
    border-radius: .25rem;
    color: rgb(141,140,142);
    text-align: center;
    font-size: .2rem;
    /* background-color: rgba(255,255,255,.8); */
    border: 0;
}
.home-ipt-search-bg{
  background-image: url("icon-search.png");
  background-repeat: no-repeat;
  background-size: 0.28rem;
  background-position: 1.2rem .1rem;
}
.bg-search-ipt{
  background-color: #F8F8F8;
}
.search-ipt-pos{
  position: relative;
  top: -.04rem;
}

/* 搜索历史 */
.search-history-wrapper{
  position: absolute;
  top: 1.1rem;
  bottom: 0;
  left:0;
  right:0;
  overflow:auto;
  background-color: #fff;
  font-size: .28rem;
  line-height: 1;
  color: rgb(34,34,34);
}
.search-history-title{
  box-sizing: border-box;
  line-height: 1rem;
  height: 1rem;
  /* padding: .4rem 0 .34rem; */
  border-bottom: 1px solid #ebebeb;
  text-indent: .2rem;
}
.search-history-list{
  padding-left: .2rem;
  padding-right: .2rem;
}
.search-history-list > li {
  border-bottom: 1px solid #ebebeb;
  color: rgb(102,102,102);
  padding: .34rem 0 .34rem;
}
/* 清空历史搜索 */
.clear-history-wrapper{
  /* position: absolute; */
  height: 3.1rem;
  line-height: 3.1rem;
  left:0;
  right:0;
  bottom: 0;
  background-color:#fff;
  text-align:center;
}
.clear-history-btn{
  border:1px solid #ebebeb;
  display: inline-block;
  border-radius: .5rem;
  text-align: center;
  width: 5rem;
  height: .84rem;
  line-height: .84rem;
  font-size: .3rem;
  color: rgb(102,102,102);
  background-color: #fff;
}
.clear-history-icon{
    display: inline-block;
    width: .28rem;
    height: .28rem;
    vertical-align: text-bottom;
    margin-right: .1rem;
}
/* 搜索结果 */
.home-search-rst-wrapper{
  /* */
}
/* 无搜索结果 */
.no-search-rst{
  text-align: center;
}
</style>
