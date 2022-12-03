import React from 'react'
import { Row, Col, Input, Button, Form } from 'antd'
import { connect } from 'react-redux'
import { createEffects } from '../../models/index.store'

function MainTesting ({ ...props }) {
  // build a form state
  const [form] = Form.useForm()

  // call the mapping action
  const callAction = props.callAction

  // fetch the value "text" from state of models "main"
  const { text } = props.main

  const onSaveText = () => {
    // get the field values
    const data = form.getFieldsValue()

    // trigger to existing "actions" to updating the state of "text" in models "main".
    callAction({ type: 'main/setText', payload: { text: data.text } })
    
    
    form.resetFields() // reset the fields
  }

  return (
    <div>
      <h2>This is Child Routes 01</h2>

      <Row className="content-child">
        <Col span={24}>
          <h3><strong>*</strong> {text} <strong>*</strong></h3>
        </Col>
        <Col span={24}>
          <Row wrap={false} className="grid">
            <Form form={form}>
              <Form.Item name="text">
                <Input id="input-text" autoComplete="off" onPressEnter={() => onSaveText()} />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={() => onSaveText()}>Save</Button>
          </Row>
          <p className="t-italic t-underline">
            The value that you input would be distribute to every routes that consuming the state of models "main".
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default connect(
  ({ main, loading }) => ({ main, loading }), // mapping selected state of models
  (dispatch) => ({ callAction: createEffects(dispatch) }) // mapping the actions, to bridging your "reducer function" which would be used to update the global state.
)(MainTesting)