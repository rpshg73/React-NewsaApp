import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar/>
        <News pageSize={5}/>
      </>
    )
  }
}
