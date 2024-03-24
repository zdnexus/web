import React, { useState, useEffect } from 'react'
import { Select, Table, Input } from 'antd'
import { fullUp, fullUpOnlyHighest, fullUpOnlyLowest, fullUpRestart, fullUpTop, tradeDateList, yth, sjzg, yggf, tcg, stq, kcxx, hczb } from '@/api'
import { options } from '@/constant'
import { timestampToString, getDayOfWeek } from '@/utils'

const columns = [
  {
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    render: (text) => <a href={`https://www.xueqiu.com/S/${text.replace('.', '')}`} target="_blank">{text}</a>,
    width: 100
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },
  {
    title: '涨幅',
    dataIndex: 'pctChg',
    key: 'pctChg',
    width: 100
  },
  {
    title: '收盘价',
    dataIndex: 'close',
    key: 'close',
    width: 100
  },
  {
    title: '市值',
    dataIndex: 'marketValue',
    key: 'marketValue',
    width: 100
  },
  {
    title: '类型',
    dataIndex: 'category',
    key: 'category',
    width: 200
  },
  {
    title: '介绍',
    dataIndex: 'introduce',
    key: 'introduce',
  }
]

const strategyList = [
  'fullUp'
]

let cacheList = []

const App = () => {
  const [tableData, setTableData] = useState([])
  const [strategy, setStrategy] = useState()
  const [dateList, setDateList] = useState([])
  const [date, setDate] = useState()
  
  const handleChangeStrategy = (value) => {
    setStrategy(value)
  }
  
  const handleChangeDate = (value) => {
    setDate(value)
  }
  
  const handleChangeName = (e) => {
    if (e.target.value) {
      const list = cacheList.filter(item => item.name.indexOf(e.target.value) >= 0)
      setTableData(list)
    } else {
      setTableData(cacheList)
    }
  }
  
  const handleChangePrice = (e) => {
    if (e.target.value) {
      const list = cacheList.filter(item => item.marketValue <= Number(e.target.value))
      setTableData(list)
    } else {
      setTableData(cacheList)
    }
  }
  
  useEffect(() => {
    const reqData = () => {
      tradeDateList().then(res => {
        const dateNow = timestampToString()
        const data = res ? res.data.filter(item => item <= dateNow).sort((a, b) => (new Date(b) - new Date(a))).map(item => ({
          label: `${item} ${getDayOfWeek(item)}`,
          value: item
        })) : []
        setDateList(data)
      })
    }
    reqData()
  }, [])
  
  useEffect(() => {
    if (strategy && date) {
      let func
      switch (strategy) {
        case 'fullUp':
          func = fullUp
          break
        case 'fullUpOnlyHighest':
          func = fullUpOnlyHighest
          break
        case 'fullUpOnlyLowest':
          func = fullUpOnlyLowest
          break
        case 'fullUpRestart':
          func = fullUpRestart
          break
        case 'fullUpTop':
          func = fullUpTop
          break
        case 'yth':
          func = yth
          break
        case 'sjzg':
          func = sjzg
          break
        case 'yggf':
          func = yggf
          break
        case 'tcg':
          func = tcg
          break
        case 'stq':
          func = stq
          break
        case 'kcxx':
          func = kcxx
          break
        case 'hczb':
          func = hczb
          break
      }
      func(date).then(res => {
        const data = res ? res.data.map((item, index) => ({
          key: index,
          code: item.code,
          name: item.name,
          pctChg: item.pctChg + '%',
          close: item.close,
          marketValue: item.marketValue,
          category: item.category.join('/'),
          introduce: item.introduce
        })) : []
        cacheList = data
        setTableData(data)
      })
    }
  }, [strategy, date])
  
  return (
    <>
      <Select
        placeholder="选择日期"
        style={{ width: 200 }}
        onChange={handleChangeDate}
        options={dateList}
      />
      <Select
        placeholder="选择策略"
        style={{ width: 200 }}
        onChange={handleChangeStrategy}
        options={options}
      />
      <Input style={{ width: 200 }} placeholder="搜索名称" onChange={handleChangeName}/>
      <Input style={{ width: 200 }} placeholder="搜索市值(少于)" onChange={handleChangePrice}/>
      {
        strategyList.map(item => (
          <Table key={item} columns={columns} dataSource={tableData}/>
        ))
      }
    </>
  )
}

export default App