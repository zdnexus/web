/**
 * Created by zhongdong on 2023/9/24
 * Url :
 */

import request from './request'

export const login = (data) => request('/login', 'POST', data)

export const vehicleHalfYear = (data) => request('/vehicle/monthOrder/vehicleHalfYear', 'GET', data)

export const orderNum = (data) => request('/vehicle/orderFee/orderNum', 'POST', data)

export const userInfo = (data) => request('/getInfo', 'GET', data)

export const updatePwd = (data) => request('/system/user/profile/updatePwd', 'POST', data)

export const upcomingTaskList = (data) => request('/vehicle/upcomingTask/list', 'GET', data)

export const getToken = () => request('/public/qiniu/upload/token', 'POST')

export const getVehicleInfo = (data) => request('/vehicle/vehicleInfo/getVehicleInfo', 'POST', data)

export const finishInspection = (data) => request('/vehicle/vehicleInfo/finishInspection', 'POST', data)

export const updateInWarehouse = (data) => request('/vehicle/storageFee/updateInWarehouse', 'POST', data)

export const rejectStorage = (data) => request('/vehicle/storageFee/rejectStorage', 'POST', data)

export const inWarehouseInfo = (data) => request('/vehicle/upcomingTask/inWarehouseInfo', 'POST', data)

export const storagePhoto = (data) => request('/vehicle/storageFee/storagePhoto', 'POST', data)

export const cardInfo = (data) => request('/vehicle/upcomingTask/cardInfo', 'POST', data)

export const creditCard = (data) => request('/vehicle/upcomingTask/creditCard', 'POST', data)

export const outWarehouse = (data) => request('/vehicle/storageFee/outWarehouse', 'POST', data)

export const rejectOutWarehouse = (data) => request('/vehicle/storageFee/rejectOutWarehouse', 'POST', data)

export const outConfirm = (data) => request('/vehicle/storageFee/outConfirm', 'POST', data)

export const trimInfo = (data) => request('/vehicle/upcomingTask/trimInfo', 'POST', data)

export const trim = (data) => request('/vehicle/upcomingTask/trim', 'POST', data)

export const sealInfo = (data) => request('/vehicle/upcomingTask/sealInfo', 'POST', data)

export const sealUpld = (data) => request('/vehicle/upcomingTask/sealUpld', 'POST', data)

export const driveInfo = (data) => request('/vehicle/upcomingTask/driveInfo', 'POST', data)

export const outboundInfo = (data) => request('/vehicle/upcomingTask/outboundInfo', 'POST', data)

export const outbound = (data) => request('/vehicle/upcomingTask/outbound', 'POST', data)

export const handoverInfo = (data) => request('/vehicle/upcomingTask/handoverInfo', 'POST', data)

export const handover = (data) => request('/vehicle/upcomingTask/handover', 'POST', data)

export const trackRecordInfo = (data) => request('/vehicle/upcomingTask/trackRecordInfo', 'POST', data)

export const trackRecord = (data) => request('/vehicle/trackRecord', 'POST', data)

export const arriveInfo = (data) => request('/vehicle/upcomingTask/arriveInfo', 'POST', data)

export const abroad = (data) => request('/vehicle/abroad', 'POST', data)

export const checkRecordInfo = (data) => request('/vehicle/declare/checkRecordInfo', 'POST', data)

export const recordUpld = (data) => request('/vehicle/declare/recordUpld', 'POST', data)

export const dealInWarehouseInfo = (data) => request('/vehicle/upcomingTask/dealInWarehouseInfo', 'POST', data)

export const checkInWareHouseReq = (data) => request('/vehicle/upcomingTask/checkInWareHouseReq', 'POST', data)

export const dealOutWarehouseInfo = (data) => request('/vehicle/upcomingTask/dealOutWarehouseInfo', 'POST', data)

export const checkOutWareHouseReq = (data) => request('/vehicle/upcomingTask/checkOutWareHouseReq', 'POST', data)

export const rejectDriveInfo = (data) => request('/vehicle/upcomingTask/rejectDriveInfo', 'POST', data)

export const checkRejectDriveInfo = (data) => request('/vehicle/upcomingTask/checkRejectDriveInfo', 'POST', data)
