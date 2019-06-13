import React, {Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';
import TagButton from './TagButtons';
import RefreshData from './RefreshData';

class App extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }
  state = {
    bookmarks: []
  };
  
  componentDidMount() {
    console.log("Pulling bookmarks ...");
    fetch('http://tag.zhaodong.name/api/link')
    .then(res => res.json())
    .then((data) => {
      this.setState({ bookmarks: data });
      console.log(data);
    })
  }
  refreshBookmarks(){
    console.log("Pulling bookmarks ...");
    fetch('http://tag.zhaodong.name/api/link')
    .then(res => res.json())
    .then((data) => {
      this.setState({ bookmarks: data });
      console.log(data);
    })
    .catch(console.log)
  }

  render() {
    const mycolumns= [
      { title: 'Title', field: 'title' },
      { title: 'URL', field: 'url',render: rowData => <a href={rowData.url} target="_blank">{rowData.url}</a> },
      { title: 'Date', field: 'modifydate'},
      { title: 'Tags', field: 'tags', render: rowData => 
      <div>{rowData.tags.map((tag, index) => (
            <a href={'http://tag.zhaodong.name/api/tag/'+tag} target="_blank">{tag}</a>
        ))}
      </div>
      }
    ];
    const mydata=this.state.bookmarks;
    return (
      
      <div className="App">
      <RefreshData> </RefreshData>
      
      <TagButton Refresh={this.refreshBookmarks} state={this.state.bookmarks}></TagButton>
      <MaterialTable
      title="My bookmarks"
      tableRef={this.tableRef}
      columns={mycolumns}
      data={this.state.bookmarks}
    />
    </div>
    );
  }
}

export default App;
