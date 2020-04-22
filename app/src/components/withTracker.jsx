import React, { useEffect } from 'react'
import {
  useLocation
} from 'react-router-dom'
import ReactGA from 'react-ga'

ReactGA.initialize(window.CONFIG.googleAnalytics.trackingId, window.CONFIG.googleAnalytics.options)

// function usePageViews() {
//   let location = useLocation();
//   React.useEffect(() => {
//     ga.send(['pageview', location.pathname]);
//   }, [location]);
// }

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page)
  }

  const HOC = (props) => {
    const location = useLocation()

    useEffect(() => {
      console.log(location.pathname)
      trackPage(location.pathname)
    }, [location])

    return (
      <WrappedComponent {...props} />
    )
  }

  // const HOC = class extends Component {
  //   componentDidMount () {
  //     const page = this.props.location.pathname
  //     trackPage(page)
  //   }

  //   componentWillReceiveProps (nextProps) {
  //     const currentPage = this.props.location.pathname
  //     const nextPage = nextProps.location.pathname

  //     if (currentPage !== nextPage) {
  //       trackPage(nextPage)
  //     }
  //   }


  // render () {
  //   return <WrappedComponent {...this.props} />
  // }
  // }

  return HOC
}

export default withTracker
