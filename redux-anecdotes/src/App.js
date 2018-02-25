import React from 'react';
import PropTypes from 'prop-types'

class App extends React.Component {
  createAnectode = (e) => {
    e.preventDefault();

    const newAnecdote = e.target.new_anectode.value;
    this.context.store.dispatch({ type: "NEW", data: { anecdote: newAnecdote } });

    e.target.new_anectode.value = "";
  }

  render() {
    const anecdotes = this.context.store.getState().sort((a, b) => (a.votes > b.votes ? -1 : 1))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.context.store.dispatch({
                  type: 'VOTE', 
                  id: anecdote.id
                })}>
                vote
              </button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnectode}>
          <div><input name="new_anectode"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App