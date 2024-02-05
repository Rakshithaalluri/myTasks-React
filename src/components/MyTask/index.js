import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'
import NewTask from '../NewTask'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    inputText: '',
    searchTag: tagsList[0].optionId,
    newTaskList: [],
    activeButton: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({searchTag: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {inputText, searchTag} = this.state
    const newList = {
      id: uuidv4(),
      task: inputText,
      tag: searchTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => ({
        newTaskList: [...prevState.newTaskList, newList],
        inputText: '',
        searchTag: tagsList[0].optionId,
      }))
    }
  }

  onClickTag = tagId => {
    this.setState(prevState => ({
      activeButton: prevState.activeButton === tagId ? 'INITIAL' : tagId,
    }))
  }

  getFilteredTasks = () => {
    const {activeButton, newTaskList} = this.state
    const filteredTasks =
      activeButton === 'INITIAL'
        ? newTaskList
        : newTaskList.filter(eachTask => eachTask.tag === activeButton)
    return filteredTasks
  }

  render() {
    const {inputText, searchTag, activeButton} = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <div className="bg-container">
        <div className="tasks-container">
          <div className="create-con">
            <form className="input-con" onSubmit={this.onSubmitForm}>
              <h1 className="heading"> Create a task! </h1>
              <div className="input-tags-con">
                <label className="task-text" htmlFor="task">
                  {' '}
                  Task{' '}
                </label>
                <input
                  id="task"
                  type="text"
                  className="input-ele"
                  placeholder="Enter the task here"
                  value={inputText}
                  onChange={this.onChangeInput}
                />
                <label className="task-text" htmlFor="tags">
                  {' '}
                  Tags{' '}
                </label>
                <select
                  className="input-ele"
                  value={searchTag}
                  onChange={this.onChangeTag}
                  id="tags"
                >
                  {tagsList.map(tag => (
                    <option key={tag.optionId} value={tag.optionId}>
                      {tag.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-task-button">
                {' '}
                Add Task{' '}
              </button>
            </form>
          </div>
          <div className="tags-container">
            <div className="tags-details-con">
              <h1 className="tags-text"> Tags </h1>
              <ul className="tags-list-con">
                {tagsList.map(each => (
                  <li key={each.optionId} className="tag-list-item">
                    <button
                      key={each.optionId}
                      className={`tag-button ${
                        activeButton === each.optionId ? 'active' : ''
                      }`}
                      type="button"
                      onClick={() => this.onClickTag(each.optionId)}
                    >
                      {each.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <h1 className="tasks-heading"> Tasks </h1>
              <div className="added-tasks-list">
                {filteredTasks.length === 0 ? (
                  <p className="empty-list"> No tasks Added Yet </p>
                ) : (
                  <ul className="tasks-list-con">
                    {filteredTasks.map(task => (
                      <NewTask key={task.id} taskDetails={task} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTask
