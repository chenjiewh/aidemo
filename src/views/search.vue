<template>
  <div class="compare">
    <h1>搜索界面</h1>
    <div style="margin: 30px 0;"></div>
    <el-form label-width="215px">
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item label="用户头像1" required>
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
        <el-col :span="18">
          <el-form-item label="搜索N个数" required>
            <el-input-number type="text" v-model="number" placeholder="搜索前N位"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 30px 0;">
        <el-button type="primary" @click="Commit()">开始搜索</el-button>
        <!-- <el-button @click="Cancel()">取消操作</el-button> -->
      </el-row>
    </el-form>

    <div style="margin: 60px 30px;" v-if="this.div_result">
      <h1>结果</h1>
      <el-table :data="tableData" border :header-cell-style="{background:'#6699ff',color:'#fff'}">
        <div slot="empty">暂无数据</div>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="image" label="头像" align="center" min-width="200">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.image" ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" align="center" min-width="100"></el-table-column>
        <el-table-column prop="score" label="分数" align="center" min-width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "compare",
  components: {},
  data() {
    return {
      number: 5,

      //图像1的参数
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadCard: false,
      image: "", //64转码后的图像

      //结果显示table
      div_result: false,
      tableData: [],
    };
  },
  methods: {
    Commit() {
      console.log("开始search！");
      this.$http
        .post("http://10.168.1.150:8802/ai_getFaceTopN", {
        // .post("/api/ai_getFaceTopN", {
          image: this.image,
          N: this.number,
        })
        .then((res) => {
          console.log(res);
          if (res.data.flag == "successful") {
            //这里要将结果显示到table中
            this.tableData = res.data.result;
            this.div_result = true;
          }
        })
        .catch((error) => {
          console.log(error);
          alert("搜索失败！");
        });
    },

    Cancel() {
      console.log("取消操作！");
    },

    //图片1的方法
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
  },
};
</script>

<style>
.compare {
  /* background-color: red; */
  margin: 0 auto;
  width: 900px;
  /* height:80px;  */
  border: 1px solid;
}
</style>