import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'

function MainTesting ({ ...props }) {
  const { text } = props.main


  return (
    <div>
      <h2>This is Child Routes 03</h2>

      <Row className="content-child">
        <Col span={24}>
          <h2><strong>*</strong> {text} <strong>*</strong></h2>
          <p className="t-italic t-underline">The value that you input before on routers "child-01", would be rendered here.</p>
        </Col>
      </Row>
    </div>
  )
}

export default connect(
  ({ main, loading }) => ({ main, loading })
)(MainTesting)