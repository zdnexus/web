<template>
  <div class="link-operateList">
    <h3>操作记录</h3>
    <el-table :key="listKey" :data="list" border fit highlight-current-row>
      <el-table-column label="车架号" prop="vin" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="环节名称" prop="bigLink" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.bigLink }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务名称" prop="smallLink" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.smallLink }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务人" prop="userName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否完成" prop="taskStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ TASK_STATUS_OBJ[row.taskStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="完成时间" prop="updateTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { TASK_STATUS_OBJ } from '@/constant'

  export default {
    name: 'operateList',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        TASK_STATUS_OBJ,
        listKey: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

