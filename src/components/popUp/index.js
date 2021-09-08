import {Component} from 'react'
import Popup from 'reactjs-popup'
import './index.css'

class Details extends Component {
  render() {
    const {dataDetails} = this.props
    const {userId, title, body} = dataDetails

    return (
      <Popup
        trigger={
          <button type="button" className="details-but">
            details
          </button>
        }
        modal
      >
        <div className="pop-cont">
          <h1>uploaded userId:{userId}</h1>
          <p>Title: {title}</p>
          <h1>{body}</h1>
        </div>
      </Popup>
    )
  }
}
export default Details
