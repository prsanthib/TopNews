import React, { Component } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export default class App extends Component {
  
  state={
    progress:0
  }

  setProgress=(progress)=>
  {
      this.setState({progress:progress})
  }

  render() {
    return (
      <Router>
       <div>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />

        <br/>
        <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress}  key="general" pagesize={5} country="in" category="general"/>}></Route>
        <Route exact path='/business' element={<News setProgress={this.setProgress}  key="business" pagesize={5} country="in" category="business"/>}></Route>
        <Route exact path='/entertainment' element={<News setProgress={this.setProgress}  key="entertainment" pagesize={5} country="in" category="entertainment"/>}></Route>
        <Route exact path='/health' element={<News setProgress={this.setProgress}  key="health" pagesize={5} country="in" category="health"/>}></Route>
        <Route exact path='/science' element={<News setProgress={this.setProgress}  key="science" pagesize={5} country="in" category="science"/>}></Route>
        <Route exact path='/sports' element={<News setProgress={this.setProgress}  key="sports" pagesize={5} country="in" category="sports"/>}></Route>
        <Route exact path='/technology' element={<News setProgress={this.setProgress}  key="technology" pagesize={5} country="in" category="technology"/>}></Route> 
        </Routes>
       </div>

       </Router>       
    )
  }
}