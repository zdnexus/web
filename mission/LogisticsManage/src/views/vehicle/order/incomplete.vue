<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
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

      <el-table-column label="客户姓名" prop="clientName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="接车验车" prop="inspection" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'inspection')">{{ NODE_LIST_OBJ[row.inspection] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="非监管仓" prop="ncr" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'ncr')">{{ NODE_LIST_OBJ[row.ncr] }}</a>
        </template>
      </el-table-column>
      <el-table-column label="报关" prop="declaration" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'declaration')">{{ NODE_LIST_OBJ[row.declaration] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="监管仓" prop="bwh" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'bwh')">{{ NODE_LIST_OBJ[row.bwh] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="司机送车" prop="edv" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'edv')">{{ NODE_LIST_OBJ[row.edv] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="出境" prop="ed" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'ed')">{{ NODE_LIST_OBJ[row.ed] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="境外" prop="oec" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'oec')">{{ NODE_LIST_OBJ[row.oec] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="220">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" :disabled="row.orderStatus === ORDER_EXAMINE_STATUS_AUDITING" @click="handleRow(TEMP_MAKE_PLAN,row)">
            {{ TEMP_TYPE[TEMP_MAKE_PLAN] }}
          </el-button>

          <el-popconfirm title="确认要定为失效名单吗？" @onConfirm="handleRow(TEMP_TYPE_EXPIRE,row)">
            <el-button size="mini" type="danger" slot="reference">
              {{ TEMP_TYPE[TEMP_TYPE_EXPIRE] }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <Link :visible="linkFormVisible"
          :disabled="true"
          :baseComponents="baseComponents"
          :formData="linkData"></Link>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin" :disabled="this.dialogStatus === TEMP_MAKE_PLAN"></el-input>
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
  import Link from '@/components/Link'
  import { parameterVehicleTypeList } from '@/api/vehicle/parameter/vehicle-type'
  import { cooperateCustomList } from '@/api/vehicle/cooperate/custom'
  import { parameterServiceList } from '@/api/vehicle/parameter/server'
  import {
    vehicleOrderList,
    orderBigLinklnfo,
    orderSmallLinkItemList,
    orderAllocationList,
    addDmNumberTask,
    allocateOrder
  } from '@/api/vehicle/order'
  import {
    TREE_DATA,
    TEMP_TYPE,
    TEMP_MAKE_PLAN,
    TEMP_TYPE_EXPIRE,
    NODE_LIST_OBJ,
    VEHICLE_INFO_OBJ,
    VEHICLE_PHOTO_OBJ,
    ORDER_STATUS_OBJ,
  } from '@/constant'
  import {
    TREE_DATA_BIG_NODE_OBJ,
    INSPECTION,
    NCR,
    DECLARATION,
    BWH,
    EDV,
    ED,
    OEC
  } from '@/constant/pageCompoent'

  export default {
    components: {
      Pagination,
      Link
    },
    data() {
      return {
        TREE_DATA,
        TEMP_TYPE,
        TEMP_MAKE_PLAN,
        TEMP_TYPE_EXPIRE,
        NODE_LIST_OBJ,
        defaultTreeProps: {
          children: 'children',
          label: 'label',
          value: 'value'
        },
        listKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: 1,
          vin: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {},
        rules: {
          vin: [{ required: true, message: '输入车架号', trigger: 'change' }],
          vehicleType: [{ required: true, message: '请选择发货车型', trigger: 'change' }],
          client: [{ required: true, message: '请选择客户', trigger: 'change' }],
          supplierName: [{ required: true, message: '请输入供应商', trigger: 'change' }],
          service: [{ required: true, message: '请选择服务项', trigger: 'change' }]
        },
        linkFormVisible: false,
        baseComponents: [],
        linkData: null
      }
    },
    created() {
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
      reqDetail(row, bigLinKey) {
        orderBigLinklnfo({
          vin: row.vin,
          orderId: row.id,
          bigLinKey,
        }).then(res => {
          switch (bigLinKey) {
            case 'inspection':
              this.baseComponents = INSPECTION
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.vehicleBaseInfo,
                ...res.data.vehiclePhoto,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'ncr':
              this.baseComponents = NCR
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.ncrBigLinkBaseInfoItem,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'declaration':
              this.baseComponents = DECLARATION
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'bwh':
              this.baseComponents = BWH
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.ncrBigLinkBaseInfoItem,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'edv':
              this.baseComponents = EDV
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'ed':
              this.baseComponents = ED
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'oec':
              this.baseComponents = OEC
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleTrackRecordList: res.data.vehicleTrackRecordList,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
          }
          this.linkFormVisible = true
        })
      },
      renderContent(h, { node, data, store }) {
        if (this.dialogStatus === TEMP_MAKE_PLAN && this.allocationList && this.temp.orderBaseInfo) {
          const options = this.allocationList[node.data.options] || []
          return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              {
                options.length > 0
                  ? <el-select v-model={this.temp.orderBaseInfo[node.data.value]}
                               style="margin-left:30px"
                               placeholder=""
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
      handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case TEMP_MAKE_PLAN:
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
        }
      },
      handleData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogStatus === TEMP_MAKE_PLAN) {
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
            if (this.dialogStatus === TEMP_MAKE_PLAN && (temp.vehiclesNumber > 3 || (temp.vehiclesNumber <= 3 && temp.orderStatus === '2'))) {
              const fun = allocateOrder
              temp.clientName = temp.client.label
              temp.clientId = temp.client.value
              temp.serviceName = temp.service.label
              temp.serviceId = temp.service.value
              fun(temp).then(() => {
                this.dialogFormVisible = false
                this.handleFilter()
                this.$notify({
                  type: 'success',
                  title: '分配成功',
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
      }
    },
  }
</script>
