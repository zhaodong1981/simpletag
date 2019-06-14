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
      fetch('/api/link/count').then(res => res.json())
      .then((data) => {
        this.setState({ counter: data.count });
      }).then(() => {
        return fetch('/api/link')
      }).then(res => res.json())
      .then((data) => {
        this.setState({ bookmarks: data });
      }).catch(error => {
        console.error('Error during refresh bookmark:', error);
      });
    }
  
  createBookmark(title, url, description, tags){
      console.log("Create a bookmark: title=" + title + ",url="+url + ",description="+description  + ",tags=" + tags);
      fetch('/api/link/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'title': title,
          'url': url,
          'description': description,
          'tags': tags          
        })
      }
      ).catch(error => {
        console.error('Error during create bookmark:', error);
      });
    }
    updateBookmark(link_id,title, url, description, tags){
      console.log("Update a bookmark: id="+link_id + ", title=" + title + ",url="+url + ",description="+description  + ",tags=" + tags);
      fetch('/api/link/'+link_id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'title': title,
          'url': url,
          'description': description,
          'tags': tags          
        })
      }
      ).catch(error => {
        console.error('Error during update bookmark:', error);
      });
    }

    deleteBookmark(link_id){
      console.log("Delete a bookmark: id="+link_id);
      fetch('/api/link/'+link_id, {
        method: 'DELETE'
      }
      ).catch(error => {
        console.error('Error during delete bookmark:', error);
      });
    }

  componentDidMount() {
    this.refreshBookmarks();
  }
  
  formatTags(oldtags){
    let tempTags = [];
    if(typeof oldtags !== 'undefined' && oldtags && oldtags.constructor === Array){
      tempTags = oldtags;
    } else if (typeof oldtags === 'string'){
      tempTags = oldtags.split(',');
    } 

    let validTags = [];
    for (const tag of tempTags ){
      if (tag !== ''){
        validTags.push(tag);
      }
    }
    return validTags;
  }

  render() {
    const mycolumns= [
      { title: 'Title', field: 'title' },
      { title: 'URL', field: 'url',render: rowData => <a href={rowData.url} target="_blank" rel="noopener noreferrer">{rowData.url}</a> },
      { title: 'Date', field: 'modifydate'},
      { title: 'Tags', field: 'tags', render: rowData => 
      <div>{rowData.tags && rowData.tags.constructor === Array && rowData.tags.map((tag, index) => (
            <a href={'/api/tag/'+tag} target="_blank" rel="noopener noreferrer">{tag}</a>
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
          actionsColumnIndex: -1,
          addRowPosition: 'first'
        }}
        
        editable={{
          onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if(typeof newData.url == 'undefined' || newData.url === '' || newData.url === null ){
                alert("Invalid URL");
              }else{
                newData.tags = this.formatTags(newData.tags);
                newData.description = "test";
                this.createBookmark(newData.title,newData.url,newData.description,newData.tags);
                this.refreshBookmarks();
              }
             
            }, 600);
              
          }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if(typeof newData.url == 'undefined' || newData.url === '' || newData.url === null){
                  alert("Invalid URL");
                }else{
                  newData.tags = this.formatTags(newData.tags);
                  newData.description = "test";
                  const data = this.state.bookmarks;
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ bookmarks: data });
                  this.updateBookmark(oldData.id, newData.title,newData.url,newData.description,newData.tags);
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
  //              console.log("Deleting bookmark: " + oldData.id + ", url=" + oldData.url);
                  this.deleteBookmark(oldData.id);
                  this.refreshBookmarks();
              }, 600);
            }),
        }}
    />
    </div>
    );
  }
}

export default App;
