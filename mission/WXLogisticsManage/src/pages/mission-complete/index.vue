<template>
  <view class="content">
    <view class="user-input">
      <uni-easyinput v-model="temp.vin" class="input" placeholder="车架号" @input="vinInput"></uni-easyinput>

      <uni-data-select v-model="temp.bigLink" class="select" :localdata="selectData" placeholder="环节" @change="bigLinkChange"></uni-data-select>
    </view>

    <button class="button" type="primary" size="mini" @click="getData">搜索</button>

    <uni-table class="table" border stripe :loading="tableLoading" emptyText="暂无更多数据">
      <uni-tr>
        <uni-th width="90">车架号</uni-th>
        <uni-th width="90">事务</uni-th>
        <uni-th width="90">任务名称</uni-th>
        <uni-th width="90">操作</uni-th>
      </uni-tr>

      <uni-tr v-for="(item, index) in tableData" :key="index">
        <uni-td>{{item.vin}}</uni-td>
        <uni-td>{{item.bigLinkConvert}}</uni-td>
        <uni-td>{{item.smallLinkConvert}}</uni-td>
        <uni-td>
          <view class="button-group">
            <button class="button" type="primary" size="mini" @click="toLink(item)">处理</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>

    <uni-pagination class="pagination" :total="totalNum" @change="pageChange"></uni-pagination>
  </view>
</template>

<script>
  import { upcomingTaskList } from '@/api/index'
  import { TREE_DATA } from '@/constant/index'
  
  export default {
    data() {
      return {
        temp: {
          vin: '',
          bigLink: '',
          pageNum: 1,
          pageSize: 10,
          taskStatus: 1
        },
        selectData: [],
        tableData: [],
        totalNum: 0,
        tableLoading: false,
      }
    },
    onTabItemTap(e) {
      this.getData()
    },
    onLoad() {
      this.getData()
    },
    onShow() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        this.getLink()
        upcomingTaskList({
          vin: this.temp.vin,
          bigLink: this.temp.bigLink,
          pageNum: this.temp.pageNum,
          pageSize: this.temp.pageSize,
          taskStatus: this.temp.taskStatus
        }).then((res) => {
          this.tableData = res.data.list
          this.totalNum = res.data.total
          this.tableLoading = false
        })
      },
      getLink() {
        this.selectData = TREE_DATA.map((node) => ({
          text: node.label,
          value: node.value
        }))
      },
      vinInput(event) {
        this.temp.vin = event.target.value
      },
      bigLinkChange(event) {
        this.temp.bigLink = event
      },
      pageChange(type) {
        this.temp.pageNum = type.current
        this.getData()
      },
      toLink(row) {
        wx.navigateTo({
          url: `../link/index?vin=${row.vin}&smallLink=${row.smallLink}&smallLinkConvert=${row.smallLinkConvert}&taskId=${row.id}&taskStatus=${this.temp.taskStatus}`
        })
      }
    },
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .user-input {
      width: 100%;
      padding: 5px 10px;
      box-sizing: border-box;
    }

    .input, .select, .button, .table {
      width: 100%;
      margin: 5px;
    }

    .pagination {
      margin: 10px 0;
    }

    .button {
      background-color: #007aff;
      color: #fff;
    }
  }
</style>
