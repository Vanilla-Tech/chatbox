<template>
  <div>
    <form @submit.prevent="forwardChat">
      <div class="modal-body">
        <div
          class="forward-section"
          style="max-height:400px;overflow-y:scroll;"
          v-if="
            (forwardChatDetails &&
              forwardChatDetails.availableAgents &&
              forwardChatDetails.availableAgents.length > 0) ||
              (forwardChatDetails &&
                forwardChatDetails.availableDepartments &&
                forwardChatDetails.availableDepartments.length > 0)
          "
        >
          <div class="accordion">
            <div
              v-if="
                forwardChatDetails &&
                  forwardChatDetails.availableAgents &&
                  forwardChatDetails.availableAgents.length > 0
              "
            ></div>
          </div>

          <div class="accordion" id="accordionExample">
            <div
              v-for="(item, index) in forwardChatDetails.availableAgents"
              :key="item.code"
              class="card"
            >
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <b-button
                    v-b-toggle="'collapse-' + index"
                    variant="link"
                    class="btn btn-link"
                    type="button"
                  >
                    {{ item.name }}
                    <span>
                      <i class="fas fa-chevron-down"></i>
                    </span>
                  </b-button>
                </h2>
              </div>
              <b-collapse :id="'collapse-' + index" class="mt-2">
                <b-card>
                  <div class="card-body">
                    <ul class="agent-list">
                      <div v-for="(it, ind) in item.agents" :key="it.agentEmail">
                        <li>
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              :id="'customAgentRadio' + index + ind"
                              v-model="forwardActionDetails.selectedAgent"
                              :name="'customAgentRadio' + index"
                              class="custom-control-input"
                              :value="it.agentId + '|' + index + ind"
                            />
                            <label
                              class="custom-control-label"
                              :for="'customAgentRadio' + index + ind"
                            >
                              {{ it.agentName + '(' + it.staffId + ')' }}
                            </label>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </b-card>
              </b-collapse>
            </div>

            <div class="card">
              <div
                v-for="(item, index) in forwardChatDetails.availableDepartments"
                :key="item.code"
                class="card-header"
                id="headingTwo"
              >
                <h2 class="mb-0">
                  <div class="custom-control custom-radio">
                    <input
                      type="radio"
                      :id="'customRadio' + index"
                      name="customRadio"
                      class="custom-control-input"
                      v-model="forwardActionDetails.selectedDepartment"
                      :value="item.code"
                    />
                    <label class="custom-control-label btn-link" :for="'customRadio' + index">{{
                      item.name
                    }}</label>
                  </div>
                </h2>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-block btn-forward" type="submit">Forward</button>
          </div>
        </div>
        <i v-else style="font-style:italic;color:grey;"
          >No Departments/Agents are available for Chat Forwarding.</i
        >
      </div>
    </form>
  </div>
</template>
<script>
export default {
  inject: ['$validator'],
  name: 'forwardchat',
  data: function() {
    return {
      forwardActionDetails: {
        selectedAgent: null,
        selectedDepartment: null
      }
    }
  },
  props: ['forwardChatDetails'],
  methods: {
    forwardChat() {
      const that = this
      if (
        that.forwardActionDetails.selectedAgent !== null ||
        that.forwardActionDetails.selectedDepartment !== null
      ) {
        that.$emit('chatForwarded', that.forwardActionDetails)
        that.reinitializeForwardChat()
      }
    },
    reinitializeForwardChat() {
      this.forwardActionDetails = {
        selectedAgent: null,
        selectedDepartment: null
      }
    }
  }
}
</script>
