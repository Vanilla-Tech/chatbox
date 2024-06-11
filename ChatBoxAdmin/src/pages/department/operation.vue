<template>
  <div class="d-flex">
    <div class="p-2 flex-fill col-8">
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          :name="'operationHour' + this.index"
          class="custom-control-input"
          :id="openingDetail.day"
          v-model="operationHour"
        />
        <label class="custom-control-label" :for="openingDetail.day">{{ openingDetail.day }}</label>
      </div>
    </div>
    <div class="p-2 flex-fill">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          :disabled="!operationHour"
          v-model="operationHourStartTime"
          :name="'operationHourStartTime' + this.index"
          v-mask="'##:##'"
          placeholder="HH:MM"
          v-validate="{ required: operationHour, regex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ }"
          :class="{ input: true, 'is-danger': errors.has('operationHourStartTime' + this.index) }"
        />
        <div class="input-group-prepend">
          <span class="input-group-text transperent">-</span>
        </div>
        <input
          type="text"
          class="form-control"
          :disabled="!operationHour"
          :name="'operationHourEndTime' + this.index"
          v-model="operationHourEndTime"
          v-validate="{ required: operationHour, regex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ }"
          v-mask="'##:##'"
          placeholder="HH:MM"
          :class="{ input: true, 'is-danger': errors.has('operationHourEndTime' + this.index) }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['store', 'index', 'openingDetail'],
  name: 'operationComponent',
  inject: ['$validator'],

  computed: {
    operationHour: {
      get() {
        return this.store.state.department.department.openingDetails[this.index].isActive
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'openingDetails',
          value: value,
          property: 'isActive',
          index: this.index
        })

        if (!value) {
          this.operationHourStartTime = ''
          this.operationHourEndTime = ''
        }
      }
    },
    operationHourStartTime: {
      get() {
        return this.store.state.department.department.openingDetails[this.index].openingTimeStr
      },
      set(value) {
        var inMinutes = ''
        if (value.length == 5) {
          var pcs = value.split(':')
          inMinutes = parseInt(pcs[0]) * 60 + parseInt(pcs[1])
        }

        inMinutes = inMinutes + ''

        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'openingDetails',
          value: inMinutes,
          property: 'openingTime',
          index: this.index
        })

        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'openingDetails',
          value: value,
          property: 'openingTimeStr',
          index: this.index
        })
      }
    },
    operationHourEndTime: {
      get() {
        return this.store.state.department.department.openingDetails[this.index].closingTimeStr
      },
      set(value) {
        var inMinutes = ''
        if (value.length == 5) {
          var pcs = value.split(':')
          inMinutes = parseInt(pcs[0]) * 60 + parseInt(pcs[1])
        }

        inMinutes = inMinutes + ''

        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'openingDetails',
          value: inMinutes,
          property: 'closingTime',
          index: this.index
        })

        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'openingDetails',
          value: value,
          property: 'closingTimeStr',
          index: this.index
        })
      }
    }
  }
}
</script>
