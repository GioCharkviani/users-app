import React, { useState, useEffect } from 'react';

import "./Users.css";

import EachUser from "./EachUser";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [lastPage, setlastPage] = useState(0);
    const [page, setPage] = useState(1);

    const handleScroll = (currentPage, lastPageId) => {
        const pageHeight = document.documentElement.scrollHeight;
        const pageYNow = window.pageYOffset;
        const screenHeight = document.documentElement.clientHeight;

        if(pageHeight-(pageYNow+screenHeight) < 100 && page === lastPageId) {
            setPage(currentPage+1);
        }
    };

    useEffect(() => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
        .then((response) => response.json())
        .then((data) => {
            setUsers([...users, ...data["list"]]);
            setlastPage(page);
        });
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', () => handleScroll(page, lastPage));

        return () => {
            window.removeEventListener('scroll', () => handleScroll(page, lastPage));
        };
    }, [page, lastPage]);

    let usersList = users.map(el => (
        <EachUser key={el.id} id={el.id} name={el.name} lastName={el.lastName} prefix={el.prefix} title={el.title} imageUrl={el.imageUrl} />
    ));

    return (
        <div className="users-container">
            {usersList}
        </div>
    )
}

export default Users;