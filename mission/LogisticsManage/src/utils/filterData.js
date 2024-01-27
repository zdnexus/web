/**
 * Created by zhongdong on 2024/1/27
 * Url :
 */
import {
  DECLARE_UPLOAD,
  DECLARE_CHECK,
  RECORD_UPLOAD,
  RECORD_CHECK,
  CUSTOM_CAR,
  DMFA,
  FMFA,
  CMFA,
  DM_NUMS_WARN,
  CM_NUMS_WARN,
  TRACK,
  ARRIVE
} from '@/constant'

export const missionShowHandle = (smallLink) => {
  return [DECLARE_UPLOAD, DECLARE_CHECK, RECORD_UPLOAD, RECORD_CHECK, CUSTOM_CAR, DMFA, FMFA, CMFA, DM_NUMS_WARN, CM_NUMS_WARN, TRACK, ARRIVE].includes(smallLink)
}
