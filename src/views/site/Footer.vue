<template>
  <v-footer app>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() + footer }}</div>
      <v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title>
            푸터 수정
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="text" outlined label="제목" @keypress.enter="save" hide-details=""></v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-footer>
</template>

<script>
export default {
  props: {
    footer: String
  },
  data () {
    return {
      dialog: false,
      text: this.footer
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    save () {
      this.$firebase.database().ref().child('site').update({ footer: this.text })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
