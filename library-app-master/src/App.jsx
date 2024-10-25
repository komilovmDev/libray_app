// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Content from './Content/Content'
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);
    const [URL , setURL] = useState(`https://lib.utu-ranch.uz/book?`);
    const inputRef = useRef(null);

    const getBook = async (searchQuery = '') => {
        try {
            const response = await axios.get(`${URL}&search=${searchQuery}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div className="App">
            <Home inputRef={inputRef} getBook={getBook} URL={URL} setURL={setURL}/>
            <div className="CenterBoxDown">
                <Routes>
                    <Route path='/' element={<Content data={data} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
