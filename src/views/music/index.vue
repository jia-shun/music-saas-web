<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="3">
          <el-select v-model="queryInfo.payStatus" clearable placeholder="支付状态">
            <el-option
              v-for="item in payStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-select v-model="queryInfo.finishStatus" clearable placeholder="完成状态">
            <el-option
              v-for="item in finishStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryInfo.orderKey" clearable placeholder="排序">
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="queryInfo.keyword" placeholder="请输入音乐或客户名字" clearable @clear="get" />

        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible = true ">添加音乐</el-button>
        </el-col>
      </el-row>
      <!-- 渲染列表 -->
      <el-table
        :data="musics"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="musicName"
          label="音乐名字"
        />
        <el-table-column
          prop="customerName"
          label="客户姓名"
        />
        <el-table-column
          prop="price"
          label="费用"
          width="100"
        />
        <el-table-column label="支付状态" align="center" prop="payStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.payStatus"
              active-color="#D1D1D1"
              inactive-color="#F04134"
              @change="changePayEnabled(scope.row, scope.row.payStatus)"
            />
          </template>

        </el-table-column>
        <el-table-column label="完成状态" align="center" prop="finishStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.finishStatus"
              active-color="#D1D1D1"
              inactive-color="#F04134"
              @change="changeFinishEnabled(scope.row, scope.row.finishStatus)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="finishedAt"
          label="交付时间"
        />
        <el-table-column
          prop="beganAt"
          label="接手时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteMusic(scope.row)" />
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
        <el-form-item label="支付状态" prop="payStatus">
          <el-switch
            v-model="addMusic.payStatus"
            active-color="#D1D1D1"
            inactive-color="#F04134"
          />
        </el-form-item>
        <el-form-item label="完成状态" prop="finishStatus">
          <el-switch
            v-model="addMusic.finishStatus"
            active-color="#D1D1D1"
            inactive-color="#F04134"
          />
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
              placeholder="交付时间"
              style="width: 100%;"
            />
          </el-col>
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
        <el-form-item label="支付状态" prop="payStatus">
          <el-switch
            v-model="editMusic.payStatus"
            active-color="#D1D1D1"
            inactive-color="#F04134"
          />
        </el-form-item>
        <el-form-item label="完成状态" prop="finishStatus">
          <el-switch
            v-model="editMusic.finishStatus"
            active-color="#D1D1D1"
            inactive-color="#F04134"
          />
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
              placeholder="交付时间"
              style="width: 100%;"
            />
          </el-col>
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
import { get, add, editFinishStatus, getById, edit, del, editPayStatus } from '@/api/music'
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
      payStatusOptions: [{
        value: 'TRUE',
        label: '已支付'
      }, {
        value: 'FALSE',
        label: '未支付'
      }],
      finishStatusOptions: [{
        value: 'TRUE',
        label: '已完成'
      }, {
        value: 'FALSE',
        label: '未完成'
      }],
      orderOptions: [
        {
          value: 'finishedAt',
          label: '交付时间'
        }, {
          value: 'beganAt',
          label: '接手时间'
        }],
      musics: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      editMusic: {
        musicName: '',
        customerName: '',
        price: '',
        payStatus: false,
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
        keyword: '',
        payStatus: '',
        finishStatus: '',
        orderKey: '',
        desc: true
      },
      addMusic: {
        musicName: '',
        customerName: '',
        price: '',
        payStatus: false,
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
    // 删除音乐
    deleteMusic(data) {
      this.$confirm('确定要删除音乐《 ' + data.musicName + ' 》？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(data.id).then(res => {
          this.get()
        })
      })
    },
    // 改变支付状态
    changePayEnabled(data, val) {
      var status = val ? '已支付' : '未支付'
      this.$confirm('确认音乐《 ' + data.musicName + ' 》支付状态修改为 ' + status + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editPayStatus(data).then(res => {
          this.get()
        }).catch(() => {
          data.payStatus = !data.payStatus
        })
      }).catch(() => {
        data.payStatus = !data.payStatus
      })
    },
    // 改变状态
    changeFinishEnabled(data, val) {
      var status = val ? '已完成' : '未完成'
      this.$confirm('确认音乐《 ' + data.musicName + ' 》状态修改为 ' + status + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editFinishStatus(data).then(res => {
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
            content: '交付时间不能为空',
            type: 'warning'
          })
          return
        }
        this.addMusic.price = parseInt(this.addMusic.price)
        add(this.addMusic).then(res => {
          this.addDialogVisible = false
          this.get()
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
            content: '交付时间不能为空',
            type: 'warning'
          })
          return
        }
        this.editMusic.price = parseInt(this.editMusic.price)
        edit(this.editMusic).then(res => {
          this.editDialogVisible = false
          this.get()
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

<style scope>
.el-table {
    margin-top: 30px;
}

.el-pagination {
    margin-top: 30px;
    float: right;
    margin-right: 50px;
    margin-bottom: 20px;
}

/* .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
.switchStyle .el-switch__label--right {
  z-index: 1;
  right: 2px;
}
.switchStyle .el-switch__label--left {
  z-index: 1;
  left: 10px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
} */

</style>
