<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <Title :title="site.title"></Title>
      <v-spacer></v-spacer>
      <site-sign></site-sign>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" width="400">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <Menu :items="site.menu"></Menu>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer :footer="site.footer"></Footer>
  </v-app>
</template>

<script>
import Title from '@/views/site/Title.vue'
import Footer from '@/views/site/Footer.vue'
import Menu from '@/views/site/Menu.vue'
import SiteSign from '@/views/site/Sign.vue'

export default {
  name: 'App',
  components: {
    Title,
    Footer,
    Menu,
    SiteSign
  },
  data () {
    return {
      drawer: false,
      site: {
        menu: [{
          icon: 'mdi-home',
          title: 'home',
          subItems: [
            { title: 'Dashboard', to: '/' },
            { title: 'About', to: '/about' }
          ]
        },
        {
          icon: 'mdi-account',
          title: 'about',
          active: true,
          subItems: [
            { title: 'xxx', to: '/about' }
          ]
        }],
        title: '나의 타이틀123',
        footer: '푸터입니다'
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (snapshot) => {
        if (!snapshot.val()) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = snapshot.val()
      }, (e) => { console.log(e.message) })
    }
    /* save () {
      this.$firebase.database().ref().child('site').set({
        title: 'abcd', text: 'ttttt'
      })
    },
    read () {
      this.$firebase.database().ref().on('value', function (snapshot) {
        console.log(snapshot.val())
      })
    },
    async readone () {
      const sn = await this.$firebase.database().ref().once('value')
      console.log(sn.val())
    } */
  }
}
</script>
