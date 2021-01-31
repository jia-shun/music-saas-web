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
      <!-- 渲染列表 -->
      <el-table
        :data="musics"
        style="width: 100%"
      >
        <el-table-column
          prop="songName"
          label="歌曲名字"
          width="180"
        />
        <el-table-column
          prop="customerName"
          label="客户姓名"
          width="180"
        />
        <el-table-column
          prop="price"
          label="价格"
        />
        <el-table-column
          prop="finishStatus"
          label="完成状态"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.finishStatus"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="beganAt"
          label="接手时间"
        />
        <el-table-column
          prop="finishedAt"
          label="完成时间"
        />
        <el-table-column
          label="操作"
        />
      </el-table>
    </el-card>
  </div>

</template>

<script>
import { get } from '@/api/music'
export default {
  data() {
    return {
      musics: [],
      total: 0,
      // 获取音乐列表
      queryInfo: {
        page: 1,
        pageSize: 20,
        keyword: ''
      }
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const { data: res } = await get(this.queryInfo)
      this.musics = res.list
      this.total = res.total
      console.log('res :' + JSON.stringify(res))
    }
  }

}
</script>

<style scoped>
.el-table {
    margin-top: 30px;
}

</style>
