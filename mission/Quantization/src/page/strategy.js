import React, { useState, useEffect } from 'react'
import { Select, Table } from 'antd'
import { fullUp, fullUpOnlyHighest, fullUpOnlyLowest, fullUpRestart, fullUpTop, tradeDateList } from '@/api'
import { options } from '@/constant'
import { timestampToString, getDayOfWeek } from '@/utils'

const columns = [
  {
    title: '代号',
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

const App = () => {
  const [tableData, setTableData] = useState()
  const [strategy, setStrategy] = useState()
  const [dateList, setDateList] = useState([])
  const [date, setDate] = useState()
  
  
  const handleChangeStrategy = (value) => {
    setStrategy(value)
  }
  
  const handleChangeDate = (value) => {
    setDate(value)
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
      }
      func(date).then(res => {
        const data = res ? res.data.map((item, index) => ({
          key: index,
          code: item.code,
          name: item.name,
          pctChg: item.pctChg + '%',
          close: item.close,
          category: item.category.join('/'),
          introduce: item.introduce
        })) : []
        setTableData(data)
      })
    }
  }, [strategy, date])
  
  return (
    <>
      <Select
        placeholder="日期"
        style={{ width: 200 }}
        onChange={handleChangeDate}
        options={dateList}
      />
      <Select
        placeholder="策略"
        style={{ width: 200 }}
        onChange={handleChangeStrategy}
        options={options}
      />
      {
        strategyList.map(item => (
          <Table key={item} columns={columns} dataSource={tableData}/>
        ))
      }
    </>
  )
}

export default App