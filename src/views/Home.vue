<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <add msg="欢迎注册 人脸识别Ai系统！"></add> -->
    <h1>这里 首页日历</h1>

    <el-calendar v-model="value">
    </el-calendar>


  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
.home {
  /* background-color: red; */
   margin:0 auto; 
   width: 1000px; 
   /* height:80px;  */
   border:1px solid 
}



</style>