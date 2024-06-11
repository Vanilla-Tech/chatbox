<template>
  <div>
    <department-component :store="$store" :mode="mode" :id="id" />
  </div>
</template>
<script>
import departmentComponent from './departmentcomponent'
export default {
  props: ['mode', 'id'],
  components: { departmentComponent },
  beforeRouteEnter(from, to, next) {
    next(p => {
      p.$store.dispatch('department/setDepartment', { id: from.params.id })
    })
  }
}
</script>
