import React,{Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';


class TagButtons extends Component {
  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = { searchText: '' };
  }
  onSearch(e) {
    e.preventDefault();
    this.props.Refresh(this.state.searchText);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  // change code above this line
  handleEnter() {
    this.props.Refresh(this.state.searchText);
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  handleInputChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleClear() {
    this.setState({ searchText: '' });
    this.props.Refresh('');
  }
render() {
    const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        }
      }));
return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, minHeight: 48}}>
            <div style={{width: 180}} />
            <div style={{display: 'inline-flex', alignItems: 'center'}}>
               <TextField
                 placeholder="Input keywords to search"
                 name="keywords"
                 variant="outlined"
                 size="small"
                 value={this.state.searchText}
                 onChange={this.handleInputChange}
                 style={{marginRight: 8, width: 240, minWidth: 240, boxSizing: 'border-box'}}
                 inputProps={{ maxLength: 500 }}
                 InputProps={{
                   style: { height: 36 },
                   startAdornment: (
                     <InputAdornment position="start">
                       <SearchIcon />
                     </InputAdornment>
                   ),
                   endAdornment: (
                     <InputAdornment position="end">
                       <IconButton size="small" onClick={this.handleClear} aria-label="清除">
                         <ClearIcon />
                       </IconButton>
                     </InputAdornment>
                   )
                 }}
               />

              <Button variant="contained" color="primary" size="small" onClick={this.onSearch} style={{minWidth: 240}}>
              Search
              </Button>
            </div>
            <div style={{paddingRight: 12}}><Link to="/login/">Logout</Link></div>
        </div>
  );
  }
}

export default TagButtons;