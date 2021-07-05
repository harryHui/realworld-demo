<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <article-meta :article="article" :username="user.username"/>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article" :username="user.username"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <article-components :article="article" :user="user" v-if="user"/>
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { mapState } from "vuex"
import { getArticle } from '@/api/articles.js'
import ArticleMeta from './components/article-meta.vue'
import ArticleComponents from './components/article-components.vue'
import MarkdownIt from 'markdown-it'
export default {
  name: 'article',
  async asyncData({params}) {
    const { data: { article } } = await getArticle(params.slug)
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return { article }
  },
  components: {ArticleMeta, ArticleComponents},
  head() {
    return { // seo 优化
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.discription
        }
      ]
    }
  },
  computed: {
    ...mapState(["user"]),
  }
}
</script>

<style lang='scss' scoped>

</style>
