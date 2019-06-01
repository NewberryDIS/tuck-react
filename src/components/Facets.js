import React from 'react'
import PropTypes from 'prop-types'
import style from './Images.css'

const Facets = ({onClick, label, active, last}) => (
  	  <span title={label[0].replace('&', 'and')}>
		      <a onClick={onClick} className={active ? style.Active : null} >{label[0]}</a>{last ? '' : '|'}
		  </span>
)

Facets.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.array,
  active: PropTypes.boolean,
  last: PropTypes.boolean
}

export default Facets
