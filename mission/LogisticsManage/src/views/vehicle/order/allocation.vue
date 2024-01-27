<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(OPERATE_CREATE)">
        添加订单
      </el-button>

      <el-popconfirm title="确认设置失效订单？" @onConfirm="handleRow(OPERATE_EXPIRE)">
        <el-button slot="reference" type="danger" icon="el-icon-delete">
          批量定为失效订单
        </el-button>
      </el-popconfirm>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
      <el-table-column type="selection" width="55"/>

      <el-table-column label="ID" prop="id" align="center" width="100">
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" :disabled="row.orderStatus === ORDER_EXAMINE_STATUS_AUDITING" @click="handleRow(OPERATE_MAKE_INITIAL_PLAN,row)">
            {{ OPERATE_TYPE[OPERATE_MAKE_INITIAL_PLAN] }}
          </el-button>

          <el-popconfirm title="确认设置失效订单？" @onConfirm="handleRow(OPERATE_EXPIRE,row)">
            <el-button slot="reference" size="mini" type="danger">
              {{ OPERATE_TYPE[OPERATE_EXPIRE] }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin" :disabled="this.dialogStatus === OPERATE_MAKE_INITIAL_PLAN"></el-input>
        </el-form-item>

        <el-form-item label="发货车型" prop="vehicleType">
          <el-select v-model="temp.vehicleType">
            <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户" prop="client">
          <el-select v-model="temp.client">
            <el-option v-for="item in clientList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="temp.supplierName"></el-input>
        </el-form-item>

        <el-form-item label="服务项" prop="service">
          <el-select v-model="temp.service">
            <el-option v-for="item in serviceList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-tree ref="dataTree"
                 :data="TREE_DATA"
                 :default-expand-all="true"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="[]"
                 :default-checked-keys="[]"
                 :props="defaultTreeProps"
                 :render-content="renderContent"
                 @check="handleNodeClick"
        ></el-tree>
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
  import { serviceList } from '@/api/vehicle/parameter/service'
  import {
    vehicleOrderList,
    createVehicleOrder,
    // updateVehicleOrder,
    deleteVehicleOrder,
    // exportVehicleOrder
    orderSmallLinkItemList,
    orderAllocationList,
    addDmNumberTask,
    allocateOrder
  } from '@/api/vehicle/order'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    OPERATE_CREATE,
    OPERATE_EXPIRE,
    OPERATE_MAKE_INITIAL_PLAN,
    OPERATE_TYPE,
    TREE_DATA,
    ORDER_EXAMINE_STATUS_AUDITING,
    ORDER_EXAMINE_STATUS_OBJ,
    OUT_CONFIRM,
    SW_OUT_CONFIRM
  } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        OPERATE_CREATE,
        OPERATE_EXPIRE,
        OPERATE_MAKE_INITIAL_PLAN,
        OPERATE_TYPE,
        TREE_DATA,
        ORDER_EXAMINE_STATUS_AUDITING,
        ORDER_EXAMINE_STATUS_OBJ,
        defaultTreeProps: {
          children: 'children',
          label: 'label'
        },
        vehicleTypeList: null,
        clientList: null,
        serviceList: null,
        allocationList: null,
        listQuery: {
          status: 0,
          vin: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        listKey: 0,
        list: undefined,
        ids: [],
        listTotal: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        temp: {
          vin: undefined,
          vehicleType: undefined,
          client: undefined,
          supplierName: undefined,
          service: undefined,
          orderSmallLinkItem: undefined,
          orderBaseInfo: undefined
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
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        vehicleOrderList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      getData() {
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
        serviceList().then(res => {
          this.serviceList = res.data.list.map(item => ({
            label: item.name,
            value: item.id
          }))
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      handleIdChange(rows) {
        this.ids = rows.map(row => row.id)
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
        const orderSmallLinkItem = {}
        const orderBaseInfo = {...this.temp.orderBaseInfo}
        tree.checkedNodes.forEach(n => {
          if (!n.children) {
            orderSmallLinkItem[n.value] = '0'
          }
        })
        TREE_DATA.forEach(t1 => {
          t1.children.forEach(t2 => {
            if (orderSmallLinkItem[t2.value] !== '0') {
              orderSmallLinkItem[t2.value] = '1'
              if (orderBaseInfo[t2.value]) {
                orderBaseInfo[t2.value] = ''
                delete orderBaseInfo[`${t2.value}Name`]
                delete orderBaseInfo[`${t2.value}Id`]
              }
            }
          })
        })
        this.$set(this.temp, 'orderSmallLinkItem', orderSmallLinkItem)
        this.$set(this.temp, 'orderBaseInfo', orderBaseInfo)
      },
      renderContent(h, { node, data, store }) {
        if (this.dialogStatus === OPERATE_MAKE_INITIAL_PLAN && this.allocationList && this.temp.orderBaseInfo) {
          const options = this.allocationList[node.data.options] || []
          return (
            <span class='custom-tree-node'>
            <span>{node.label}</span>
              {
                options.length > 0
                  ? <el-select v-model={this.temp.orderBaseInfo[node.data.value]}
                               value-key='id'
                               style='margin-left:30px'
                               placeholder=''
                               onChange={(value) => {
                                 // 每个环节同类型的select选择同时赋值
                                 const orderBaseInfo = { ...this.temp.orderBaseInfo }
                                 TREE_DATA.forEach(t1 => {
                                   if (t1.children.filter(child => child.value === node.data.value).length > 0) {
                                     t1.children.forEach(t2 => {
                                       if (this.temp.orderSmallLinkItem[t2.value] === '0' && t2.options === node.data.options) {
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
                  </el-select> : <span>-</span>
              }
          </span>
          )
        } else {
          return (
            <span class='custom-tree-node'>
            <span>{node.label}</span>
          </span>
          )
        }
        // return (
        //   <span className="custom-tree-node">
        //       <span>{node.label}</span>
        //     {
        //       this.dialogStatus === OPERATE_MAKE_INITIAL_PLAN && (this.allocationList[node.data.options] || []).length > 0
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
      async handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case OPERATE_CREATE:
            await this.getData()
            this.resetTemp()
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs.dataForm.clearValidate()
              this.$refs.dataTree.setCheckedKeys([])
            })
            break
          case OPERATE_MAKE_INITIAL_PLAN:
            await this.getData()
            orderSmallLinkItemList({
              vin: row.vin
            }).then(res => {
              this.temp = {
                ...row,
                client: { label: row.clientName, value: row.clientId },
                service: { label: row.serviceName, value: row.serviceId },
                orderSmallLinkItem: res.data.orderSmallLinkItem || {},
                orderBaseInfo: {}
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
                  this.$refs.dataForm.clearValidate()
                  this.$refs.dataTree.setCheckedKeys(nodes)
                })
              })
            })
            break
          case OPERATE_EXPIRE:
            row = row ? [row.id] : this.ids
            deleteVehicleOrder(row).then(() => {
              this.handleFilter()
              this.$notify({
                type: 'success',
                message: '删除成功',
                duration: 3000
              })
            })
            break
        }
      },
      handleData() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if (this.dialogStatus === OPERATE_MAKE_INITIAL_PLAN) {
              let flag = false
              Object.keys(this.temp.orderSmallLinkItem).forEach((key) => {
                if (this.temp.orderSmallLinkItem[key] === '0' && !this.temp.orderBaseInfo[`${key}Name`] && !this.temp.orderBaseInfo[`${key}Id`]) {
                  TREE_DATA.forEach(t1 => {
                    t1.children.forEach(t2 => {
                      if (t2.value === key && t2.options) {
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
            if (this.dialogStatus === OPERATE_CREATE ||
              (this.dialogStatus === OPERATE_MAKE_INITIAL_PLAN && (temp.vehiclesNumber > 3 || (temp.vehiclesNumber <= 3 && temp.orderStatus === '2')))) {
              const fun = this.dialogStatus === OPERATE_CREATE ? createVehicleOrder : allocateOrder
              temp.clientName = temp.client.label
              temp.clientId = temp.client.value
              temp.serviceName = temp.service.label
              temp.serviceId = temp.service.value
              fun(temp).then(() => {
                this.dialogFormVisible = false
                this.handleFilter()
                this.$notify({
                  type: 'success',
                  title: this.dialogStatus === OPERATE_CREATE ? '新增成功' : '分配成功',
                  duration: 3000
                })
              })
            } else if ((temp.orderBaseInfo[OUT_CONFIRM] && !(temp.orderBaseInfo['swInWarehouse'] || temp.orderBaseInfo['swStorage'] || temp.orderBaseInfo['swTrim'] || temp.orderBaseInfo['seal'] || temp.orderBaseInfo['card'] || temp.orderBaseInfo['swOutWarehouse'] || temp.orderBaseInfo[SW_OUT_CONFIRM])) || temp.orderBaseInfo[SW_OUT_CONFIRM]) {
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
            } else {
              const fun = this.dialogStatus === OPERATE_CREATE ? createVehicleOrder : allocateOrder
              temp.clientName = temp.client.label
              temp.clientId = temp.client.value
              temp.serviceName = temp.service.label
              temp.serviceId = temp.service.value
              fun(temp).then(() => {
                this.dialogFormVisible = false
                this.handleFilter()
                this.$notify({
                  type: 'success',
                  title: this.dialogStatus === OPERATE_CREATE ? '新增成功' : '分配成功',
                  duration: 3000
                })
              })
            }
          }
        })
      }
    }
  }
</script>
