import React , { useState } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = ()=>{
  
  const[progress,setProgress] = useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;

    return (
      <Router>
       <div>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

        <br/>
        <Routes>
        <Route exact path='/' element={<News apiKey={apiKey}  setProgress={setProgress}  key="general" pagesize={5} country="in" category="general"/>}></Route>
        <Route exact path='/business' element={<News apiKey={apiKey}  setProgress={setProgress}  key="business" pagesize={5} country="in" category="business"/>}></Route>
        <Route exact path='/entertainment' element={<News apiKey={apiKey}  setProgress={setProgress}  key="entertainment" pagesize={5} country="in" category="entertainment"/>}></Route>
        <Route exact path='/health' element={<News apiKey={apiKey}  setProgress={setProgress}  key="health" pagesize={5} country="in" category="health"/>}></Route>
        <Route exact path='/science' element={<News apiKey={apiKey}  setProgress={setProgress}  key="science" pagesize={5} country="in" category="science"/>}></Route>
        <Route exact path='/sports' element={<News apiKey={apiKey}  setProgress={setProgress}  key="sports" pagesize={5} country="in" category="sports"/>}></Route>
        <Route exact path='/technology' element={<News apiKey={apiKey}  setProgress={setProgress}  key="technology" pagesize={5} country="in" category="technology"/>}></Route> 
        </Routes>
       </div>

       </Router>       
    );
}

export default App;