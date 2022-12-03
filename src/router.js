import React, { Fragment } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import RouterConfig from './utils/RouterConfigurations'



function Routers ({ history }) {

  // list the path of routes
  const routes = [
    {
      path: '',
      component: require('./routes/route.main'),
      children: [
        {
          path: 'child-01',
          component: require('./routes/main/child.route-01'),
          assignModels () {
            // require('./models/main/model.main')
            // ...otherModelsHere
          }
        },
        {
          path: 'child-02',
          component: require('./routes/main/child.route-02'),
          children: [
            {
              path: '01',
              component: require('./routes/main/child.route-02-01'),
              assignModels () {}
            },
            {
              path: '*',
              component: () => <div>No Sub Child Routes found</div>
            }
          ]
        },
        {
          path: 'child-03',
          component: require('./routes/main/child.route-03'),
          assignModels () {}
        },
        {
          path: '*',
          component: () => <div>No Child Routes found</div>
        }
      ]
    }
  ]

  return (
    <Router history={history}>
      {DynamicRoutes(routes)}
    </Router>
  )
}


function DynamicRoutes (listRoutes, lastPath = '') {
  const buildRoute = (routes) => {
    return routes.map(x => {
      const newPath = x.path === '' ? `${lastPath}` : `${lastPath}/${x.path}`
      let NestedRoutes = null
      if(Array.isArray(x.children)) {
        NestedRoutes = DynamicRoutes(x.children, newPath)
      }
      return (
        <Route
          path={newPath}
          key={newPath}
          render={(props) => (
            <RouterConfig.WrapperRouters
              connectedprops={props}
              component={x.component}
              registerModels={x.assignModels}
              children={NestedRoutes}
            />
          )}  
        />
      )
    })
  }

  const CurrentRoutes = buildRoute(listRoutes)
  return (
    <Fragment>
      <Switch>
        {CurrentRoutes}
      </Switch>
    </Fragment>
  )
}



export default Routers

