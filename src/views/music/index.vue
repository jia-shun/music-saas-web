<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="queryInfo.keyword" placeholder="请输入音乐或客户名字" clearable @clear="get">
            <el-button slot="append" icon="el-icon-search" @click="get" />
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible = true ">添加音乐</el-button>
        </el-col>
      </el-row>
      <!-- 渲染列表 -->
      <el-table
        :data="musics"
        style="width: 100%"
      >
        <el-table-column
          prop="musicName"
          label="音乐名字"
          width="180"
        />
        <el-table-column
          prop="customerName"
          label="客户姓名"
          width="180"
        />
        <el-table-column
          prop="price"
          label="费用"
        />
        <el-table-column label="完成状态" align="center" prop="finishStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.finishStatus"
              @change="changeEnabled(scope.row, scope.row.finishStatus)"
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" />
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
    <!--- 添加音乐 --->
    <el-dialog
      title="添加音乐"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!--- 添加弹窗主题 --->
      <el-form ref="addMusicRef" :model="addMusic" :rules="addMusicRules" label-width="80px">
        <el-form-item label="音乐名称" prop="musicName">
          <el-input v-model="addMusic.musicName" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="addMusic.customerName" />
        </el-form-item>
        <el-form-item label="制作费用" prop="price">
          <el-input v-model.number="addMusic.price" />
        </el-form-item>
        <el-form-item label="制作周期">
          <el-col :span="11">
            <el-date-picker
              v-model="addMusic.beganAt"
              type="datetime"
              placeholder="接手时间"
              style="width: 100%;"
            />
          </el-col>
          <el-col class="line" :span="2"> - </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="addMusic.finishedAt"
              type="datetime"
              placeholder="完成时间"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="完成状态" prop="finishStatus">
          <el-switch v-model="addMusic.finishStatus" />
        </el-form-item>
      </el-form>

      <!--- 添加弹窗底部 --->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMusicForm">确 定</el-button>
      </span>
    </el-dialog>

    <!--- 修改音乐 --->
    <el-dialog
      title="编辑音乐"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <!---  修改弹窗主题 --->
      <el-form ref="editMusicRef" :model="editMusic" :rules="editMusicRules" label-width="80px">
        <el-form-item label="音乐名称" prop="musicName">
          <el-input v-model="editMusic.musicName" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="editMusic.customerName" />
        </el-form-item>
        <el-form-item label="制作费用" prop="price">
          <el-input v-model.number="editMusic.price" />
        </el-form-item>
        <el-form-item label="制作周期">
          <el-col :span="11">
            <el-date-picker
              v-model="editMusic.beganAt"
              type="datetime"
              placeholder="接手时间"
              style="width: 100%;"
            />
          </el-col>
          <el-col class="line" :span="2"> - </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="editMusic.finishedAt"
              type="datetime"
              placeholder="完成时间"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="完成状态" prop="finishStatus">
          <el-switch v-model="editMusic.finishStatus" />
        </el-form-item>
      </el-form>

      <!--- 添加弹窗底部 --->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMusicForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { get, add, editStatus, getById, edit } from '@/api/music'
export default {
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('制作费用必须为数字值'))
      } else {
        callback()
      }
    }
    return {
      musics: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      editMusic: {
        musicName: '',
        customerName: '',
        price: '',
        beganAt: '',
        finishedAt: '',
        finishStatus: false
      },
      editMusicRules: {
        musicName: [
          { required: true, message: '请输入音乐名字', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入制作费用', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ]
      },
      // 获取音乐列表
      queryInfo: {
        // 当前页数
        page: 1,
        pageSize: 10,
        keyword: ''
      },
      addMusic: {
        musicName: '',
        customerName: '',
        price: '',
        beganAt: '',
        finishedAt: '',
        finishStatus: false
      },
      addMusicRules: {
        musicName: [
          { required: true, message: '请输入音乐名字', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入制作费用', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ]
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
    },
    // 改变状态
    changeEnabled(data, val) {
      var status = val ? '已完成' : '未完成'
      this.$confirm('确认音乐《 ' + data.musicName + ' 》状态修改为 ' + status + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editStatus(data).then(res => {
          this.$msg.notify({
            content: '更新完成状态成功',
            type: 'success'
          })
          this.get()
        }).catch(() => {
          data.finishStatus = !data.finishStatus
        })
      }).catch(() => {
        data.finishStatus = !data.finishStatus
      })
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
    // 添加添加音乐关闭对话框
    addDialogClosed() {
      this.$refs.addMusicRef.resetFields()
    },
    // 添加音乐
    addMusicForm() {
      this.$refs.addMusicRef.validate((valid) => {
        if (!valid) return
        if (!this.addMusic.beganAt || this.addMusic.beganAt === '') {
          console.log('began at : ' + this.addMusic.beganAt)
          this.$msg.notify({
            content: '接手时间不能为空',
            type: 'warning'
          })
          return
        }
        if (!this.addMusic.finishedAt || this.addMusic.finishedAt === '') {
          this.$msg.notify({
            content: '完成时间不能为空',
            type: 'warning'
          })
          return
        }
        this.addMusic.price = parseInt(this.addMusic.price)
        add(this.addMusic).then(res => {
          this.addDialogVisible = false
          this.get()
          this.$msg.notify({
            content: '添加音乐成功',
            type: 'success'
          })
        }).catch(err => {
          this.$msg.notify({
            content: err.message,
            type: 'error'
          })
        })
      })
    },

    // 编辑音乐
    editMusicForm() {
      this.$refs.editMusicRef.validate((valid) => {
        if (!valid) return
        if (!this.editMusic.beganAt || this.editMusic.beganAt === '') {
          this.$msg.notify({
            content: '接手时间不能为空',
            type: 'warning'
          })
          return
        }
        if (!this.editMusic.finishedAt || this.editMusic.finishedAt === '') {
          this.$msg.notify({
            content: '完成时间不能为空',
            type: 'warning'
          })
          return
        }
        this.editMusic.price = parseInt(this.editMusic.price)
        edit(this.editMusic).then(res => {
          this.editDialogVisible = false
          this.get()
          this.$msg.notify({
            content: '编辑音乐成功',
            type: 'success'
          })
        }).catch(err => {
          this.$msg.notify({
            content: err.message,
            type: 'error'
          })
        })
      })
    },

    async showEditDialog(id) {
      const { data: res } = await getById(id)
      this.editMusic = res
      this.editDialogVisible = true
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
    margin-bottom: 20px;
}

</style>
