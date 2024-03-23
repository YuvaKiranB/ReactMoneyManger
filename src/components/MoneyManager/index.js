import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import GetCard from '../MoneyDetails'

import GetHistory from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: 'INCOME',
  }

  deleteHistory = (id, type, amount) => {
    if (type === 'Income') {
      this.setState(previousState => ({
        income: previousState.income - amount,
      }))
    } else if (type === 'Expenses') {
      this.setState(previousState => ({
        expenses: previousState.expenses - amount,
      }))
    }

    this.setState(previousState => ({
      transactionsList: previousState.transactionsList.filter(
        eachItem => id !== eachItem.id,
      ),
    }))
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  updateType = event => {
    this.setState({type: event.target.value})
  }

  updateHistory = event => {
    event.preventDefault()
    let typeOf = null

    const {title, amount, type} = this.state

    if (type === 'INCOME') {
      this.setState(previousState => ({
        income: previousState.income + amount,
      }))
    } else if (type === 'EXPENSES') {
      this.setState(previousState => ({
        expenses: previousState.expenses + amount,
      }))
    }

    if (type === 'INCOME') {
      typeOf = 'Income'
    } else if (type === 'EXPENSES') {
      typeOf = 'Expenses'
    }

    const newHistory = {
      id: v4(),
      title,
      amount,
      type: typeOf,
    }

    this.setState(previousState => ({
      transactionsList: [...previousState.transactionsList, newHistory],
    }))

    this.setState({title: '', amount: '', type: 'INCOME'})
  }

  render() {
    const {title, amount, type, income, expenses, transactionsList} = this.state

    return (
      <div className="main">
        <div className="part1">
          <div className="card1">
            <h1 className="h1">Hi, Richard</h1>
            <p className="p1">
              Welcome back to your <span className="span">Money Manager</span>
            </p>
          </div>
        </div>

        <div className="part2">
          <div className="ul">
            <GetCard
              image="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              title="Your Balance"
              balance={income - expenses}
              key="TOTAL BALANCE"
              color="green"
              altImg="balance"
              testId="balanceAmount"
            />
            <GetCard
              image="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              title="Your Income"
              balance={income}
              color="blue"
              altImg="income"
              key={transactionTypeOptions[0].optionId}
              testId="incomeAmount"
            />
            <GetCard
              image="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              balance={expenses}
              color="purple"
              altImg="expenses"
              title="Your Expenses"
              key={transactionTypeOptions[1].optionId}
              testId="expensesAmount"
            />
          </div>
        </div>

        <div className="part3">
          <div className="card2">
            <form className="form" onSubmit={this.updateHistory}>
              <h1 className="heading">Add Transaction</h1>
              <label className="label1" htmlFor="title2">
                TITLE
              </label>
              <input
                onChange={this.updateTitle}
                id="title2"
                className="input1"
                value={title}
                placeholder="TITLE"
              />
              <label className="label2" htmlFor="amount">
                AMOUNT
              </label>
              <input
                onChange={this.updateAmount}
                id="amount"
                className="input2"
                value={amount}
                placeholder="AMOUNT"
              />
              <label className="label3" htmlFor="type">
                TYPE
              </label>
              <select
                value={type}
                onChange={this.updateType}
                className="select"
                id="type"
              >
                {transactionTypeOptions.map(eachItem => (
                  <option value={eachItem.optionId} key = {eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>

              <button className="button1" type="submit">
                Add
              </button>
            </form>
          </div>

          <div className="card3">
            <h1 className="heading2">History</h1>
            <div className="table">
              <ul className="table">
                <li className="header">
                  <p className="t1">Title</p>
                  <p className="t1">Amount</p>
                  <p className="t1">Type</p>
                  <p> </p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <GetHistory
                    content={eachTransaction}
                    onDelete={this.deleteHistory}
                    key={eachTransaction.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
