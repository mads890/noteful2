import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListMain from './composition/ListMain';
import ListSidebar from './composition/ListSidebar';
import NotePgSidebar from './composition/NotePgSidebar';
import NotePgMain from './composition/NotePgMain';
import FilesContext from './composition/FilesContext';
import ErrorBoundary from './composition/ErrorBoundary';
import AddFolder from './composition/AddFolder';
import AddNote from './composition/AddNote';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
    ])
    .then(([notesResponse, foldersResponse]) => {
      if (!notesResponse.ok) {
        return notesResponse.json().then(err => Promise.reject(err));
      }
      if (!foldersResponse.ok) {
        return foldersResponse.json().then(err => Promise.reject(err));
      }
      return Promise.all([notesResponse.json(), foldersResponse.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({
        notes, folders,
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

  handleAddFolder = (folder) => {
    let currentFolders = this.state.folders
    let newFolder = folder;
    this.setState({
      folders: [...currentFolders, newFolder]
    })
  }

  handleAddNote = (note) => {
    let currentNotes = this.state.notes
    let newNote = note;
    this.setState({
      notes: [...currentNotes, newNote]
    })
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={ListMain} />
        <Route path='/folder/:folderId' component={ListMain} />
        <Route path='/note/:noteId' component={NotePgMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    )
  }

  renderSidebarRoutes() {
    return (
      <>
        <Route exact path='/' component={ListSidebar} />
        <Route path='/folder/:folderId' component={ListSidebar} />
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
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <FilesContext.Provider value={contextValues}>
        <div className='App'>
          <header className='App-header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <ErrorBoundary>
            <nav className='sidebar'>{this.renderSidebarRoutes()}</nav>
          </ErrorBoundary>
          <ErrorBoundary>
            <main className='main'>{this.renderMainRoutes()}</main>
          </ErrorBoundary>
        </div>
      </FilesContext.Provider>
    );
  }
}

export default App;