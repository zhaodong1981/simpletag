import React, {Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';

class App extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    fetch('https://v.zhaodong.name/api/link/',{headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3002/api/link'
    }}
  ).then(res => res.json())
    .then((data) => {
        this.setState({ bookmarks: data })
        console.log(this.state.bookmarks);
    })
    .catch(console.log)
  }

  render() {
    const mycolumns= [
      { title: 'Title', field: 'title' },
      { title: 'URL', field: 'url',render: rowData => <a href={rowData.url} target="_blank">{rowData.url}</a> },
      { title: 'Date', field: 'modifydate'},
      { title: 'Tags', field: 'tags'}
    ];
    
    const mydata=this.state.bookmarks;
    return (
      <div className="App">
      <MaterialTable
      title="My bookmarks"
      columns={mycolumns}
      data={mydata}
    />
    </div>
    );
  }
}

export default App;
