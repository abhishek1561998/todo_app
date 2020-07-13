import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Input, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Icon, Modal, Backdrop, Fade  } from '@material-ui/core';
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge:true })
        setOpen(false);
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={e => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">i am modal</h2>
            <p id="transition-modal-description">please update your message.</p>
            <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button type="button" onClick={updateTodo}>
                                Update todo
                </Button>
        </div>
        </Fade>
      </Modal>
            <List>
                <ListItem >
                <ListItemAvatar>
                </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Hey Your are cool !" />
                </ListItem>
                        <Button type="button" onClick={handleOpen}>
                            Edit Me
                        </Button>
                        <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()}>
                            <DeleteIcon />
                        </Button>
            </List>
        </div>
    )
}

export default Todo

