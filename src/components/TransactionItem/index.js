// Write your code here

import './index.css'

const GetHistory = props => {
  const {content, onDelete} = props
  const {id, title, amount, type} = content

  const updateDelete = () => {
    onDelete(id, type, amount)
    console.log(amount)
  }

  return (
    <li className="header2">
      <p className="t2">{title}</p>
      <p className="t2">Rs {amount}</p>
      <p className="t2">{type}</p>
      <button
        data-testid="delete"
        type="button"
        className="button2"
        onClick={updateDelete}
      >
        <img
          className="image2"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default GetHistory
