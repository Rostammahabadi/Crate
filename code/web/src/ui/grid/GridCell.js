// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
// can use this component and pass in the styling as props
// instead of styling each accordingly 
// by passing in prop of alignTop - - that triggers boolean logic on ternary 

// ...others - allows us to pass other styles 
const GridCell = (props) => {
  const {
    children,
    alignTop,
    alignBottom,
    alignCenter,
    justifyRight,
    justifyCenter,
    gutter,
    ...others
  } = props

  return (
    <div {...others}>
      {children}

      {/* language=CSS */}
      <style jsx>{`
        div {
          flex: 1;
          ${ alignTop ? 'align-self: flex-start;' : '' }
          ${ alignBottom ? 'align-self: flex-end;' : '' }
          ${ alignCenter ? 'align-self: center;' : '' }
          ${ justifyRight ? 'justify-content: flex-end;' : '' }
          ${ justifyCenter ? 'justify-content: center;' : '' }
          ${ gutter ? 'padding-left: 1em;' : 'padding-left: 0;' }
        }
      `}</style>
    </div>
  )
}

// Component Properties
GridCell.propTypes = {
  alignTop: PropTypes.bool,
  alignBottom: PropTypes.bool,
  alignCenter: PropTypes.bool,
  justifyRight: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  gutter: PropTypes.bool
}
GridCell.defaultProps = {
  alignTop: false,
  alignBottom: false,
  alignCenter: false,
  justifyRight: false,
  justifyCenter: false,
  gutter: false
}

export default GridCell