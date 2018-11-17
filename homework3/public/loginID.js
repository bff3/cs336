class PersonForm extends React.Component {
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
      $.ajax({
        url: '/api/person/' + this.state.id,
        dataType: 'json',
        type: 'PUT',
        data: this.state,
        success: function() {
          console.log('ajax POST sucessful...');
        },
        error: function(xhr, status, err) {
          console.error( status, err.toString());
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
        <input type="submit" value="Change" />
      </form>
    );
  }
}

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.delPerson = this.delPerson.bind(this);
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
    $.getJSON( "/api/person/"+this.state.id, function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push(key + " : " + val);
      });
      items = items.slice(1,5);
      $('div.Person').text(items.join(", "));
    });
      event.preventDefault();
    }

    delPerson(event){
      $.ajax({
        url: '/api/person/' + this.state.id,
        type: 'DELETE',
        success: function(result){
          console.log(result);
          $('div.delete_status').text("Delete Successful!");
        }
      });
      event.preventDefault();
    }

  render() {
    return (
      <div className = "getPerson">
        <form onSubmit={this.handleSubmit}>
          <label>
            loginID:
            <input
              name="id"
              type="text"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Get Person" />
        </form>
        <div className="Person"></div>
        <button onClick={this.delPerson}>
        Delete Person
        </button>
        <br></br>
        <div className = 'delete_status'></div>
        <PersonForm />
      </div>
    );
  }
}


ReactDOM.render(
  <People url="/person" />,
  document.getElementById('content')
);
