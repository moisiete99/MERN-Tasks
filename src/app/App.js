import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      _id: "",
      tasks: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  //método componentDidMount() se ejecuta después que la salida del componente ha sido renderizada en el DOM
  componentDidMount() {
    this.fetchTasks();
  }

  addTask(e) {
    //addTask to update task
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: "Task Updated" });
          this.setState({ _id: "", title: "", description: "" });
          this.fetchTasks();
        });
    } else {
      //addTask first time
      //console.log(this.state);
      e.preventDefault();
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Saved" }); //Constant 'M' of materialize framework to use 'toast'
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch((err) => console.log(err));
    }
  }

  fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    //ask if we want delete the task with 'confirm'
    if (confirm("Are you sure to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Deleted" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    //getting data from server by id
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-fiel col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-fiel col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Task Description"
                          className="materialize-textarea"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-green darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            onClick={() => this.editTask(task._id)}
                            className="btn yellow darken-4" style={{ margin: "5px" }}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            onClick={() => this.deleteTask(task._id)}
                            className="btn red  darken-4"
                            style={{ margin: "5px" }}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
