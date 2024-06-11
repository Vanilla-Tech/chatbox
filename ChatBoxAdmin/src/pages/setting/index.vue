<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div>
          <b-tabs class="setting-tab">
            <b-tab title="Customer" active>
              <tab-component
                name="customerTab"
                :state="$store.state.setting.setting.customer"
                :store="this.$store"
                :control="'SET_CUSTOMER_DATA'"
              />
            </b-tab>
            <b-tab title="Agent/Admin">
              <tab-component
                name="AgentAdmin"
                :state="$store.state.setting.setting.agent"
                :store="this.$store"
                :control="'SET_AGENT_DATA'"
              />
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <!--end page header-->
  </div>
</template>

<script>
import Base from '../../shared/base'

import TabComponent from './tabcomponet'
export default {
  extends: Base,
  components: { TabComponent },
  beforeRouteEnter(from, to, next) {
    next(p => {
      p.$store.dispatch('setting/setTitle', { title: 'Edit User' })
      p.$store.dispatch('setting/setSetting')
    })
  },

  methods: {}
}
</script>
