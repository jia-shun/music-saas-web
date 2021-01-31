<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">添加歌曲</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>

</style>
