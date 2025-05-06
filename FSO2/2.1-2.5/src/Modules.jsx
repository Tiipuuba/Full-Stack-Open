const Course = (props) => {

  const courses = props.courses

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((part) =>
        <div key={part.id}>
          <h2>{part.name}</h2>
          <Content parts={part.parts}/>
        </div>
      )}  
    </div>
  )
}

const Content = ({ parts }) => {

  const total = parts.reduce( (s, p) => s + p.exercises, 0 )
  
  return (
    <div>
      {parts.map((part) =>
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <h3>total of {total} exercises</h3>
    </div>
  )
}

export default Course