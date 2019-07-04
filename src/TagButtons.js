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
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  onSearch(e) {
    e.preventDefault();
    this.props.Refresh(this.keywords.value);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  // change code above this line
  handleEnter() {
    this.props.Refresh(this.keywords.value);
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
render() {
    const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        }
      }));
return(
        <div>
             <input type="text" className="App-keywords" ref={(c) => this.keywords = c} name="keywords" />
      
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onSearch}>
              <RefreshIcon className={classes.rightIcon} />
              Reload
            </Button>
            <Link to="/login/">Logout</Link>
        </div>
  );
  }
}

export default TagButtons;