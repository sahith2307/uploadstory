import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import ReactFileReader from 'react-file-reader'
import Popup from 'reactjs-popup'
import data from '../storyData.json'
import './index.css'
import Details from '../popUp'

class MainPage extends Component {
  state = {
    takenData: data,
    searchedData: data,
    show: false,
    showStatus: false,
    body: '',
    userId: localStorage.getItem('userId'),
    title: '',
  }

  handleFiles = files => {
    const reader = new FileReader()
    let round
    reader.onload = () => {
      round = reader.result
      this.setState({body: round}, this.dataGetting)
    }
    reader.readAsText(files[0])
  }

  onPreview = () => {
    this.setState(prev => ({show: !prev.show}))
  }

  dataPushing = () => {
    const {userId, title, body, takenData} = this.state
    const id = takenData.length + 1
    const pushedData = takenData.push({
      userId: {userId},
      id: {id},
      title: {title},
      body: {body},
    })
    this.setState({takenData: pushedData, show: false, showStatus: true})
  }

  dataGetting = () => {
    const {userId, title, body} = this.state
    return (
      <div>
        <p>userId:{userId}</p>
        <p>Title:{title}</p>
        <p>{body}</p>
      </div>
    )
  }

  heads = () => {
    const {searchedData} = this.state
    return searchedData.map(each => <h1 className="content">{each.title}</h1>)
  }

  ids = () => {
    const {searchedData} = this.state
    return searchedData.map(each => <h1 className="content">{each.id}</h1>)
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  detailsData = () => {
    const {searchedData} = this.state
    return searchedData.map(each => <Details dataDetails={each} />)
  }

  changeBySearch = event => {
    const {takenData} = this.state
    const filter = takenData.filter(each =>
      each.title.includes(event.target.value),
    )
    this.setState({searchedData: filter})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  render() {
    const {show, userId, showStatus} = this.state
    return (
      <div className="cont-1">
        <div className="cont-2">
          <div className="cont">
            <input type="search" onChange={this.changeBySearch} />
            <Popup
              trigger={
                <button type="button" className="log-out">
                  upload
                </button>
              }
              modal
            >
              <div className="pop-cont">
                <p>userId:{userId}</p>
                <span>Title</span>
                <input type="text" onChange={this.onChangeTitle} />

                <ReactFileReader
                  handleFiles={this.handleFiles}
                  fileTypes={['.csv', '.txt']}
                >
                  <button type="button" className="log-out">
                    upload file
                  </button>
                </ReactFileReader>
                <button
                  type="button"
                  className="log-out"
                  onClick={this.onPreview}
                >
                  Preview
                </button>
                {show && this.dataGetting()}
                {showStatus && <p>uploaded successfully</p>}
                <button
                  type="button"
                  className="log-out"
                  onClick={this.dataPushing}
                >
                  Upload
                </button>
              </div>
            </Popup>
            <button
              type="button"
              className="log-out"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
          <div className="cont">
            <div className="details-cont">
              <h1>Id</h1>
              {this.ids()}
            </div>
            <div className="details-cont">
              <h1>Title</h1>
              {this.heads()}
            </div>
            <div className="details-cont">
              <h1>Details</h1>
              {this.detailsData()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(MainPage)
