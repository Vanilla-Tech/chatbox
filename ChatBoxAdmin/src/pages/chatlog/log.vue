<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3>Chat Log</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container pad-top15 pad-bottom15">
        <div class="col-md-12">
          <table class="table" width="100%">
            <tbody>
              <template v-for="(item, index) in logs">
                <span v-bind:key="index"></span>
                <tr v-if="index === 0">
                  <td colspan="3">
                    <b>Chat Start Time: {{ getUtcToLocalDate(item.timeStamp) | moment('LLL') }}</b>
                  </td>
                </tr>
                <tr>
                  <td>{{ getUtcToLocalDate(item.timeStamp) | moment('LLL') }}</td>
                  <td>{{ item.isAgent === true ? item.agentName : item.customerName }}</td>
                  <td style="word-break: break-word;">
                    {{ formattedMessage(chatEncryptor.decrypt(item.message)) }}
                  </td>
                </tr>
                <tr v-if="index === logs.length - 1">
                  <td colspan="3">
                    <b>Chat End Time: {{ getUtcToLocalDate(item.timeStamp) | moment('LLL') }}</b>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="foot-wrap">
          <button class="btn btn-primary" @click="downloadTranscript">
            <i class="fas fa-file-download"></i> Download Transcript
          </button>
          <router-link class="btn btn-danger" to="/chatlog">
            <i class="fas fa-chevron-circle-left"></i> Back
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import BContainer from 'bootstrap-vue/src/components/layout/container'

var chatEncryptor = require('../../plugins/aes.js').default
import axios from 'axios'

export default {
  //components: { BContainer },
  beforeRouteEnter(from, to, next) {
    next(p => {
      p.$store.dispatch('chat/getChatLog', { id: from.params.id }).then(res => {
        p.logs = res[0].data
        p.id = from.params.id
      })
    })
  },
  data() {
    return {
      id: '',
      logs: [],
      chatEncryptor: chatEncryptor
    }
  },
  methods: {
    formattedMessage(content) {
      // eslint-disable-next-line no-useless-escape
      let exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      var element_content = content.replace(exp_match, "<a target='_blank' href='$1'>$1</a>")
      // eslint-disable-next-line no-useless-escape
      var new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim
      var new_content = element_content.replace(
        new_exp_match,
        '$1<a target="_blank" href="http://$2">$2</a>'
      )
      return new_content
    },
    getUtcToLocalDate(datestring) {
      return new Date(datestring)
    },
    downloadTranscript() {
      axios({
        url: '/chat/download/' + this.id,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', response.headers['filename'])
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
