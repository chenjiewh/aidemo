<template>
  <div class="about">
    <img alt="logo" src="@/assets/logo1.png">
    <h1>This is an about page</h1>
    <h1>这里用于介绍功能</h1>

    <!-- <add msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>


<script>
// @ is an alias to /src
import add from '@/components/add.vue'

export default {
  name: 'about',
  components: {
    add
  }
}
</script>
