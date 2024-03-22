// Write your code here

import './index.css'

const GetCard = props => {
  const {image, altImg, title, balance, color, testId} = props

  return (
    <div className={`li ${color}`}>
      <img src={image} alt={altImg} className="image1" />
      <div className="info">
        <p className="p2">{title}</p>
        <p className="p3" data-testid={testId}>
          Rs {balance}
        </p>
      </div>
    </div>
  )
}

export default GetCard
