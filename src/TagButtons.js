import React,{Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';

class TagButtons extends Component {

render() {
    const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        }
      }));
return(
        <div>
            <Link to="/login">Logout</Link>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.Refresh}>
              <RefreshIcon className={classes.rightIcon} />
              Refresh
            </Button>
        </div>
  );
  }
}

export default TagButtons;