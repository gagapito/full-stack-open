import { useState } from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Anecdote = ({ text, votesCount }) => (
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>
)

const Winner = ({ anecdotes, allVotes }) => {
  const highestVoteCount = Math.max(...allVotes)
  const winnerIdx = allVotes.indexOf(highestVoteCount)
  const winner = anecdotes[winnerIdx]
  if (highestVoteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  } else {
    return (
      <div>
        <p>{winner}</p>
        <p>has {highestVoteCount} votes</p>
      </div>
    )
  }
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  console.log(anecdotes[selected])
  const [allVotes, setAllVotes] = useState(new Uint8Array(anecdotes.length))

  const handleVoteClick = () => {
    const temp = [...allVotes]
    temp[selected] += 1
    setAllVotes(temp)
  }

  const handleAnecdoteClick = () => {
    const arrayIdx = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIdx)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleAnecdoteClick} text="Next anecdote" />

      <Header name="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App