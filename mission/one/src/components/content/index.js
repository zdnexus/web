/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import React, { useEffect } from 'react'
import RequestInfoBtn from '@/components/request-info-btn'
import CodeHighlight from '@/components/codeHighlight'

import './index.scss'

const Content = () => {
  useEffect(() => {
    require('@/lazy')
  }, [])
  return (
    <div id='content'>
      <div id='c1' data-lazy>
        <div className='img' data-lazy/>
        <p className='p1'>Our Vision & Solutions</p>
        <p className='p2'>Autonomous adopts a systematic approach in capitalize investment opportunities in digital assets via an Asset Managed Under Technology model</p>
        <p className='p3'>We offer Digital Investment Strategies, Asset Management & Trading Technology solutions.</p>
      </div>
      <div id='c2' data-lazy>
        <div className='img' data-lazy/>
        <p className='p1'>Digital Investment Strategies</p>
        <p className='p2'>Stay informed and in control</p>
        <p className='p3'>Institutional-grade investment strategies range from systematic beta, systematic alpha and alternative yields.</p>
      </div>
      <div id='c3' data-lazy>
        <div className='img' data-lazy/>
        <p className='p1'>Our Technology</p>
        <p className='p2'>Full stack end-to-end investment automation platform available via web portal or single API</p>
        <p className='p3'>Autonomous provides everything you need to create and manage a complete digital asset portfolio across multiple venues.</p>
        <p className='p4'>We are building modularized investment and trading infrastructures that combine leading technology and financial science.</p>
        <CodeHighlight/>
      </div>
      <div id='c4'>
        <p className='p1'>Technology-first approach to investment management</p>
        <p className='p2'>Jump start your digital investment journey</p>
        <RequestInfoBtn/>
      </div>
    </div>
  )
}


export default Content