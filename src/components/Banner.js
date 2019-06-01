import React from 'react'
import style from './Banner.css'
import logo from '../../static/media/newberry_logo_white_no_text_med.png'

const Banner = () => {
  return (
  <div className={style.Banner}>
    <div className={style.LogoName}>
      <a href="https://www.newberry.org"><img src={logo} /></a>
      <span className={style.BannerTitle}>
        <a href="https://www.newberry.org/digital-newberry">Digital Newberry</a> > <a href="http://digcoll.newberry.org">Collections</a>
      </span>
    </div>
  </div>
  )
}

export default Banner
