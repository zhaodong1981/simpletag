import React, {Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';
import TagButton from './TagButtons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks : [],
      counter : 100
    };
    this.tableRef = React.createRef();
    this.refreshBookmarks = this.refreshBookmarks.bind(this);
  }
  refreshBookmarks(){
      console.log("Pulling bookmarks");
      fetch('http://tag.zhaodong.name/api/link/count').then(res => res.json())
      .then((data) => {
        this.setState({ counter: data.count });
          console.log("Count : " + this.state.counter);
      }).then(() => {
        return fetch('http://tag.zhaodong.name/api/link')
      }).then(res => res.json())
      .then((data) => {
        this.setState({ bookmarks: data });
      })
    }
  
  componentDidMount() {
    this.refreshBookmarks();
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
  
    return (
      
      <div className="App">
      
      <TagButton Refresh={this.refreshBookmarks}></TagButton>
    
      <MaterialTable
        title="My Bookmarks"
        tableRef={this.tableRef}
        columns={mycolumns}
        data={this.state.bookmarks}
        options={{
          pageSizeOptions: [10,30,50],
          pageSize: 10,
          search: true,
          searchFieldAlignment: 'right',
          actionsColumnIndex: -1
        }}
        
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = this.state.bookmarks;
                data[data.indexOf(oldData)] = newData;
                this.setState({ bookmarks: data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = this.state.bookmarks;
                data.splice(data.indexOf(oldData), 1);
                this.setState({ bookmarks: data });
              }, 600);
            }),
        }}
    />
    </div>
    );
  }
}

export default App;
