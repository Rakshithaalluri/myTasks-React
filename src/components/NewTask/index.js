import './index.css'

const NewTask = props => {
  const {taskDetails} = props

  return (
    <li className="added-task-con">
      <p className="added-task"> {taskDetails.task} </p>
      <p className="task-category"> {taskDetails.tag} </p>
    </li>
  )
}

export default NewTask
