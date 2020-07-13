import React, { useState,useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import { Button, InputLabel, FormControl, Input } from '@material-ui/core';
import db from './firebase';
import firebase from "firebase";
function App() {
      const [todos, setTodos] = useState([]);
      const [input, setInput] = useState('');
      console.log(input);

        // when the app load we need to listen to the database and fetch new todos as the get added/removed
        useEffect(() => {
          //this code is fire.. when the app.js load
          db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
            setTodos(snapshot.docs.map(doc => ({id:doc.id, todo: doc.data().todo})))
          })
        }, []);

      const addtodo = (event) =>{
        //this will fire when we click the button
        event.preventDefault();  //will stop the reffress
        db.collection('todos').add({
              todo: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('i am working');
        setTodos([...todos, input]);
        setInput(''); //clear up the input field
      }

      // const deletetodo =(event) =>{
      //   db.collection('todo').delete({
      //     todo: delete
      //   })
      // }
  return (
    <div className="App">
      <h1>Whats Up Everyone !</h1>
      <form>
        <FormControl>
          <InputLabel>Type Your Message</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} onClick={addtodo} variant="contained" color="primary">
        Add Todo
        </Button>
      </form>

      <ul>
      {todos.map(todo => (
        <Todo todo={todo} />
      ))}
      </ul>

    </div>
  );
}

export default App;
