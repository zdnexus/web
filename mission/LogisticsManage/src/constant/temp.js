/**
 * Created by zhongdong on 2023/9/17
 * Url :
 */
export const TEMP_TYPE_CREATE = 'create'

export const TEMP_TYPE_DELETE = 'delete'

export const TEMP_TYPE_UPDATE = 'update'

export const TEMP_TYPE_VIEW = 'view'

export const TEMP_TYPE_HANDLE = 'handle'

export const TEMP_TYPE_APPROVE = 'approve'

export const TEMP_TYPE_EXPIRE = 'expire'

export const TEMP_TYPE_UPLOAD = 'upload'

export const TEMP_MAKE_INITIAL_PLAN = 'make_plan'

export const TEMP_MAKE_FOLLOW_PLAN = 'make_follow_plan'

export const TEMP_TYPE_RESTORE = 'restore'

export const TEMP_MISSION_DETAILS = 'mission_details'

export const TEMP_TYPE = {
  [TEMP_TYPE_CREATE]: '添加',
  [TEMP_TYPE_DELETE]: '删除',
  [TEMP_TYPE_UPDATE]: '更新',
  [TEMP_TYPE_VIEW]: '查看',
  [TEMP_TYPE_HANDLE]: '处理',
  [TEMP_TYPE_APPROVE]: '审批',
  [TEMP_TYPE_EXPIRE]: '定为失效订单',
  [TEMP_TYPE_UPLOAD]: '上传',
  [TEMP_MAKE_INITIAL_PLAN]: '制定初始计划',
  [TEMP_MAKE_FOLLOW_PLAN]: '制定后续计划',
  [TEMP_MISSION_DETAILS]: '任务详情',
  [TEMP_TYPE_RESTORE]: '恢复'
}
