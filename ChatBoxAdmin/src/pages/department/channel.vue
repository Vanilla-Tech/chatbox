<template>
  <div class="col-3">
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        :id="channel.code"
        v-model="channelComputed"
      />
      <label class="custom-control-label" :for="channel.code">{{ channel.label }}</label>
    </div>
  </div>
</template>
<script>
export default {
  props: ['store', 'index', 'channel'],
  name: 'channelComponent',

  computed: {
    channelComputed: {
      get() {
        return this.store.state.department.department.channels[this.index].isChecked
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'channels',
          value: value,
          property: 'isChecked',
          index: this.index
        })
      }
    }
  }
}
</script>
