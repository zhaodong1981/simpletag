import React, {Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';
import TagButton from './TagButtons';
import {userService} from './util/user.service'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks : [],
      counter : 100,
      selectedRows: [],
      currentPage: 0,
      pageSize: 50
    };
    this.tableRef = React.createRef();
    this.refreshBookmarks = this.refreshBookmarks.bind(this);
    this.selectCurrentPage = this.selectCurrentPage.bind(this);
    this.deleteSelectedBookmarks = this.deleteSelectedBookmarks.bind(this);
  }

  refreshBookmarks(keywords){
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + userService.getToken() }
    };
      if(typeof keywords != 'undefined' && keywords != '' && keywords != null ){
          keywords = encodeURIComponent(keywords);
          fetch('/api/link/search?q=' + keywords,requestOptions).then(res => res.json())
        .then((data) => {this.setState({ bookmarks: data, selectedRows: [], currentPage: 0 });
       });
      }else { // show bookmarks latest modified 100 bookmarks
        fetch('/api/link?limit=100',requestOptions).then(res => res.json())
        .then((result) => {this.setState({ bookmarks: result, selectedRows: [], currentPage: 0 });
       });
      }
  }

  selectCurrentPage() {
    if (!this.state.bookmarks.length) {
      return;
    }

    const start = this.state.currentPage * this.state.pageSize;
    const end = start + this.state.pageSize;
    const currentRows = this.state.bookmarks.slice(start, end);

    const selectedMap = new Map(this.state.selectedRows.map(row => [row.id, row]));
    currentRows.forEach((row) => {
      selectedMap.set(row.id, row);
    });

    this.setState({ selectedRows: Array.from(selectedMap.values()) });
  }

  toggleRowSelected(row) {
    const selectedRows = [...this.state.selectedRows];
    const index = selectedRows.findIndex(item => item.id === row.id);

    if (index >= 0) {
      selectedRows.splice(index, 1);
    } else {
      selectedRows.push(row);
    }

    this.setState({ selectedRows });
  }

  deleteSelectedBookmarks() {
    const selectedRows = this.state.selectedRows || [];
    if (!selectedRows.length) {
      return;
    }

    const firstConfirm = window.confirm('确定删除所有选中的 ' + selectedRows.length + ' 条书签吗？');
    if (!firstConfirm) {
      return;
    }

    const secondConfirm = window.confirm('再次确认：这将永久删除这些书签，且无法恢复。是否继续？');
    if (!secondConfirm) {
      return;
    }

    Promise.all(selectedRows.map(row => this.deleteBookmark(row.id)))
      .then(() => {
        this.setState({ selectedRows: [] });
        this.refreshBookmarks();
      })
      .catch((error) => {
        console.error('Error during delete selected bookmarks:', error);
      });
  }
  
  createBookmark(title, url, description, tags){
    //  console.log("Create a bookmark: title=" + title + ",url="+url + ",description="+description  + ",tags=" + tags);
      fetch('/api/link/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userService.getToken()
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
          'Authorization': 'Bearer ' + userService.getToken()
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
      return fetch('/api/link/'+link_id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + userService.getToken()
        },
      }
      ).catch(error => {
        console.error('Error during delete bookmark:', error);
        throw error;
      });
    }

  componentDidMount() {
  //  console.log("login ... ")
   // this.login(this.refreshBookmarks);

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
  handleChangeKeywords(event){
    alert(event.target.value);
  }
  render() {
  
    const mycolumns= [
      {
        title: '选中',
        width: 70,
        sorting: false,
        render: rowData => (
          <input
            type="checkbox"
            checked={this.state.selectedRows.some(item => item.id === rowData.id)}
            onChange={() => this.toggleRowSelected(rowData)}
            aria-label={'select row ' + rowData.title}
          />
        )
      },
      { title: 'Title', field: 'title', render: rowData => <a href={rowData.url} target="_blank" rel="noopener noreferrer">{rowData.title}</a>},
      { title: 'URL', field: 'url', width: '30%', cellStyle: { whiteSpace: 'normal', wordBreak: 'break-all', maxWidth: 420, overflowWrap: 'anywhere' }, render: rowData => <a href={rowData.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', maxWidth: '100%', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{rowData.url}</a> },
      { title: 'Date', field: 'modifydate'},
      { title: 'Tags', field: 'tags', render: rowData => 
      <div>{rowData.tags && rowData.tags.constructor === Array && rowData.tags.map((tag, index) => (
          <a href={'/tag/tag.html#?name='+tag} target="_blank" rel="noopener noreferrer" style={{marginRight: '10px'}}>{tag}</a>
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
          pageSizeOptions: [50,100,200,500],
          pageSize: this.state.pageSize,
          search: false,
          searchFieldAlignment: 'right',
          actionsColumnIndex: 5,
          addRowPosition: 'first',
          maxBodyHeight: '75vh',
          tableLayout: 'fixed'
        }}
        onChangePage={(page) => this.setState({ currentPage: page })}
        onChangeRowsPerPage={(pageSize) => this.setState({ pageSize, currentPage: 0 })}
        actions={[
          {
            icon: 'check',
            tooltip: '全选当前页',
            isFreeAction: true,
            disabled: this.state.bookmarks.length === 0,
            onClick: this.selectCurrentPage
          },
          {
            icon: 'delete',
            tooltip: '删除所有选中行',
            isFreeAction: true,
            disabled: this.state.selectedRows.length === 0,
            onClick: this.deleteSelectedBookmarks
          }
        ]}
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
            })
        }}
    />
    </div>
    );
  }
}

export default App;
