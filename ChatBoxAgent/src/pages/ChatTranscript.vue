<template>
  <div>
    <p class="msg">{{ message }}</p>
    {{ downloadTranscript }}
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      message: 'Downloading Transcript...',
      chatId: this.$route.params.chatId
    }
  },
  computed: {
    downloadTranscript() {
      var that = this
      var url = '/chat/downloadChatTranscript/' + this.chatId

      axios({
        url: url,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', response.headers['filename'])
        document.body.appendChild(link)
        this.message = 'Download Completed...'
        link.click()

        window.top.close()

        var win = window.open('about:blank', '_self')
        win.close()
      })
    }
  },
  mounted() {},
  methods: {},
  directives: {}
}
</script>

<style>
.msg {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 20% auto;
}
</style>
