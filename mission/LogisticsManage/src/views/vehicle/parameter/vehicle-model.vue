<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="输入车辆品牌" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加车辆品牌
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
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="id" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆品牌" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ car_bard_list_obj[row.brandId] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车型型号" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>


      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="更新用户" prop="updateBy" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.updateBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="更新时间" prop="updateTime" align="center" width="150">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="车辆品牌" prop="brandId">
          <el-select v-model="temp.brandId" class="filter-item" placeholder="">
            <el-option v-for="item in car_bard_list" :key="item.value" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>

        <el-form-item label="车型型号" prop="name">
          <el-input v-model="temp.name"/>
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
  import { listToObj } from '@/utils'
  import Pagination from '@/components/Pagination'
  import { parameterCarBrandList} from '@/api/vehicle/parameter/vehicle-brand'
  import { parameterCarModelList, createParameterCarModel, updateParameterCarModel, deleteParameterCarModel } from '@/api/vehicle/parameter/vehicle-model'

  export default {
    components: { Pagination },
    data() {
      return {
        tableKey: 0,
        list: null,
        car_bard_list: null,
        car_bard_list_obj: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          name: undefined,
        },
        ids: [],
        dialogFormVisible: false,
        textMap: {
          create: '新增',
          update: '更新'
        },
        dialogStatus: '',
        temp: {
          brandId: undefined,
          name: undefined
        },
        rules: {
          brandId: [{ required: true, message: '请选择车辆品牌', trigger: 'blur' }],
          name: [{ required: true, message: '请输入车型型号', trigger: 'blur' }]
        },
      }
    },
    created() {
      this.getList()
      parameterCarBrandList({
        pageNum: 1,
        pageSize: 99999,
      }).then(res => {
        this.car_bard_list = res.data.list.map(item => ({
          label: item.name,
          value: item.id,
        }))
        this.car_bard_list_obj = listToObj(this.car_bard_list)
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        parameterCarModelList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleSelectionChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        this.temp = {
          name: undefined,
          type: undefined,
          abroadAddress: undefined
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createParameterCarModel : updateParameterCarModel
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const brandId = this.temp.brandId.value
            const brandName = this.temp.brandId.label
            this.temp.brandId = brandId
            this.temp.brandName = brandName
            fun(this.temp).then(() => {
              this.dialogFormVisible = false
              this.handleFilter()
              this.$notify({
                type: 'success',
                title: this.dialogStatus === 'create' ? '新增成功' : '更新成功',
                duration: 2000
              })
            })
          }
        })
      },
      deleteData(ids) {
        deleteParameterCarModel(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 2000
          })
        })
      },
      handleRow(type, row) {
        switch (type) {
          case 'create':
          case 'update':
            type === 'create' ? this.resetTemp() : this.temp = { ...row }
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
