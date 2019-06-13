import React,{Component}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

class TagButtons extends Component {

render() {
    const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        input: {
          display: 'none',
        },
      }));
return(
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.Refresh.bind(this) }>
            Refresh
            </Button>
            <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin} onClick={() => { console.log('Add'); }}>
                <AddIcon />
            </Fab>
            <Fab size="medium" color="secondary" aria-label="Edit" className={classes.fab} onClick={() => { console.log('Edit'); }}>
            <EditIcon />
            </Fab>
        </div>
  );
  }
}

export default TagButtons;