import React, {Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';

class App extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    fetch('http://tag.zhaodong.name/api/link'
  ).then(res => res.json())
    .then((data) => {
        this.setState({ bookmarks: data });
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
      data={this.state.bookmarks}
      
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = this.state.bookmarks;
              data.push(newData);
              this.setState({ bookmarks: data });
            }, 600);
          }),
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
