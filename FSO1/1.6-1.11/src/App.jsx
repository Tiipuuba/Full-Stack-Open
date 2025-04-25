import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if ( text === 'positive' ) {
    return (
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
    if ( good + neutral + bad === 0 ) {
      return (
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
      )
    }

    return (
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)} />
        <StatisticLine text="positive" value={(good / bad) / (good + bad + neutral)} />
      </tbody>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <table>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </table>
    </div>
  )
}

export default App