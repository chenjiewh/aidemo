<template>
  <div class="compare">
    <h1>对比界面</h1>
    <div style="margin: 30px 0;"></div>
    <el-form label-width="200px">
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
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item label="用户头像2" required>
            <el-upload
              action
              list-type="picture-card"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemove1"
              :on-change="handleImgChange1"
              :auto-upload="false"
              :limit="1"
              :class="{hide:hideUploadCard1}"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible1">
              <img width="100%" :src="dialogImageUrl1" alt />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 30px 0;">
        <el-button type="primary" @click="Commit()">开始比对</el-button>
        <!-- <el-button @click="Cancel()">取消操作</el-button> -->
      </el-row>
    </el-form>

    <div style="margin: 60px 30px;" v-if="this.div_result">
      <h1>结果</h1>
      <el-table :data="tableData" border :header-cell-style="{background:'#6699ff',color:'#fff'}">
        <el-table-column prop="img1" label="头像1" align="center" min-width="100"></el-table-column>
        <el-table-column prop="img2" label="头像2" align="center" min-width="100"></el-table-column>
        <el-table-column prop="score" label="分数" align="center" min-width="100"></el-table-column>
        <el-table-column prop="threshold" label="参考阈值" align="center" min-width="100"></el-table-column>
        <el-table-column prop="result" label="对比结果" align="center" min-width="100"></el-table-column>
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
      //图像1的参数
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadCard: false,
      image: "", //64转码后的图像

      //图像2的参数
      dialogImageUrl1: "",
      dialogVisible1: false,
      hideUploadCard1: false,
      image1: "", //64转码后的图像

      //结果显示table
      div_result: false,
      tableData: [],
    };
  },
  methods: {
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

    //图片2的方法
    handleRemove1(file, fileList) {
      console.log("img文件移除时");
      this.hideUploadCard1 = fileList.length >= 1;
    },

    handlePictureCardPreview1(file) {
      console.log("img文件预览时");
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },

    handleImgChange1(file, fileList) {
      console.log("img文件发生改变时");
      this.hideUploadCard1 = fileList.length >= 1; //通过change方法来改变hideUploadCard
      this.getBase64(file.raw).then((res) => {
        this.image1 = res;
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

    Commit() {
      console.log("开始比对！");
      this.$http
        .post("http://10.168.1.150:8802/ai_faceCompare",{
        // .post("/api/ai_faceCompare", { 
          image1: this.image,
          image2: this.image1,
        })
        .then((res) => {
          console.log(res);
          if (res.data.flag == "successful") {
            // alert("比对完成!");
            //这里要讲结果显示到table中
            var score = res.data.score;
            var threshold = res.data.threshold;
            var result = res.data.result;
            this.tableData = [
              {
                img1: "图像1",
                img2: "图像2",
                score: score,
                threshold: threshold,
                result: result

              },
            ];
            this.div_result = true;
          }
        })
        .catch((error) => {
          console.log(error);
          alert("比对失败！");
        });
    },

    Cancel() {
      console.log("取消操作！");
    },
  },
};
</script>

<style>
.compare {
  /* background-color: red; */
  margin: 0 auto;
  width: 800px;
  /* height:80px;  */
  border: 1px solid;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>