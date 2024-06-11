<script>
import axios from 'axios'
export default {
  name: 'Base',
  data() {
    return {
      url: { list: '', edit: '', update: '', add: '', init: '', delete: '' },
      vModel: {},
      isProcessing: false,
      data: [],
      filter: null,
      sort: null,
      pageable: true,
      skip: 0,
      take: 10,
      columns: []
    }
  },
  methods: {
    pageChangeHandler: function(event) {
      this.skip = event.page.skip
      this.take = event.page.take
      this.getData()
    },
    filterChange: function(ev) {
      this.skip = 0
      this.take = 10
      this.filter = ev.filter
      this.getData()
    },
    sortChangeHandler: function(e) {
      this.sort = e.sort
      this.getData()
    },
    getData: function() {
      var sort = []
      if (this.sort != null) sort = this.sort

      var filter = { filters: [] }
      if (this.filter != null) filter = this.filter

      axios
        .post(this.url.list, {
          take: this.take,
          skip: this.skip,
          sort: sort,
          filter: filter
        })
        .then(res => {
          this.data = res.data
        })
    },
    createAppState: function(dataState) {
      this.group = dataState.group
      this.take = dataState.sort
      this.skip = dataState.skip
      this.filter = dataState.filter
      this.sort = dataState.sort

      this.getData()
    },
    dataStateChange: function(event) {
      this.createAppState(event.data)
    }
  },

  props: ['id', 'mode']
}
</script>
