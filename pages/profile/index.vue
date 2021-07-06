<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="curUserInfo.image" class="user-img" />
          <h4>{{curUserInfo.username}}</h4>
          <p>
            {{curUserInfo.bio}}
          </p>
          <template v-if="user.username===curUserInfo.username">
            <nuxt-link class="btn btn-sm btn-outline-secondary action-btn" to="/setting">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </template>
          <template v-else>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="curUserInfo.followDisabled"
              @click="onFollow(curUserInfo)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{curUserInfo.following?`Unfollow&nbsp;`:`Follow `}}{{curUserInfo.username}}
            </button>
          </template>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active:tab==='My'}"
                  :to="{name:'profile',params:{username}}"
                  exact
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active:tab==='Favorited'}"
                  exact
                  :to="{name:'profile',query:{tab:'Favorited'},params:{username}}"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{name:'article',params:{slug:article.slug}}">
              <img
                :src="article.author.image?article.author.image:'http://i.imgur.com/N4VcUeJ.jpg'"
              />
            </nuxt-link>
            <div class="info">
              <a class="author" href="#">{{article.author.username}}</a>
              <span class="date">{{article.createdAt | date}}</span>
            </div>
            <button
              :disabled="article.favoriteDisabled"
              class="btn btn-sm pull-xs-right"
              :class="article.favorited?'btn-primary':'btn-outline-primary'"
              @click="onFavorite(article)"
            >
              <i class="ion-heart"></i>
              {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li
                class="tag-default tag-pill tag-outline"
                v-for="(tag,i) in article.tagList"
                :key="i"
              >{{tag}}</li>
            </ul>
          </nuxt-link>
        </div>

        <nav>
          <ul class="pagination">
            <li
              v-for="item in totalPage"
              :key="item"
              :class="['page-item', {active:item===page}]"
            >
              <nuxt-link class="page-link" :to="{name:'profile',query:{page:item,tab},params:{username}}">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>

</div>

</template>

<script>
import { mapState } from 'vuex'
import {
  getArticles,
  addFollow,
  deleteFollow,
  deleteFavorite,
  addFavorite
} from "@/api/articles"
import { getProfiles } from "@/api/profile"
export default {
  name: 'UserProfile',
  middleware: 'authenticated', // 当前页面是否路由鉴权
  watchQuery: ["tab", "page"],
  computed: {
    ...mapState(['user']),
    totalPage (){
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  async asyncData({params, query}) {
    const { tab = "My", page = 1 } = query;
    const { username } = params;
    const limit = 10;
    const offset = (page - 1) * limit;
    const articleType = tab === "My" ? "author" : "favorited";
    const [profileRes, articlesRes] = await Promise.all([
      getProfiles(encodeURI(username)),
      getArticles({ limit, offset, [articleType]: username })
    ])
    const curUserInfo = profileRes.data.profile || {}
    console.log(curUserInfo)
    const { articles, articlesCount } = articlesRes.data
    curUserInfo.followDisabled = false
    articles.forEach((f) => (f.favoriteDisabled = false))
    return {
      tab,
      page,
      limit,
      curUserInfo,
      articles,
      articlesCount,
      username
    }
  },
  methods: {
    async onFollow(profile) {
      try {
        if (!profile.username) return this.$router.push("/login");
        profile.followDisabled = true; // 禁用点击
        if (profile.following) {
          // 取消关注
          await deleteFollow(profile.username);
          profile.following = false;
        } else {
          // 添加关注
          await addFollow(profile.username);
          profile.following = true;
        }
        profile.followDisabled = false; // 允许点击
      } catch (err) {
        console.log(err);
        profile.followDisabled = false; // 允许点击
      }
    },
    async onFavorite(article) {
      try {
        if (!this.profile.username) return this.$router.push("/login");
        article.favoriteDisabled = true; // 禁用点击
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount -= 1;
        } else {
          // 添加点赞
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount += 1;
        }
        article.favoriteDisabled = false; // 允许点击
      } catch (err) {
        console.log(err);
        article.favoriteDisabled = true; // 禁用点击
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
