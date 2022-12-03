import React, { Component } from 'react'
import { Row, Col, Card, Select, Button, Popover, List, Tooltip } from 'antd'
import { EyeOutlined, GithubFilled } from '@ant-design/icons'


class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listRoutes: [
        { label: 'Child 01', key: '/child-01' },
        { label: 'Child 02', key: '/child-02', children: [{ label: 'Child 02-01', key: '/child-02/01' }] },
        { label: 'Child 03', key: '/child-03' }
      ]
    }
  }
  contentDescriptions () {
    const listTechnologies = [
      <span>React (v18.x) <a href="https://reactjs.org" target="_blank">Visit</a></span>,
      <span>Antd (v4.x) <a href="https://4x.ant.design" target="_blank">Visit</a></span>,
      <span>React Router (v5.x) <a href="https://v5.reactrouter.com/" target="_blank">Visit</a></span>,
      <span>Redux (v4.x) <a href="https://redux.js.org/" target="_blank">Visit</a></span>,
      <span>Webpack (v5.x) <a href="https://webpack.js.org" target="_blank">Visit</a></span>,
      <span>LessCSS (v4.x) <a href="https://lesscss.org/" target="_blank">Visit</a></span>,
      <span>Babel (v7.x) <a href="https://babeljs.io/" target="_blank">Visit</a></span>,
      'Etc'
    ]
    return (
      <List 
        bordered
        dataSource={listTechnologies}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    )
  }
  
  onChanges (cPath) {
    // push pathname & redirect menu
    return this.props.redirectTo(cPath)
  }

  buildOptionMenus (data) {
    return data.map(x => {
      if(x.children) {
        // recursion the data when found a child data.
        // and generate the parent options.
        return <Select.OptGroup key={x.key} label={x.label}>{this.buildOptionMenus(x.children)}</Select.OptGroup>
      }
      return <Select.Option key={x.key} value={x.key}>{x.label}</Select.Option>
    })
  }
  render () {
    const contentProfiles = (
      <a className="text-emerald-900" href="https://github.com/KILLYOUGUTSXXX" target="_blank">
        <span>Find me in <GithubFilled className="text-lg" /></span>
      </a>
    )
    return (
      <Row justify="center" className="root-components">
        <Col span={16}>
          <Row align="middle">
            <Col span={24}>
              <h3 style={{ color: 'white' }}>
                The boilerplate is made by&nbsp;
                <Tooltip title={contentProfiles} placement="topLeft" color="gold">
                  <strong style={{ color: 'gray' }}>@KILLYOUGUTSXXX</strong>
                </Tooltip>
              </h3>
              <h4 style={{ color: 'white' }}>
                Which includes several technology such as &nbsp;&nbsp;
                <Popover content={this.contentDescriptions()} trigger="click">
                  <Button icon={<EyeOutlined  />} type="primary">
                    Click to Show More Descriptions
                  </Button>
                </Popover>
              </h4>
            </Col>
            <Col span={24} style={{ marginBottom: 8 }}>
              <Select style={{ width: '100%' }} onChange={(p) => this.onChanges(p)} defaultValue={this.props.location.pathname}>
                {this.buildOptionMenus(this.state.listRoutes)}
              </Select>
            </Col>
            <Col span={24}>
              <Card>{this.props.children}</Card>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}



export default Main