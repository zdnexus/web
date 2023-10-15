/**
 * Created by zhongdong on 2023/9/24
 * Url :
 */

import request from './request'

export const upcomingTaskList = (data) => request('/vehicle/upcomingTask/list?taskStatus=0', 'GET', data)

export const getToken = (data) => request('/public/qiniu/upload/token', 'GET', data)

export const getVehicleInfo = (data) => request('/vehicle/vehicleInfo/getVehicleInfo', 'POST', data)

export const finishInspection = (data) => request('/vehicle/vehicleInfo/finishInspection', 'POST', data)