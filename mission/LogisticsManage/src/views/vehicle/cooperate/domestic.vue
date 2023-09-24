<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入司机姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加司机信息
      </el-button>

      <el-popconfirm
        title="确认要删除吗？"
        @onConfirm="handleRow('delete')"
      >
        <el-button type="danger" icon="el-icon-delete" class="filter-item" slot="reference">
          批量删除
        </el-button>
      </el-popconfirm>
    </div>

    <el-table
      :key="listKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleIdChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="ID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="司机姓名" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="司机电话" prop="mobile" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="驾照类型" prop="driverType" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.driverType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="驾照编号" prop="driverNumber" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.driverNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="微信号" prop="wechatSignal" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.wechatSignal }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="更新用户" prop="updateBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.updateBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="更新时间" prop="updateTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            更新
          </el-button>

          <el-popconfirm
            title="确认要删除吗？"
            @onConfirm="handleRow('delete',row)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="司机名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="司机电话" prop="mobile">
          <el-input v-model="temp.mobile"/>
        </el-form-item>

        <el-form-item v-if="temp.password" label="司机密码" prop="password">
          <el-input v-model="temp.password"/>
        </el-form-item>

        <el-form-item label="身份证号" prop="passportNo">
          <el-input v-model="temp.passportNo"/>
        </el-form-item>

        <el-form-item label="驾照类型" prop="driverType">
          <el-input v-model="temp.driverType"/>
        </el-form-item>

        <el-form-item label="驾照编号" prop="driverNumber">
          <el-input v-model="temp.driverNumber"/>
        </el-form-item>

        <el-form-item label="微信号" prop="wechatSignal">
          <el-input v-model="temp.wechatSignal"/>
        </el-form-item>

        <el-form-item label="分配经理" prop="pmId">
          <el-select v-model="temp.pmId" class="filter-item" placeholder="">
            <el-option v-for="item in pmList" :key="item.value" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>

        <el-button type="primary" @click="handleData">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { cooperateDomesticList, createCooperateDomestic, updateCooperateDomestic, deleteCooperateDomestic } from '@/api/vehicle/cooperate/domestic'
  import { organizationList } from '@/api/organization'
  import { TEMP_TYPE } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        listKey: 0,
        list: null,
        pmList: null,
        total: 0,
        listLoading: true,
        listQuery: {
          name: undefined,
          pageNum: 1,
          pageSize: 20,
        },
        ids: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          name: undefined,
          mobile: undefined,
          password: undefined,
          passportNo: undefined,
          driverType: undefined,
          driverNumber: undefined,
          wechatSignal: undefined,
          pmId: undefined,
        },
        rules: {
          name: [{ required: true, message: '请输入司机名称', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
          password: [{ required: true, message: '请输入司机密码', trigger: 'blur' }],
          passportNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
          driverType: [{ required: true, message: '请输入驾照类型', trigger: 'blur' }],
          driverNumber: [{ required: true, message: '请输入驾照编号', trigger: 'blur' }],
          wechatSignal: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
          pmId: [{ required: true, message: '请选择分配经理', trigger: 'change' }],
        }
      }
    },
    created() {
      this.getList()
      organizationList({ roleKeySet: 'pmanager' }).then(res => {
        this.pmList = res.data.list.map(item => ({
          label: item.userName,
          value: item.userId
        }))
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        cooperateDomesticList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleIdChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        const code = 'st' + (parseInt(Math.random() * 1000000) + 1000000)
        this.temp = {
          name: undefined,
          mobile: undefined,
          password: code.substring(0, 8),
          passportNo: undefined,
          driverType: undefined,
          driverNumber: undefined,
          wechatSignal: undefined,
          pmId: undefined,
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createCooperateDomestic : updateCooperateDomestic
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.pmName = this.temp.pmId.label
            this.temp.pmId = this.temp.pmId.value
            fun(this.temp).then(() => {
              this.dialogFormVisible = false
              this.handleFilter()
              this.$notify({
                type: 'success',
                title: this.dialogStatus === 'create' ? '新增成功' : '更新成功',
                duration: 3000
              })
            })
          }
        })
      },
      deleteData(ids) {
        deleteCooperateDomestic(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 3000
          })
        })
      },
      handleRow(type, row) {
        switch (type) {
          case 'create':
          case 'update':
            type === 'create' ? this.resetTemp() : this.temp = { ...row, pmId: { label: row.pmName, value: row.pmId } }
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
            break
          case 'delete':
            row = row ? [row.id] : this.ids
            this.deleteData(row)
            break
        }
      },
    }
  }
</script>
