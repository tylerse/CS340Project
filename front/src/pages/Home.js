import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../index.css';
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';

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
                    <Link onClick={() => setActiveA(0)} to="/">
                        <li className ={activeA === 0 ? "active" : ""}>
                            Costs
                        </li>
                    </Link>
                    <Link onClick={() => setActiveA(1)} to="customers">
                        <li className ={activeA === 1 ? "active" : ""}>
                            Customers
                            
                        </li>
                    </Link>
                    <Link onClick={() => setActiveA(2)} to="houses">
                        <li className ={activeA === 2 ? "active" : ""}>
                            Houses
                        </li>
                    </Link>
                    <Link onClick={() => setActiveA(3)} to="investors">
                        <li className ={activeA === 3 ? "active" : ""}>
                            Investors
                        </li>
                    </Link>
                    <Link onClick={() => setActiveA(4)} to="employees">
                        <li className ={activeA === 4 ? "active" : ""}>
                            Employees
                        </li>
                    </Link>
                    
                </ul>
            </div>
            <div className="main-content">
                <Outlet key={location.pathname}/>
            </div>
            
        </>
    )
}