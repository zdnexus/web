/**
 * Created by zhongdong on 2023/11/25
 * Url :
 */

export const ROLE_LIST = [
  {
    label: '控制台'
  },
  {
    label: '任务管理',
    children: [
      {
        label: '待办任务'
      },
      {
        label: '历史任务'
      },
    ]
  },
  {
    label: '商品车部门',
    children: [
      {
        label: '订单管理',
        children: [
          {
            label: '待分配任务'
          },
          {
            label: '进心中任务'
          },
          {
            label: '已完成任务'
          },
          {
            label: '已失效任务'
          },
        ]
      },
      {
        label: '车辆管理',
        children: [
          {
            label: '待入库车辆'
          },
          {
            label: '库存车辆'
          },
          {
            label: '已出境车辆'
          },
          {
            label: '有损车辆'
          },
        ]
      },
      {
        label: '费用核算',
      },
      {
        label: '合作方管理',
        children: [
          {
            label: '客户信息管理'
          },
          {
            label: '境内送车司机信息管理'
          },
          {
            label: '境外车队信息管理'
          }
        ]
      },
      {
        label: '参数管理',
        children: [
          {
            label: '服务项管理'
          },
          {
            label: '仓库管理'
          },
          {
            label: '钥匙位置管理'
          },
          {
            label: '车辆类型管理'
          },
          {
            label: '车辆品牌管理'
          },
          {
            label: '车辆型号管理'
          },
        ]
      },
      {
        label: '统计报表',
        children: [
          {
            label: '仓库库存统计报表'
          },
          {
            label: '昨日营收统计'
          },
          {
            label: '月度营收统计'
          }
        ]
      },
    ]
  },
  {
    label: '货运部门',
    children: [
      {
        label: '订单管理',
        children: [
          {
            label: '待分配任务'
          },
          {
            label: '进心中任务'
          },
          {
            label: '已完成任务'
          },
          {
            label: '已失效任务'
          },
        ]
      },
      {
        label: '货运管理',
        children: [
          {
            label: '入境车辆'
          },
          {
            label: '库存车辆'
          },
          {
            label: '出境车辆'
          }
        ]
      },
      {
        label: '费用核算',
      },
      {
        label: '合作方管理',
        children: [
          {
            label: '客户信息管理'
          },
          {
            label: '中方车辆信息管理'
          },
          {
            label: '中方司机信息管理'
          },
          {
            label: '装卸队信息管理'
          },
          {
            label: '境外车辆信息管理'
          },
          {
            label: '境外司机信息管理'
          }
        ]
      },
      {
        label: '参数管理',
        children: [
          {
            label: '服务项管理'
          },
          {
            label: '仓库管理'
          },
          {
            label: '钥匙位置管理'
          },
          {
            label: '车辆类型管理'
          },
          {
            label: '车辆品牌管理'
          },
          {
            label: '车辆型号管理'
          },
        ]
      },
      {
        label: '仓库管理',
      },
      {
        label: '统计报表',
        children: [
          {
            label: '仓库库存统计报表'
          },
          {
            label: '昨日营收统计'
          },
          {
            label: '月度营收统计'
          }
        ]
      },
    ]
  },
  {
    label: '仓库管理',
    children: [
      {
        label: '仓库示意图'
      },
      {
        label: '仓库管理'
      },
    ]
  },
  {
    label: '财务管理',
    children: [
      {
        label: '财务开票'
      },
      {
        label: '财务付款'
      },
      {
        label: '财务报表'
      },
    ]
  },
  {
    label: '公共信息管理',
    children: [
      {
        label: '境外清算公司信息管理'
      },
      {
        label: '费用项管理'
      },
      {
        label: '支付方式'
      },
    ]
  },
  {
    label: '组织管理',
    children: [
      {
        label: '用户管理'
      },
      {
        label: '部门管理'
      },
      {
        label: '岗位管理'
      },
      {
        label: '组织架构图'
      },
    ]
  },
]
