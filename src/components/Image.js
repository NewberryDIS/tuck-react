import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './Image.css'

class Image extends Component {

  render() {
    const i = this.props.item
    const className = this.props.loading ? style.ImageLoading : style.Image
    const id = i.id
    const directlink = 'https://archive.org/details/' + id
    const imgurl = 'https://archive.org/services/img/' + id
    return (
      <a href={directlink} target="_blank">
        <figure className={className}>
          <img src={imgurl} />
          <figcaption>
            {i.title}
          </figcaption>
        </figure>
      </a>
    )
  }

}

Image.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool
}

export default Image
