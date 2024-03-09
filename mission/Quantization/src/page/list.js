import React, { useState, useEffect } from 'react'
import { Avatar, List } from 'antd'
import { tradeDateList } from '../api'
import { timestampToString } from '../utils'

const App = () => {
  const [list, setList] = useState([])
  
  
  useEffect(() => {
    const reqApi = () => {
      tradeDateList().then(res => {
        const date = timestampToString()
        const data = res.data.filter(item => item <= date)
        setList(data)
      })
    }
    reqApi()
  }, [])
  
  
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
            title={<a href="https://ant.design">{item}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}

export default App