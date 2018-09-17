import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Hello from '@/components/Hello'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    }, {
      path: '/posts',
      name: 'posts',
      component: Posts
    }, {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }, {
      path: 'posts/:id',
      name: 'EditPost',
      component: EditPost
    }
  ],
  mode: 'history'
})
