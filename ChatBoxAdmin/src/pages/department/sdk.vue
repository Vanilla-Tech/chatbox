<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3>SDK/Script</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container pad-top15">
        <codemirror :value="code" :options="editorOption"></codemirror>
        <hr />
        <h1>Example</h1>
        <codemirror :value="example" :options="editorOption"></codemirror>
      </div>
    </div>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite'
export default {
  props: ['mode', 'id'],
  components: { codemirror },
  beforeRouteEnter(from, to, next) {
    next(p => {
      p.$store.dispatch('department/setDepartment', { id: from.params.id })
    })
  },
  data() {
    return {
      editorOption: {
        theme: 'rubyblue',
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        autoCloseTags: true,
        line: true,
        mode: 'text/javascript',
        readOnly: true
      },
      code: `
      // Include following in document's body section
      <div id="mta_chat"></div>
      
      // Call this before the below script
      <script>
            var mtaChatOptions = {
                 departmentCode : '<DEPARTMENTCODE>',
                 channelCode : '<CHANNELCODE>'
            }
      <\/script>

      // Lastly call the main js script
      <script src="${process.env.VUE_APP_API_URL}mtachat.min.js"><\/script>
      `,
      example: `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      </head>
      <body>
          <div id="mta_chat"></div>
          <script>        
              var mtaChatOptions = {
                departmentCode : '<DEPARTMENTCODE>',
                channelCode : '<CHANNELCODE>'
              }
          <\/script>
          <script src="${process.env.VUE_APP_API_URL}mtachat.min.js"><\/script>
      </body>
      </html>
      `
    }
  }
}
</script>
