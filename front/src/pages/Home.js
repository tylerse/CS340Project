import { Outlet, Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../index.css';
import logo from '../logo.svg';

export default function Home(){
    
    const [activeA, setActiveA] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <>
            <div className = "header">
                <div className = "left">
                    <span>Operations Database</span>
                </div>
                <div className = "middle">
                    <img src={logo} alt="logo" height="75px" />
                    
                </div>
                <div className = "right">
                    <span>Internal Use Only</span>
                    
                    
                </div>
            </div>
            <div className = "nav-bar">
                <ul>
                    <NavLink className={({ isActive }) => isActive ? "active" : ''} to="costs">
                        <li>
                            Costs
                        </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active" : ''} to="customers">
                        <li className ={activeA === 1 ? "active" : ""}>
                            Customers
                            
                        </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active" : ''} to="houses">
                        <li className ={activeA === 2 ? "active" : ""}>
                            Houses
                        </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active" : ''} to="investors">
                        <li className ={activeA === 3 ? "active" : ""}>
                            Investors
                        </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active" : ''} to="employees">
                        <li className ={activeA === 4 ? "active" : ""}>
                            Employees
                        </li>
                    </NavLink>
                    
                </ul>
            </div>
            <div className="main-content">
                <Outlet key={location.pathname}/>
            </div>
            
        </>
    )
}