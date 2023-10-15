<template>
  <view class="content">
    <view class="user-input">
      <uni-easyinput v-model="temp.vin" class="input" placeholder="车架号" @input="onKeyInput"></uni-easyinput>

      <uni-data-select v-model="temp.link" class="select" :localdata="selectData" placeholder="环节" @change="change"></uni-data-select>
    </view>

    <button class="button" type="primary" size="mini">搜索</button>

    <uni-table class="table" border stripe :loading="tableLoading" emptyText="暂无更多数据">
      <uni-tr>
        <uni-th width="75">车架号</uni-th>
        <uni-th width="75">事务</uni-th>
        <uni-th width="75">任务名称</uni-th>
        <uni-th width="75">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in tableData" :key="index">
        <uni-td>{{item.vin}}</uni-td>
        <uni-td>{{item.bigLinkConvert}}</uni-td>
        <uni-td>{{item.smallLinkConvert}}</uni-td>
        <uni-td>
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary" @click="toLink(item)">审批</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<script>
  import { upcomingTaskList } from '../../api/index'
  import { TREE_DATA } from '../../constant/index'

  export default {
    data() {
      return {
        temp: {
          vin: '',
          link: ''
        },
        selectData: [],
        inputValue: '',
        tableData: [],
        tableLoading: false,
      }
    },
    onLoad() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        this.getLink()
        upcomingTaskList().then((res) => {
          this.tableData = res.data.list
          this.tableLoading = false
        })
      },
      getLink() {
        this.selectData = TREE_DATA.map((node) => ({
          text: node.label,
          value: node.id
        }))
      },
      onKeyInput(event) {
        this.inputValue = event.target.value
      },
      change(event) {

      },
      toLink(row) {
        wx.navigateTo({
          url: `../link/index?vin=${row.vin}&smallLink=${row.smallLink}&smallLinkConvert=${row.smallLinkConvert}&taskId=${row.id}`
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
  }
</style>
