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
        url: '/api/people',
        dataType: 'json',
        type: 'POST',
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


var People = React.createClass({

render: function() {
  $.getJSON( "/api/people", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<li id='" + JSON.stringify(key) + "'>" + JSON.stringify(val) + "</li>" );
    });

    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "div.getPeople" );
  });
  return (
    <div className="People">
      <PersonForm />
      <div className="getPeople"></div>
    </div>
  );
}
});

ReactDOM.render(
  <People url="/people" />,
  document.getElementById('content')
);
