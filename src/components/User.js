import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import "./User.css";

import EachUser from './EachUser';

const User = () => {
    const params = useParams();

    const userId = params.userId;

    const [user, setUser] = useState(null);
    const [firends, setFriends] = useState([]);
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
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setUser(data)
        });
    }, [userId]);

    useEffect(() => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/20`)
        .then((response) => response.json())
        .then((data) => {
            setFriends([...firends, ...data["list"]]);
            setlastPage(page);
        });
    }, [userId, page]);

    useEffect(() => {
        window.addEventListener('scroll', () => handleScroll(page, lastPage));

        return () => {
            window.removeEventListener('scroll', () => handleScroll(page, lastPage));
        };
    }, [page, lastPage]);


    let firendsList = firends.map(el => (
        <EachUser key={el.id} id={el.id} name={el.name} lastName={el.lastName} prefix={el.prefix} title={el.title} imageUrl={el.imageUrl} />
    ))


    return (
        <>
            {
                user ? 
                (<div className='user-container'>
                    <div className='main-block'>
                        <div>
                            <img src={user["imageUrl"]} alt='img' />
                        </div>
                        <div className='info-block'>
                            <fieldset >
                                <legend>Info</legend>
                                <div>
                                    <h3>{user.prefix} {user.name} {user.lastName}</h3>
                                </div>
                                <div>
                                    <p>{user.title}</p>
                                </div>
                                <br/>
                                <div>
                                    <p><span className="under-line">Email</span>: {user.email}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Ip Address</span>: {user.ip}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Job Area</span>: {user.jobArea}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Job Type</span>: {user.jobType}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Job Description</span>: {user.jobDescriptor}</p>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset >
                                <legend>Address</legend>
                                <div>
                                    <h4>{user.company.name} {user.company.suffix}</h4>
                                </div>
                                <div>
                                    <p><span className="under-line">City</span>: {user.address.city}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Country</span>: {user.address.country}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">State</span>: {user.address.state}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">Street Address</span>: {user.address.streetAddress}</p>
                                </div>
                                <div>
                                    <p><span className="under-line">ZIP</span>: {user.address.zipCode}</p>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className='friends-block'>
                        <div>
                            <h2>Friends:</h2>
                        </div>
                        <div className="friends-container">
                            {firendsList}
                        </div>
                    </div>
                </div>)
                :
                (<div className="loading">
                    Loading...
                </div>)
            }
        </>
    )
}

export default User;