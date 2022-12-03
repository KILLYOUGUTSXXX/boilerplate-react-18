import React, { Component, useContext, createContext } from 'react'

// built a solid context props.
const WrapperContext = createContext()

class WrapperRouters extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.localContext = createContext()
  }
  componentWillMount () {
    // register models
    typeof this.props.registerModels === 'function' ? this.props.registerModels() : null
  }
  render () {

    const {
      component: RenderedComponent = {},
      children = null,
      connectedprops = {}
    } = this.props

    // create global function to move the state of menus
    const redirectTo = (path) => {
      connectedprops.history.push(path)
    }

    return (
      <div>
        <WrapperContext.Consumer>
          {
            // rendering the context props.
            cProps => (
              <RenderedComponent {...{ ...connectedprops, ...this.state, ...cProps }} redirectTo={redirectTo} WrapperContext={WrapperContext}>
                {children}
              </RenderedComponent>
            ) 
          }
        </WrapperContext.Consumer>
        
      </div>
    )
  }
}

export default WrapperRouters