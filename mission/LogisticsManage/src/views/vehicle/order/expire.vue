<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"/>

      <el-button type="primary" icon="el-icon-search" class="filter-item" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="listKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
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

      <el-table-column label="更新时间" prop="updateTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow(OPERATE_VIEW,row)">
            {{OPERATE_TYPE[OPERATE_VIEW]}}
          </el-button>

          <el-popconfirm title="确认要恢复吗？" @onConfirm="handleRow(OPERATE_RESTORE,row)">
            <el-button slot="reference" size="mini" type="danger">
              {{OPERATE_TYPE[OPERATE_RESTORE]}}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;" :disabled="true">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin"/>
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
        />
      </el-form>
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
    allocateOrder,
    orderRestore
  } from '@/api/vehicle/order'
  import {
    OPERATE_VIEW,
    OPERATE_RESTORE,
    OPERATE_TYPE,
    TREE_DATA,
    ORDER_EXAMINE_STATUS_OBJ
  } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        OPERATE_VIEW,
        OPERATE_RESTORE,
        OPERATE_TYPE,
        TREE_DATA,
        ORDER_EXAMINE_STATUS_OBJ,
        defaultTreeProps: {
          children: 'children',
          label: 'label',
          value: 'value'
        },
        listKey: 0,
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
          status: 3,
          vin: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          vin: undefined,
          vehicleType: undefined,
          client: undefined,
          supplierName: undefined,
          service: undefined,
          orderSmallLinkItem: undefined,
          orderBaseInfo: undefined
        }
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
        serviceList().then(res => {
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
      renderContent(h, { node, data, store }) {
        if (this.dialogStatus === OPERATE_VIEW && this.allocationList && this.temp.orderBaseInfo) {
          const options = this.allocationList[node.data.options] || []
          return (
            <span class='custom-tree-node'>
            <span>{node.label}</span>
              {
                options.length > 0
                  ? <el-select v-model={this.temp.orderBaseInfo[node.data.value]}
                               className='filter-item'
                               style='margin-left:30px'
                               placeholder=''
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
            <span class='custom-tree-node'>
            <span>{node.label}</span>
          </span>
          )
        }
        // return (
        //   <span className="custom-tree-node">
        //       <span>{node.label}</span>
        //     {
        //       this.dialogStatus === OPERATE_VIEW && (this.allocationList[node.data.options] || []).length > 0
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
          case OPERATE_VIEW:
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
          case OPERATE_RESTORE:
            orderRestore([row.id]).then(() => {
              this.$restoreTempNotify()
              this.handleFilter()
            })
            break
        }
      }
    }
  }
</script>
