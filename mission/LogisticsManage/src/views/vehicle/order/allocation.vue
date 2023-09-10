<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" class="filter-item" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" class="filter-item" style="margin-left: 10px" @click="handleRow('create')">
        添加订单
      </el-button>

      <el-popconfirm title="确认要删除吗？" style="margin-left: 10px" @onConfirm="handleRow('delete')">
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

      <el-table-column label="车架号" prop="vin" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆类型" prop="vehicleType" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vehicleType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" prop="clientName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" prop="supplierName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.supplierName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务项" prop="serviceName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.serviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="orderStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ORDER_EXAMINE_STATUS_OBJ[row.orderStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="remark" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" prop="updateTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" :disabled="row.orderStatus === '1'" @click="handleRow('allocate',row)">
            分配
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

    <el-dialog :title="TEXT_MAP[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin" :disabled="this.dialogStatus === 'allocate'"/>
        </el-form-item>

        <el-form-item label="发货车型" prop="vehicleType">
          <el-select v-model="temp.vehicleType" class="filter-item">
            <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="客户" prop="client">
          <el-select v-model="temp.client" class="filter-item">
            <el-option v-for="item in clientList" :key="item.value" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="temp.supplierName"/>
        </el-form-item>

        <el-form-item label="服务项" prop="service">
          <el-select v-model="temp.service" class="filter-item">
            <el-option v-for="item in serviceList" :key="item.value" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>

        <el-tree
          ref="dataTree"
          :data="TREE_DATA"
          :default-expand-all="true"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultTreeProps"
          :render-content="renderContent"
          @check="handleNodeClick">
        </el-tree>
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
  import { parameterVehicleTypeList } from '@/api/vehicle/parameter/vehicle-type'
  import { cooperateCustomList } from '@/api/vehicle/cooperate/custom'
  import { parameterServiceList } from '@/api/vehicle/parameter/server'
  import {
    vehicleOrderList,
    createVehicleOrder,
    // updateVehicleOrder,
    deleteVehicleOrder,
    // exportVehicleOrder
    orderSmallLinkItemList,
    orderAllocationList,
    addDmNumberTask,
    allocateOrder,
  } from '@/api/vehicle/order'
  import { TEXT_MAP, TREE_DATA, ORDER_EXAMINE_STATUS_OBJ } from '@/constant/vehicle'

  export default {
    components: { Pagination },
    data() {
      return {
        TEXT_MAP,
        TREE_DATA,
        ORDER_EXAMINE_STATUS_OBJ,
        defaultTreeProps: {
          children: 'children',
          label: 'label',
          value: 'value'
        },
        tableKey: 0,
        list: null,
        vehicleTypeList: null,
        clientList: null,
        serviceList: null,
        allocationList: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: 0,
          vin: undefined
        },
        ids: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          vin: undefined,
          vehicleType: undefined,
          client: undefined,
          supplierName: undefined,
          service: undefined,
          orderSmallLinkItem: undefined,
          orderBaseInfo: undefined,
        },
        rules: {
          vin: [{ required: true, message: '输入车架号', trigger: 'change' }],
          vehicleType: [{ required: true, message: '请选择发货车型', trigger: 'change' }],
          client: [{ required: true, message: '请选择客户', trigger: 'change' }],
          supplierName: [{ required: true, message: '请输入供应商', trigger: 'change' }],
          service: [{ required: true, message: '请选择服务项', trigger: 'change' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleSelectionChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      getList() {
        this.listLoading = true
        vehicleOrderList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
        parameterVehicleTypeList().then(res => {
          this.vehicleTypeList = res.data.list.map(item => ({
            label: item.typeName,
            value: item.typeName
          }))
        })
        cooperateCustomList().then(res => {
          this.clientList = res.data.list.map(item => ({
            label: item.name,
            value: item.userId
          }))
        })
        parameterServiceList().then(res => {
          this.serviceList = res.data.list.map(item => ({
            label: item.name,
            value: item.id
          }))
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          vin: undefined,
          vehicleType: undefined,
          client: undefined,
          supplierName: undefined,
          service: undefined,
          orderSmallLinkItem: undefined,
          orderBaseInfo: undefined
        }
      },
      handleNodeClick(node, tree) {
        if (tree.checkedNodes.length > 0) {
          this.temp.orderSmallLinkItem = {}
          this.temp.orderBaseInfo = {}
          tree.checkedNodes.forEach(n => {
            if (!n.children) {
              this.temp.orderSmallLinkItem[n.value] = '0'
            }
          })
          TREE_DATA.forEach(t1 => {
            t1.children.forEach(t2 => {
              if (this.temp.orderSmallLinkItem[t2.value] !== '0') {
                this.temp.orderSmallLinkItem[t2.value] = '1'
              }
            })
          })
        }
      },
      renderContent(h, { node, data, store }) {
        if (this.dialogStatus === 'allocate' && this.allocationList && this.temp.orderBaseInfo) {
          const options = this.allocationList[node.data.options] || []
          return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              {
                options.length > 0
                  ? <el-select v-model={this.temp.orderBaseInfo[node.data.value]}
                               className="filter-item"
                               style="margin-left:30px"
                               placeholder=""
                               onChange={(value) => {
                                 // 每个环节同类型的select选择同时赋值
                                 const orderBaseInfo = { ...this.temp.orderBaseInfo }
                                 TREE_DATA.forEach(t1 => {
                                   if (t1.children.filter(child => child.value === node.data.value).length > 0) {
                                     t1.children.forEach(t2 => {
                                       if (t2.options === node.data.options) {
                                         orderBaseInfo[t2.value] = value
                                         orderBaseInfo[`${t2.value}Name`] = value.name
                                         orderBaseInfo[`${t2.value}Id`] = value.id
                                       }
                                     })
                                   }
                                 })
                                 this.$set(this.temp, 'orderBaseInfo', orderBaseInfo)
                               }}>
                    {
                      options.map(item => (
                        <el-option key={item.name} label={item.name} value={item}></el-option>
                      ))
                    }
                  </el-select> : null
              }
            </span>
          )
        } else {
          return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
            </span>
          )
        }
        // return (
        //   <span className="custom-tree-node">
        //       <span>{node.label}</span>
        //     {
        //       this.dialogStatus === 'allocate' && (this.allocationList[node.data.options] || []).length > 0
        //         ? <el-select v-model={this.temp.service} className="filter-item" style="margin-left:30px">
        //           {
        //             options.map(item => (
        //               <el-option key={item.id} label={item.name} value={item.id}></el-option>
        //             ))
        //           }
        //         </el-select> : null
        //     }
        //     </span>
        // )
      },
      handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case 'create':
            this.resetTemp()
            this.dialogFormVisible = true

            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
              this.$refs['dataTree'].setCheckedKeys([])
            })
            break
          case 'allocate':
            orderSmallLinkItemList({
              vin: row.vin
            }).then(res => {
              this.temp = {
                ...row,
                client: { label: row.clientName, value: row.clientId },
                service: { label: row.serviceName, value: row.serviceId },
                orderSmallLinkItem: res.data.orderSmallLinkItem || {},
                orderBaseInfo: {},
              }
              const nodes = []
              TREE_DATA.forEach(t1 => {
                t1.children.forEach(t2 => {
                  if (t2.label && t2.value) {
                    this.temp.orderBaseInfo[t2.value] = ''
                    if (this.temp.orderSmallLinkItem[t2.value] === '0') {
                      nodes.push(t2.id)
                    }
                  }
                })
              })
              orderAllocationList().then(res => {
                this.allocationList = res.data.user
                this.dialogFormVisible = true

                this.$nextTick(() => {
                  this.$refs['dataForm'].clearValidate()
                  this.$refs['dataTree'].setCheckedKeys(nodes)
                })
              })
            })
            break
          case 'delete':
            row = row ? [row.id] : this.ids
            this.deleteData(row)
            break
        }
      },
      handleData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogStatus === 'allocate') {
              let flag = false
              Object.keys(this.temp.orderSmallLinkItem).forEach((key) => {
                if (this.temp.orderSmallLinkItem[key] === '0' && !this.temp.orderBaseInfo[`${key}Name`] && !this.temp.orderBaseInfo[`${key}Id`]) {
                  TREE_DATA.forEach(t1 => {
                    t1.children.forEach(t2 => {
                      if (t2.value === key) {
                        flag = true
                        this.$message({
                          showClose: true,
                          message: `请选择${t2.label}`,
                          type: 'warning'
                        })
                      }
                    })
                  })
                }
              })
              if (flag) {
                return null
              }
            }
            const temp = this.temp
            if (this.dialogStatus === 'create' ||
              (this.dialogStatus === 'allocate' && (temp.vehiclesNumber > 3 || (temp.vehiclesNumber <= 3 && temp.orderStatus === '2')))) {
              const fun = this.dialogStatus === 'create' ? createVehicleOrder : allocateOrder
              temp.clientName = temp.client.label
              temp.clientId = temp.client.value
              temp.serviceName = temp.service.label
              temp.serviceId = temp.service.value
              fun(temp).then(() => {
                this.dialogFormVisible = false
                this.handleFilter()
                this.$notify({
                  type: 'success',
                  title: this.dialogStatus === 'create' ? '新增成功' : '分配成功',
                  duration: 3000
                })
              })
            } else {
              this.$confirm('该客户车辆库存数量达到预警值，需要上级审批 是否发起审批流程', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                addDmNumberTask({
                  orderId: temp.id,
                  vin: temp.vin
                }).then((res) => {
                  if (res) {
                    this.dialogFormVisible = false
                    this.handleFilter()
                    this.$notify({
                      type: 'success',
                      title: '请等待上级审核',
                      duration: 3000
                    })
                  }
                })
              })
            }
          }
        })
      },
      deleteData(ids) {
        deleteVehicleOrder(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 3000
          })
        })
      }
    }
  }
</script>
