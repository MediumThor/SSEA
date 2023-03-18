import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import styled from 'styled-components';
import menuIcon from './assets/menu.svg';


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
            {isSidebarOpen ? null : (
                <MenuButton className="sidebar-toggle" onClick={toggleSidebar}>
                    <img src={menuIcon} alt="Menu" />
                </MenuButton>
            )}
            <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={toggleSidebar}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/page1" onClick={toggleSidebar}>
                            Page 1
                        </Link>
                    </li>
                    <li>
                        <Link to="/page2" onClick={toggleSidebar}>
                            Page 2
                        </Link>
                    </li>
                    <li>
                        <Link to="/page3" onClick={toggleSidebar}>
                            Page 3
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;

const MenuButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin: 0;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
