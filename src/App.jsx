const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render(){
    return(
      <div>This is a placeholder for the Issue Filter</div>
    );
  }
}
const IssueRow = (props) => (
  <tr>
    <td>{props.issue._id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ? props.issue.completionDate.toDateString(): ''}</td>
    <td>{props.issue.title}</td>
  </tr>
)

function IssueTable(props) {

    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue._id} issue={issue}/>)
    return(
      <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
}

class IssueAdd extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title:form.title.value,
      status:'New',
      created: new Date(),
  });
  //clear the form for the next input
  form.owner.value = "";
  form.title.value = "";
  }
  render(){
    return(
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class IssueList extends React.Component {

constructor(){
  super();
  console.debug("entered constructor");
  this.state = { issues:[] };
  this.createIssue = this.createIssue.bind(this);
  console.debug("after constructor");
}

componentDidMount(){
console.debug("componentDidMount");
  this.loadData();
}

loadData(){
  fetch('/api/issues').then(response => {
    if(response.ok){
    response.json().then(data => {
      console.log("Total count of records:",data._metadata.total_count);
      data.records.forEach(issue => {
      issue.created = new Date(issue.created);
      if(issue.completionDate)
        issue.completionDate = new Date(issue.completionDate);
      });
      this.setState({issues.data.records});
    });
    } else {
    response.json().then(error => {
      alert("Failed to fetch issues:"+error.message)
    });
    }
  }).catch(err => {
    alert("Error in fetching data from server:", err);
  });
}

createIssue(newIssue){
  const newIssues = this.state.issues.slice();
  newIssue.id = this.state.issues.length+1;
  newIssues.push(newIssue);
  this.setState({issues: newIssues});

}

render(){
return(
  <div>
  <h1>Issue Tracker</h1>
  <IssueFilter />
  <hr />
  <IssueTable issues={this.state.issues}/>

  <hr />
  <IssueAdd createIssue={this.createIssue}/>
  </div>
);

}

}
ReactDOM.render(<IssueList />, contentNode);
