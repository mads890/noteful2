import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListMain from './composition/ListMain';
import ListSidebar from './composition/ListSidebar';
import NotePgSidebar from './composition/NotePgSidebar';
import NotePgMain from './composition/NotePgMain';
import FilesContext from './composition/FilesContext';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('localhost:3000/notes'),
      fetch('localhost:3000/folders')
    ])
    .then(([notesResponse, foldersResponse]) => {
      if (!notesResponse.ok) {
        // throw new Error ?
        return notesResponse.json().then(err => Promise.reject(err));
      }
      if (!foldersResponse.ok) {
        // throw new Error ?
        return foldersResponse.json().then(err => Promise.reject(err));
      }
      return Promise.all([notesResponse.json(), foldersResponse.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({
        notes, folders
      });
    })
    .catch(err => {
      console.error({ err })
    })
  }

  handleDeleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  renderMainRoutes() {
    return (
      <>
  
        <Route path='/note/:noteId' component={NotePgMain} />
      </>
    )
  }

  renderSidebarRoutes() {
    return (
      <>

        <Route path='/note/:noteId' component={NotePgSidebar} />
        <Route path='/add-folder' component={NotePgSidebar} />
        <Route path='/add-note' component={NotePgSidebar} />
      </>
    )
  }

  render() {
    const contextValues = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return (
      <FilesContext.Provider value={contextValues}>
        <div className='App'>
          <header className='App-header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <nav className='sidebar'>{this.renderSidebarRoutes()}</nav>
          <main className='main'>{this.renderMainRoutes()}</main>
        </div>
      </FilesContext.Provider>
    );
  }
}