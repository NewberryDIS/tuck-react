import React, { Component } from 'react'
import style from './Header.css'
import BackgroundSlider from 'react-background-slider'
import Search from 'react-icons/lib/fa/search'
// import { isMobile } from 'react-device-detect'

const backgrounds = [
  {id: '8611', title: 'A Corner of the Market on the Grand Place, Bruges'},
  {id: '6789', title: 'La sortie du temple'},
  {id: '11792', title: 'Bypass Bertie!'},
  {id: '11642', title: 'Dutch girl with geese'},
  {id: '8033', title: 'Carrigadrohid Castle, co. Cork'},
  {id: '8206', title: 'The Valley of the Tay. Near Dunkeld from Ballinluig'},
  {id: '8827', title: 'The Plaza San Marco with Cathedral'},
  {id: '9051', title: 'A happy Christmas'}
]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const shuffledImgs = shuffle(backgrounds)
const firstThreeShuffled = shuffledImgs.slice(0, 3)

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      showFeatured: false,
      screenWidth: window.innerWidth,
      activeButton: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth
    })
  }
  updateSearch(e) {
    this.setState({
      searchValue: e.target.value
    })
  }
  hitEnter(e) {
    const code = e.keyCode || e.which
    if (code === 13) {
      const search = this.refs.search
      search.click()
    }
  }
  showFeatured(e) {
    this.setState({
      showFeatured: !this.state.showFeatured
    })
    e.preventDefault()
  }
  pressButton(e, index) {
    this.setState({
      activeButton: index
    })
    e.preventDefault()
  }
  render() {
    const backgroundImages = firstThreeShuffled.map((img) => {
      return require('./assets/LL' + img.id + '_01_01_o2.jpg')
    })
    const backgroundInfo = firstThreeShuffled.map((img, index) => {
      return (<li key={index}><a href={'https://archive.org/details/nby_LL' + img.id} target="_blank"><em>{img.title}</em></a>, LL{img.id}</li>)
    })
    // const searchUrl = 'https://archive.org/search.php?query=subject%3A%22James%20R.%20Powell%20Route%2066%20postcard%20collection%22%20AND%20' + this.state.searchValue
    const searchUrlInCollection = 'https://archive.org/details/newberrypostcards?and%5B%5D=Raphael+Tuck+%26+Sons+AND+' + this.state.searchValue + '&sin=&sort=-publicdate'
    const screenWidth = this.state.screenWidth
    const mobileWidth = 700
    const isMobile = screenWidth <= mobileWidth
    const buttonSection = (
      <div className={style.ButtonSection}>
        <a href="#" className={this.state.activeButton === 0 ? style.ActiveButton : null} onClick={(e) => this.pressButton(e, 0)}>Search</a>
        <a href="#" className={this.state.activeButton === 1 ? style.ActiveButton : null} onClick={(e) => this.pressButton(e, 1)}>About</a>
        <a href="#" className={this.state.activeButton === 2 ? style.ActiveButton : null} onClick={(e) => this.pressButton(e, 2)}>Featured Images</a>
      </div>
    )
    const browseUrl = 'https://archive.org/details/newberrypostcards?and%5B%5D=Raphael+Tuck+%26+Sons&sin=&sort=-publicdate'
    const mobileView = (
      <div className={style.InputSection}>
        <div className={style.Search} style={{display: this.state.activeButton === 0 ? null : 'none'}}>
          <input type="text" placeholder="Search for a postcard..." value={this.state.searchValue} onChange={(e) => this.updateSearch(e)} onKeyUp={(e) => this.hitEnter(e)} />
          <div className={style.Mag}>
            <a href={searchUrlInCollection} target="_blank" ref="search">
              <Search />
            </a>
          </div>
          <div className={style.Button} style={{display: 'block'}}>
            <a href={browseUrl} style={{textDecoration: 'none'}}>Browse all</a>
          </div>
        </div>
        <div className={style.BodyCopy} style={{display: this.state.activeButton === 1 ? null : 'none'}}>
          <p style={{marginTop: 0}}>
            The Leonard A. Lauder collection of Oilette postcards, published by Raphael Tuck & Sons, consists of more than 26,000 postcards. Introduced in 1903, Oilettes were promoted by the company as “veritable miniature oil paintings.”
          </p>
          <p className={style.NoticeText} style={{fontSize: 12}}>
            <em>Please note: some of the items in this collection may be considered offensive by today’s standards. The content has been provided here for historical research and educational purposes.</em>
          </p>
          <div className={style.LinkSection}>
            <a href="https://www.newberry.org/rights-and-reproductions">Rights & Reproductions</a>
            <span> | </span>
            <a href="https://www.newberry.org/contact-librarian">Contact a Librarian</a>
            <p>
              <a href="https://mms.newberry.org/xml/xml_files/LauderL.xml" target="_blank">Collection Guide</a>
            </p>
          </div>
        </div>
        <div className={style.LinkSection}>
          <a href="https://mms.newberry.org/xml/xml_files/LauderL.xml" target="_blank">Collection Guide</a>
        </div>
        <div className={style.FeaturedSection} style={{display: this.state.activeButton === 2 ? null : 'none'}}>
          <ul style={{padding: 0, fontSize: 14}}>
            {backgroundInfo}
          </ul>
        </div>
      </div>
    )
    const browserView = (
      <div className={style.InputSection}>
        <div className={style.Search}>
          <input type="text" placeholder="Search for a postcard..." value={this.state.searchValue} onChange={(e) => this.updateSearch(e)} onKeyUp={(e) => this.hitEnter(e)} />
          <div className={style.Mag}>
            <a href={searchUrlInCollection} target="_blank" ref="search">
              <Search />
            </a>
          </div>
        </div>
        <div className={style.Button} style={{display: 'block'}}>
          <a href={browseUrl} target="_blank" style={{textDecoration: 'none'}}>Browse all</a>
        </div>
        <div className={style.BodyCopy}>
          <p style={{marginTop: 0}}>
            The Leonard A. Lauder collection of Oilette postcards, published by Raphael Tuck & Sons, consists of more than 26,000 postcards. Introduced in 1903, Oilettes were promoted by the company as “veritable miniature oil paintings.”
          </p>
          <p className={style.NoticeText} style={{fontSize: 12}}>
            <em>Please note: some of the items in this collection may be considered offensive by today’s standards. The content has been provided here for historical research and educational purposes.</em>
          </p>
        </div>
        <hr />
        <div className={style.LinkSection}>
          <a href="#" onClick={(e) => this.showFeatured(e)}>Featured Images</a>
          <span> | </span>
          <a href="https://www.newberry.org/rights-and-reproductions" target="_blank" >Rights & Reproductions</a>
          <span> | </span>
          <a href="https://www.newberry.org/contact-librarian" target="_blank" >Contact a Librarian</a>
        </div>
        <div className={style.LinkSection}>
          <a href="https://mms.newberry.org/xml/xml_files/LauderL.xml" target="_blank" style={{display: 'block', marginTop: 0}}>Collection Guide</a>
        </div>
        <div className={style.FeaturedSection}>
          <ul style={{maxHeight: this.state.showFeatured ? 500 : 0, transition: 'max-height 0.2s ease-in-out', listStyle: 'none'}}>
            {backgroundInfo}
          </ul>
        </div>
      </div>
    )
    return (
      <div className={style.HeaderContainer}>
        <BackgroundSlider
          images={backgroundImages}
          duration={10}
          transition={2}
        />
        <div className={style.Container}>
          <div className={style.Header}>
            <h1>Raphael Tuck & Sons Oilette Postcards</h1>
          </div>
          {isMobile ? buttonSection : null}
          {isMobile ? mobileView : browserView}
        </div>
      </div>
    )
  }
}

export default Header
