class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      id: '',
      startDate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('You are trying to submit: ' + JSON.stringify(this.state));
      $.ajax({
        url: '/people',
        dataType: 'json',
        type: 'POST',
        data: this.state,
        success: function(data) {
          alert('You submitted: ' + JSON.stringify(data));
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }
      });
      event.preventDefault();
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          ID#:
          <input
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Start Date:
          <input
            name="startDate"
            type="text"
            value={this.state.startDate}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
<NameForm url="/people/id" />,
document.getElementById('content')
);
