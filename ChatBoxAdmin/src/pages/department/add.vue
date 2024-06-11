<template>
  <div>
    <department-component :store="$store" :mode="mode" />
  </div>
</template>
<script>
import departmentComponent from './departmentcomponent'

export default {
  props: ['mode'],
  components: { departmentComponent }
}
</script>
