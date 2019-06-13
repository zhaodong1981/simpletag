import React, {Component} from 'react';
import MaterialTable from 'material-table';
class RefreshData extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
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
      <MaterialTable        
        title="Refresh Data Preview"
        tableRef={this.tableRef}
        columns={[
            { title: 'Title', field: 'title' },
            { title: 'URL', field: 'url',render: rowData => <a href={rowData.url} target="_blank">{rowData.url}</a> },
            { title: 'Date', field: 'modifydate'},
            { title: 'Tags', field: 'tags', render: rowData => 
            <div>{rowData.tags.map((tag, index) => (
                  <a href={'http://tag.zhaodong.name/api/tag/'+tag} target="_blank">{tag}</a>
              ))}
            </div>
            }
          ]}
      
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'http://tag.zhaodong.name/api/link?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
          })
        }
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
          }
        ]}
      />
    )
  }
}

export default RefreshData;