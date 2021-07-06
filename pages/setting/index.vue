<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ message}}
            </li>
          </template>
        </ul>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.url" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="userInfo.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" v-btnPreventReClick @click.prevent="submitFn">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { updateUser } from '@/api/user'
import { setTimeout } from 'timers';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'setting',
  middleware: 'authenticated',
  data() {
    return {
      userInfo: {},
      errors: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.userInfo = {
      url: this.user.image,
      username: this.user.username,
      bio: this.user.bio,
      email: this.user.email,
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    //  退出登录
    logout() {
      this.setUser(null)
      Cookie.set('user', null)
      this.$router.replace({name: 'login'})
    },
    // 提交更改
    async submitFn() {
      try {
        const {data = {}} = await updateUser({user: this.userInfo})
        // 把获取到的最新信息更新到 state 中
        this.setUser(data.user) 
        // 更新服务端数据持久化
        Cookie.set('user',data.user)
        this.$router.push(`/profile/${data.user.username}`)
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
