import React,{Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


class TagButtons extends Component {
  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(e) {
    e.preventDefault();
    this.props.Refresh(this.title.value);
  }

render() {
    const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        }
      }));
return(
        <div>
             <input type="text" className="App-keywords" ref={(c) => this.title = c} name="title" />
      
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onSearch}>
              <RefreshIcon className={classes.rightIcon} />
              Search
            </Button>
            <Link to="/login/">Logout</Link>
        </div>
  );
  }
}

export default TagButtons;