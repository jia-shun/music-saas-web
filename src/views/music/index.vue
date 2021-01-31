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
              @change="finishStateChaned(scope.row)"
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
        >
          <template slot-scope="scope">

            <el-button type="primary" icon="el-icon-edit" size="mini" />
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>

</template>

<script>
import { get, edit } from '@/api/music'
export default {
  data() {
    return {
      musics: [],
      total: 0,
      // 获取音乐列表
      queryInfo: {
        // 当前页数
        page: 1,
        pageSize: 10,
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
    },
    // 监听pageSize
    handleSizeChange(pageSize) {
      this.queryInfo.pageSize = pageSize
      this.get()
    },
    // 监听page
    handleCurrentChange(page) {
      this.queryInfo.page = page
      this.get()
    },
    finishStateChaned(music) {
      edit(music)
      this.$msg.notify({
        content: '更新完成状态成功',
        type: 'success'
      })
    }
  }

}
</script>

<style scoped>
.el-table {
    margin-top: 30px;
}

.el-pagination {
    margin-top: 30px;
    float: right;
    margin-right: 50px;
}

</style>
