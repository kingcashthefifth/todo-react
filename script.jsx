class ToDoApp extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }

  state = {
    list: [],
    word: ""
  };

  changeHandler(event) {
    this.setState({ word: event.target.value });
    console.log("change", event.target.value);
  }

  render() {
    return (
      <div>
        {/* <NewList /> */}
        <ListArea />
      </div>
    );
  }
}

class ListArea extends React.Component {
  constructor() {
    super();
    this.createNewList = this.createNewList.bind(this);
    this.wordChecker = this.wordChecker.bind(this);
  }

  state = {
    list: [],
    word: ""
  };

  wordChecker(e) {
    this.setState({ word: e.target.value });
  }

  createNewList() {
    if (this.state.word.length >= 3) {
      this.setState({ list: [...this.state.list, this.state.word], word: "" });
    } else {
      alert("List Name: Please input at least 3 alphanumeric characters.");
    }
  }

  render() {
    const allLists = this.state.list.map((list, index) => {
      return <List key={index} name={list} />;
    });
    return (
      <div>
        <div>
          <input
            onChange={this.wordChecker}
            value={this.state.word}
            placeholder="Input new list name"
          />
          <button onClick={this.createNewList}>Create List</button>
        </div>
        <div>{allLists}</div>
      </div>
    );
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.todoWordChecker = this.todoWordChecker.bind(this);
    this.createNewTodo = this.createNewTodo.bind(this);
  }

  state = {
    todo: [],
    word: ""
  };

  todoWordChecker(e) {
    this.setState({ word: e.target.value });
  }

  createNewTodo() {
    if (this.state.word.length >= 3) {
      this.setState({ todo: [...this.state.todo, this.state.word], word: "" });
    } else {
      alert("Todo Name: Please input at least 3 alphanumeric characters.");
    }
  }

  render() {
    const todoItems = this.state.todo.map((todo, index) => {
      return <TodoItem key={index} description={todo} />;
    });
    return (
      <div className="list">
        <h4>
          <strong>{this.props.name}</strong>
        </h4>
        <input onChange={this.todoWordChecker} value={this.state.word} />
        <button onClick={this.createNewTodo}>New Todo</button>
        {todoItems}
        {/* <h1>{this.state.word}</h1>
        <input onChange={this.changeHandler} value={this.state.word} />
        <button>add item</button> */}
      </div>
    );
  }
}

class TodoItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <p>{this.props.description}</p>;
  }
}

ReactDOM.render(<ToDoApp />, document.getElementById("root"));
