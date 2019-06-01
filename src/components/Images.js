import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import Image from './Image'
import style from './Images.css'
import imageStyle from './Image.css'

class Images extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      more: false
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.props.filter([])
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight - 1) {
      this.props.displayMore()
    }
  }

  handleImagesLoaded() {
    this.setState({
      loading: false
    })
  }

  handleClick(filter, index, e) {
    this.setState({
      activeIndex: index
    })
    this.props.filter(filter)
    e.preventDefault()
  }

  handleChange(e) {
	  this.setState({ inputValue: e.target.value })
  }

  showMore(e) {
    this.setState({ more: !this.state.more })
    e.preventDefault()
  }

  render() {
    const masonryOpts = {
      itemSelector: '.' + imageStyle.Image,
      transitionDuration: 0,
      fitWidth: true
    }
    const displayedItems = this.props.items.slice(0, this.props.position)
    const masstyle = {margin: 'auto'}
    return (
      <div className={style.Images}>
        <div style={{display: this.state.loading ? 'block' : 'none', textAlign: 'center', height: 500}}>
          <p>Loading images...</p>
        </div>
        <Masonry
          style={masstyle}
          onImagesLoaded={this.handleImagesLoaded}
          options={masonryOpts}>
          {displayedItems.map((item, index) => {
            return (
              <Image
                key={index}
                loading={this.state.loading}
                item={item} />
            )
          })}
        </Masonry>
      </div>
    )
  }
}

Images.propTypes = {
  filter: PropTypes.func,
  search: PropTypes.func,
  includes: PropTypes.func,
  displayMore: PropTypes.func,
  items: PropTypes.array,
  position: PropTypes.number
}

export default Images
