<template>
  <div class="new">
    <h1>注册界面</h1>
    <div style="margin: 30px 0;"></div>
    <el-form ref="newform" :model="newform" label-width="200px">
      <el-row :gutter="24">
        <!-- <el-col :span="15" :offset="2"> -->
        <el-col :span="18">
          <el-form-item label="用户ID" required>
            <el-input type="text" v-model="newform.userId" placeholder="ID必须是唯一的"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="用户姓名">
            <el-input type="text" v-model="newform.userName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="用户地址">
            <el-input type="text" v-model="newform.userddress" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别">
            <el-radio-group v-model="newform.usersex">
              <el-radio label="男" value="男"></el-radio>
              <el-radio label="女" value="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item label="用户头像" required>
            <el-upload
              action
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleImgChange"
              :auto-upload="false"
              :limit="1"
              :class="{hide:hideUploadCard}"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <div ></div> -->
      <el-row style="margin: 30px 0;">
        <el-button type="primary" @click="onSubmit()">创建</el-button>
        <el-button @click="onCancel()">清空</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "new",
  components: {},
  data() {
    return {
      newform: {},
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadCard: false,

      image: "", //64转码后的图像
    };
  },

  created() {},

  methods: {
    handleRemove(file, fileList) {
      console.log("img文件移除时");
      this.hideUploadCard = fileList.length >= 1;
    },

    handlePictureCardPreview(file) {
      console.log("img文件预览时");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleImgChange(file, fileList) {
      console.log("img文件发生改变时");
      this.hideUploadCard = fileList.length >= 1; //通过change方法来改变hideUploadCard

      this.getBase64(file.raw).then((res) => {
        // console.log(res);
        this.image = res;
      });
    },

    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },

    onSubmit() {
      this.$http
        .post("http://10.168.1.150:8802/ai_addFace", {
          // .post("/api/ai_addFace", {
          image: this.image,
          userId: this.newform.userId,
        })
        .then((res) => {
          console.log(res);
          if (res.data.flag == "successful") {
            alert(res.data.result + " 成功!");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("注册失败！");
        });
    },

    onCancel() {
      this.newform = {};
    },
  },
};
</script>

<style>
.new {
  /* background-color: red; */
  margin: 0 auto;
  width: 650px;
  /* height:80px;  */
  border: 1px solid;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>