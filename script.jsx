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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }

  state = {
    todo: [],
    done: [],
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

  deleteTodo(description, detectDone) {
    if (detectDone) {
      let arr = [...this.state.done];
      arr.splice(arr.indexOf(description), 1);
      this.setState({ done: arr });
    } else {
      let arr = [...this.state.todo];
      arr.splice(arr.indexOf(description), 1);
      this.setState({ todo: arr });
    }
  }

  doneTodo(description) {
    this.deleteTodo(description);
    let arr = [...this.state.done, description];
    this.setState({ done: arr });
  }

  render() {
    const todoItems = this.state.todo.map((todo, index) => {
      return (
        <TodoItem
          key={index}
          description={todo}
          deleteTodo={this.deleteTodo}
          doneTodo={this.doneTodo}
        />
      );
    });

    const doneItems = this.state.done.map((done, index) => {
      return (
        <TodoItem
          key={index}
          donedes={done}
          deleteTodo={this.deleteTodo}
          detectDone={true}
        />
      );
    });

    return (
      <div className="list">
        <h4>
          <strong>{this.props.name}</strong>
        </h4>
        <input onChange={this.todoWordChecker} value={this.state.word} />
        <button onClick={this.createNewTodo}>New Todo</button>
        {todoItems}
        {doneItems}
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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }

  deleteTodo() {
    if (this.props.detectDone) {
      this.props.deleteTodo(this.props.donedes, this.props.detectDone);
    } else {
      this.props.deleteTodo(this.props.description);
    }
  }

  doneTodo() {
    this.props.doneTodo(this.props.description);
  }

  render() {
    const timestamp = moment().format("LLLL, ZZ");

    if (this.props.description) {
      return (
        <div>
          <p style={{ display: "inline" }}>{this.props.description}</p>
          <br />
          <small>{timestamp}</small>
          <button onClick={this.deleteTodo}>Del</button>
          <button onClick={this.doneTodo}>Done</button>
        </div>
      );
    } else if (this.props.donedes) {
      return (
        <div>
          <p className="doneList" style={{ display: "inline" }}>
            {this.props.donedes}
          </p>
          <br />
          <small>{timestamp}</small>
          <button onClick={this.deleteTodo}>Del</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<ToDoApp />, document.getElementById("root"));
