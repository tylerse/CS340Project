import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Customers, Houses, Costs, Employees, Investors } from './pages/pages'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={ <Home /> } >
        <Route index={true} element={ <Costs /> }/>
        <Route path="customers" element={ <Customers /> }/>
        <Route path="houses" element={ <Houses /> }/>       
        <Route path="investors" element={ <Investors /> }/>
        <Route path="costs" element={ <Costs /> }/>
        <Route path="employees" element={ <Employees /> }/>        
      </Route>
    </Routes>
  </Router>
);

//        

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
