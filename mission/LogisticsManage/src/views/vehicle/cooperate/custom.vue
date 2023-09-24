<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入客户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加客户
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

      <el-table-column label="客户姓名" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户电话" prop="mobile" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="mail" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.mail }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司名称" prop="company" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>

      <el-table-column label="国家" prop="country" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.country }}</span>
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
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
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="temp.mobile"/>
        </el-form-item>

        <el-form-item v-if="temp.password" label="客户密码" prop="password">
          <el-input v-model="temp.password"/>
        </el-form-item>

        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="temp.mail"/>
        </el-form-item>

        <el-form-item label="国家" prop="country">
          <el-input v-model="temp.country"/>
        </el-form-item>

        <el-form-item label="地区" prop="area">
          <el-input v-model="temp.area"/>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address"/>
        </el-form-item>

        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="temp.bankAccount"/>
        </el-form-item>

        <el-form-item label="开户行" prop="bank">
          <el-input v-model="temp.bank"/>
        </el-form-item>

        <el-form-item label="税号" prop="dutyParagraph">
          <el-input v-model="temp.dutyParagraph"/>
        </el-form-item>

        <el-form-item label="付款条件" prop="paymentTerms">
          <el-input v-model="temp.paymentTerms"/>
        </el-form-item>

        <el-form-item label="贸易方式" prop="tradeMode">
          <el-input v-model="temp.tradeMode"/>
        </el-form-item>

        <el-form-item label="结算周期" prop="settlementCycle">
          <el-input v-model="temp.settlementCycle"/>
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
  import { cooperateCustomList, createCooperateCustom, updateCooperateCustom, deleteCooperateCustom } from '@/api/vehicle/cooperate/custom'
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
          mail: undefined,
          country: undefined,
          area: undefined,
          address: undefined,
          bankAccount: undefined,
          bank: undefined,
          dutyParagraph: undefined,
          paymentTerms: undefined,
          tradeMode: undefined,
          settlementCycle: undefined,
          pmId: undefined,
        },
        rules: {
          name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
          password: [{ required: true, message: '请输入客户密码', trigger: 'blur' }],
          mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
          area: [{ required: true, message: '请输入地区', trigger: 'blur' }],
          address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
          bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
          bank: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
          dutyParagraph: [{ required: true, message: '请输入税号', trigger: 'blur' }],
          paymentTerms: [{ required: true, message: '请输入付款条件', trigger: 'blur' }],
          tradeMode: [{ required: true, message: '请输入贸易方式', trigger: 'blur' }],
          settlementCycle: [{ required: true, message: '请输入结算周期', trigger: 'blur' }],
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
        cooperateCustomList(this.listQuery).then(res => {
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
          mail: undefined,
          country: undefined,
          area: undefined,
          address: undefined,
          bankAccount: undefined,
          bank: undefined,
          dutyParagraph: undefined,
          paymentTerms: undefined,
          tradeMode: undefined,
          settlementCycle: undefined,
          pmId: undefined,
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createCooperateCustom : updateCooperateCustom
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
        deleteCooperateCustom(ids).then(() => {
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
      }
    }
  }
</script>
