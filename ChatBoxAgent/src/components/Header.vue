<template>
  <div class="agent-wrapper">
    <div class="agent-header agentHeader" id="agentHeader">
      <div class="row" style="margin:0;">
        <div class="left-header col-md-9">
          <img src="/img/logo.png" />
        </div>
        <!--end Left header-->
        <div class="right-header col-md-3">
          <div class="status">
            <label class="switch">
              <input type="checkbox" v-model="isOnline" />
              <span class="slider round"></span>
            </label>
            <span class="stat">{{ status }}</span>
          </div>
          <div class="user-avator">
            <!-- Navbar dropdowns -->
            <div>
              <b-dropdown id="dropdown-1" right text="Admin" variant="primary">
                <template slot="button-content">
                  <img src="/img/user.svg" />
                  <!-- <i class="fas fa-ellipsis-v"></i> -->
                </template>
                <div>
                  <div class="form-group">
                    <small>Agent Name</small>
                    <label>{{ this.$store.state.auth.authUser.name }}</label>
                  </div>
                  <div class="form-group">
                    <small>Staff ID</small>
                    <label
                      style="
    word-break: break-word;
"
                    >{{ this.$store.state.auth.authUser.staffId }}</label>
                  </div>
                  <div class="form-group">
                    <small>Email</small>
                    <label>{{ this.$store.state.auth.authUser.email }}</label>
                  </div>
                  <div class="form-group">
                    <small>Department</small>
                    <div class="depart-list">
                      <label
                        v-for="item in this.$store.state.auth.authUser.departmentName.split('|')"
                        v-bind:key="item"
                      >{{ item }}</label>
                    </div>
                  </div>
                  <button class="btn-block btn btn-logout" @click="logout">Logout</button>
                </div>
              </b-dropdown>
            </div>
          </div>
        </div>
        <!--end user-avator-->
      </div>
    </div>
    <!--end Right header-->
  </div>
</template>

<script>
import { chatactions } from '../helpers/applicationconstants'
export default {
  data() {
    return {
      status: this.$store.state.socket.isOnline === true ? 'Online' : 'Away'
    }
  },
  computed: {
    getTitle() {
      return this.$store.state.auth ? this.$store.state.auth.title : 'Chat Box'
    },
    isOnline: {
      get() {
        return this.$store.state.socket.isOnline
      },
      set(value) {
        this.$store.commit('socket/SET_AGENT_STATUS', value)
        this.status = value === true ? 'Online' : 'Away'
        this.$socket.emit(chatactions.AGENTAWAY, {
          agentSessionId: this.$store.state.socket.agentSessionId,
          status: value === true ? 'ONLINE' : 'AWAY'
        })
      }
    }
  },
  methods: {
    logout() {
      this.$socket.emit(chatactions.AGENTLOGOFF, {
        agentSessionId: this.$store.state.socket.agentSessionId
      })
      this.$store.dispatch('auth/logout').then(() => {
        this.$store.commit('socket/RESET')
        this.$router.push('/login')
      })
    }
  }
}
</script>
