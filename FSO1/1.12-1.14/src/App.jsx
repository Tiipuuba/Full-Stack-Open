import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const randomizer = (x) => {
  return (
    Math.floor(Math.random() * (1, x))
  )
}

const voting = ({votes, selected}) => {
  const copy = {...votes}
  copy[selected] += 1

  return (
    copy
  )
}

const Winner = ({anecdotes, votes}) => {

  let amount = 0
  let highest = 0

  for ( let key in votes ) {

    if ( votes[key] > amount) {
      amount = votes[key]
      highest = key
    }
    
  }

  return (
    <div>
      <p>{anecdotes[highest]}</p>
      <p>has {amount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => setVotes(voting({votes, selected}))} text='vote' />
      <Button onClick={() => setSelected(randomizer(anecdotes.length))} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Winner anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App