<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" placeholder="车架号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.clientName" placeholder="客户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

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

      <el-table-column label="客户名" prop="clientName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车架号" prop="vin" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" prop="type" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="品牌" prop="branding" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.branding }}</span>
        </template>
      </el-table-column>

      <el-table-column label="型号" prop="vehicleModel" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.vehicleModel }}</span>
        </template>
      </el-table-column>

      <el-table-column label="颜色" prop="vehicleColor" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.vehicleColor }}</span>
        </template>
      </el-table-column>

      <el-table-column label="存放仓库" prop="warehouseName" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.warehouseName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="钥匙数量" prop="vehicleKey" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.vehicleKey }}</span>
        </template>
      </el-table-column>

      <el-table-column label="随车配件" prop="carAccessories" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.carAccessories }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆是否有损" prop="isDamage" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ DAMAGE_TYPE_LIST_OBJ[row.isDamage] }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="创建用户" prop="userName" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.userName }}</span>-->
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
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('view',row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEXT_MAP[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <div class="block" v-for="img in temp.photoList" :key="img.label">
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import Upload from '@/components/Upload/SingleImage'
  import { vehicleList, getVehiclePhoto } from '@/api/vehicle/vehicle'
  import { TEXT_MAP, DAMAGE_TYPE_LIST_OBJ, VEHICLE_PHOTO_OBJ } from '@/constant/vehicle'

  export default {
    components: { Pagination, Upload },
    data() {
      return {
        TEXT_MAP,
        DAMAGE_TYPE_LIST_OBJ,
        tableKey: 0,
        list: null,
        photoList: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          vin: undefined,
          clientName: undefined,
          isDamage: 0,
        },
        ids: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          photoList: null
        },
        rules: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        vehicleList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      viewDetail(vin) {
        getVehiclePhoto({
          vin
        }).then(res => {
          this.temp.photoList = []
          Object.keys(res.data).forEach(key => {
            if (VEHICLE_PHOTO_OBJ[key] && res.data[key]) {
              this.temp.photoList.push({
                label: VEHICLE_PHOTO_OBJ[key],
                url: res.data[key],
                type: key === 'video' || key === 'demage' ? key : 'image'
              })
            }
          })
        })
      },
      handleRow(type, row) {
        switch (type) {
          case 'view':
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.viewDetail(row.vin)
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
