class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getPerson = this.getPerson.bind(this);
    {this.getPerson()}
  }

  getPerson(event) {
    $.ajax({
      url: '/api/6969',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('ajax request success..');
        this.setState({data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log(JSON.stringify(this.state));
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
      $.ajax({
        url: '/people',
        dataType: 'json',
        type: 'POST',
        data: this.state,
        success: function() {
          console.log('ajax POST sucessful...');
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
        <input type="submit" value="Modify" />
      </form>
    );
  }
}

ReactDOM.render(
<NameForm />,
document.getElementById('content')
);
