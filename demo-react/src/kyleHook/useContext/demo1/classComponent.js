import React, { Component } from 'react'

import { ThemeContext } from './index'

export default class ClassComponent extends Component {
  themeStyles(dark) {
    return {
      backgroundColor: dark ? '#333' : '#CCC',
      color: dark ? '#CCC' : '#333',
      padding: '2rem',
      margin: dark ? '2rem' : '1rem'
    }
  }
  
  render() {
    return (
      <ThemeContext.Consumer>
        {
          darkTheme => <div style={this.themeStyles(darkTheme)}>Class Theme</div>
        }
      </ThemeContext.Consumer>
    )
  }
}
