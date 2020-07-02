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
import AddFolderSidebar from './composition/AddFolderSidebar';
import EditNote from './composition/EditNote';
import EditFolder from './composition/EditFolder';

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
      fetch('http://localhost:8000/api/notes'),
      fetch('http://localhost:8000/api/folders')
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

  handleAddFolder = (folderName, folderId) => {
    let currentFolders = this.state.folders
    let newFolder = {title: folderName, id: folderId};
    this.setState({
      folders: [...currentFolders, newFolder]
    })
  }

  handleAddNote = (note) => {
    let currentNotes = this.state.notes
    let newNote = note;
    console.log(newNote)
    this.setState({
      notes: [...currentNotes, newNote]
    })
  }

  handleEditFolder = (newData, id) => {
    let folderIndex = this.state.folders.findIndex(folder => folder.id === id)
    let folderToUpdate = this.state.folders.filter(folder => folder.id === id)
    folderToUpdate = {...folderToUpdate, ...newData}
    let currentFolders = this.state.folders
    currentFolders.splice(folderIndex, 1)
    this.setState({
      folders: {...currentFolders, folderToUpdate}
    })
  }

  handleEditNote = (newData, id) => {
    let noteIndex = this.state.notes.findIndex(note => note.id === id)
    let noteToUpdate = this.state.notes.filter(note => note.id === id)
    noteToUpdate = {...noteToUpdate, ...newData}
    let currentNotes = this.state.notes
    currentNotes.splice(noteIndex, 1)
    this.setState({
      notes: {...currentNotes, noteToUpdate}
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
        <Route path='/edit-folder/:id' component={EditFolder} />
        <Route path='/edit-note/:id' component={EditNote} />
      </>
    )
  }

  renderSidebarRoutes() {
    return (
      <>
        <Route exact path='/' component={ListSidebar} />
        <Route path='/folder/:folderId' component={ListSidebar} />
        <Route path='/note/:noteId' component={NotePgSidebar} />
        <Route path='/add-folder' component={AddFolderSidebar} />
        <Route path='/add-note' component={AddFolderSidebar} />
        <Route path='/edit-folder/:id' component={AddFolderSidebar} />
        <Route path='/edit-note/:id' component={AddFolderSidebar} />
      </>
    )
  }

  render() {
    const contextVals = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      patchFolder: this.handleEditFolder,
      patchNote: this.handleEditNote
    };
    return (
      <FilesContext.Provider value={contextVals}>
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