<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="publishFn">
          <fieldset>
            <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title" required>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?" required>
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)" required></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { publishArticle } from '@/api/articles'
export default {
  name: 'editor',
  middleware: 'authenticated',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      }
    }
  },
  methods: {
    publishFn() {
      publishArticle({article: this.article})
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
