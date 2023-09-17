<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
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
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 600px; margin-left:10px;">
        <div class="block" v-if="temp.baseInfoList">
          <h2>车辆基本信息</h2>
          <el-form-item v-for="input in temp.baseInfoList" :label="input.label" :key="input.label">
            <el-input :value="input.value" style="width: 200px" class="filter-item" disabled="true"></el-input>
          </el-form-item>
        </div>

        <div class="block" v-if="temp.photoList">
          <h2>车辆图片</h2>
          <div v-for="img in temp.photoList" :key="img.label">
            <span class="demonstration">{{ img.label }}</span>
            <el-image
              v-if="img.type ==='image'"
              style="width: 100px; height: 100px"
              :src="img.url"></el-image>
            <el-image
              v-else-if="img.type ==='demage'"
              v-for="img2 in img.url.split(',')"
              style="width: 100px; height: 100px"
              :src="img2"
            ></el-image>
            <video v-else width="300" height="300" :src="img.url" autoplay="autoplay" loop="loop"></video>
          </div>
        </div>

        <div class="block" v-if="temp.updateList">
          <h2>操作记录</h2>
          <el-table :data="temp.updateList" style="width: 100%">
            <el-table-column prop="vin" label="车架号"></el-table-column>
            <el-table-column prop="bigLink" label="环节名称"></el-table-column>
            <el-table-column prop="smallLink" label="任务名称"></el-table-column>
            <el-table-column prop="userName" label="任务人"></el-table-column>
            <el-table-column prop="taskStatus" label="是否完成"></el-table-column>
            <el-table-column prop="updateTime" label="完成时间"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { vehicleOrderList, orderBigLinklnfo } from '@/api/vehicle/order'
  import {
    TEMP_TYPE,
    TREE_DATA,
    NODE_LIST_OBJ,
    VEHICLE_INFO_OBJ,
    VEHICLE_PHOTO_OBJ,
    ORDER_STATUS_OBJ,
  } from '@/constant/vehicle'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        NODE_LIST_OBJ,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: 2,
          vin: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {},
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
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case 'view':
            orderBigLinklnfo({
              vin: row.vin,
              orderid: row.id
            }).then(res => {

            })
            break
        }
      },
      reqDetail(row, bigLinKey) {
        orderBigLinklnfo({
          vin: row.vin,
          orderId: row.id,
          bigLinKey,
        }).then(res => {
          this.temp = {}
          if (res.data.vehicleBaseInfo) {
            this.temp.baseInfoList = []
            const vehicleBaseInfo = res.data.vehicleBaseInfo
            Object.keys(vehicleBaseInfo).forEach((key) => {
              if (VEHICLE_INFO_OBJ[key] && vehicleBaseInfo[key]) {
                this.temp.baseInfoList.push({
                  label: VEHICLE_INFO_OBJ[key],
                  value: vehicleBaseInfo[key]
                })
              }
            })
          }
          if (res.data.vehiclePhoto) {
            this.temp.photoList = []
            const vehiclePhoto = res.data.vehiclePhoto
            Object.keys(vehiclePhoto).forEach((key) => {
              if (VEHICLE_PHOTO_OBJ[key] && vehiclePhoto[key]) {
                this.temp.photoList.push({
                  label: VEHICLE_PHOTO_OBJ[key],
                  url: vehiclePhoto[key],
                  type: key === 'video' || key === 'demage' ? key : 'image'
                })
              }
            })
          }
          if (res.data.vehicleUpcomingTaskList.length > 0) {
            let bigLink
            let smallLink
            this.temp.updateList = res.data.vehicleUpcomingTaskList.map((item) => {
              TREE_DATA.forEach((t1) => {
                t1.children.forEach((t2) => {
                  if (t2.value === item.smallLink) {
                    bigLink = t1.label
                    smallLink = t2.label
                  }
                })
              })
              return {
                vin: item.vin,
                bigLink,
                smallLink,
                taskStatus: ORDER_STATUS_OBJ[item.taskStatus],
                userName: item.userName,
                updateTime: item.updateTime
              }
            })
          }
          this.dialogFormVisible = true
        })
      }
    }
  }
</script>
