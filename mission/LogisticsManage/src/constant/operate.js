/**
 * Created by zhongdong on 2023/9/17
 * Url :
 */
export const OPERATE_CREATE = 'create'

export const OPERATE_DELETE = 'delete'

export const OPERATE_UPDATE = 'update'

export const OPERATE_VIEW = 'view'

export const OPERATE_HANDLE = 'handle'

export const OPERATE_APPROVE = 'approve'

export const OPERATE_EXPIRE = 'expire'

export const OPERATE_UPLOAD = 'upload'

export const OPERATE_MAKE_INITIAL_PLAN = 'make_plan'

export const OPERATE_MAKE_FOLLOW_PLAN = 'make_follow_plan'

export const OPERATE_RESTORE = 'restore'

export const OPERATE_MISSION_DETAILS = 'mission_details'

export const OPERATE_TYPE = {
  [OPERATE_CREATE]: '添加',
  [OPERATE_DELETE]: '删除',
  [OPERATE_UPDATE]: '更新',
  [OPERATE_VIEW]: '查看',
  [OPERATE_HANDLE]: '处理',
  [OPERATE_APPROVE]: '审批',
  [OPERATE_EXPIRE]: '定为失效订单',
  [OPERATE_UPLOAD]: '上传',
  [OPERATE_MAKE_INITIAL_PLAN]: '制定初始计划',
  [OPERATE_MAKE_FOLLOW_PLAN]: '制定后续计划',
  [OPERATE_MISSION_DETAILS]: '任务详情',
  [OPERATE_RESTORE]: '恢复'
}
