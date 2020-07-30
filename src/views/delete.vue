<template>
  <div class="delete">
    <h1>删除界面</h1>
    <div style="margin: 30px 0;" class="divclass">
      <el-form ref="form" :model="form" label-width="180px">
        <el-row :gutter="24">
          <el-col :span="18">
            <el-form-item label="用户ID" required>
              <el-input type="text" v-model="form.userId" placeholder="ID必须是唯一的"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" >
              <el-button  size="small" type="primary"  plain>点击查询</el-button>
          </el-col>-->
          <el-col :span="18">
            <el-form-item label="用户姓名">
              <el-input type="text" v-model="form.userName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0;">
          <el-button type="danger" @click="Commit()">删除</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- <div style="margin: 40px 40px;" class="divclass">
      <el-divider content-position="left">查询结果</el-divider>
      <el-row :gutter="24">
          <el-col :span="18" >
            <el-form-item label="用户头像" required>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary" plain>点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row> 

    </div>-->
  </div>
</template>

<script>
export default {
  name: "delete",
  components: {},
  data() {
    return {
      form: {},
      fileList: [],
    };
  },
  methods: {
    Commit() {
      console.log("开始search！");
      this.$http
        .post("http://10.168.1.150:8802/ai_deleteUser", {
        // .post("/api/ai_deleteUser", {
          userId: this.form.userId,
        })
        .then((res) => {
          console.log(res);
          if (res.data.flag == "successful") {
            alert(res.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("删除失败！");
        });
    },

    onCancel() {
      this.form = {};
      this.fileList = [];
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
.delete {
  /* background-color: red; */
  margin: 0 auto;
  width: 650px;
  /* height:80px;  */
  border: 1px solid;
}
</style>