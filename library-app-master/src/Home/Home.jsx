import React, { useEffect, useState } from 'react';
import "./Home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import axios from 'axios';

export default function Home({ URL, setURL, getBook, inputRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [catData, setCatData] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const getCategory = async () => {
        try {
            const response = await axios.get('https://lib.utu-ranch.uz/library-categories/');
            setCatData(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    function CatFilter(ID) {
        setURL(`${URL}&cat=${ID}`);
        getBook();
    }

    // search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await getBook(searchQuery);
        };
        fetchData();
    }, [searchQuery, getBook]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="Home">
            <div className="LeftNavMenu">
                <div className="LeftNavMenu-Title">
                    <p>Bo'limlar</p>
                </div>
                <div className="LeftNavMenu-ChekBox">
                    {
                        catData.map((item) => (
                            <div className="Toggle-Filter" key={item.id}>
                                <label className="toggler-wrapper style-4">
                                    <input
                                        type="checkbox"
                                        onChange={() => CatFilter(item.id)}
                                    />
                                    <div className="toggler-slider">
                                        <div className="toggler-knob"></div>
                                    </div>
                                </label>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="CenterSearch">
                <div className="CenterSearchUp">
                    <div className="LabInp">
                        <label type="search">
                            <input
                                ref={inputRef}
                                type="search"
                                placeholder="Qidirish"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            {" "}
                            <button type="submit"><AiOutlineSearch /></button>
                        </label>
                    </div>
                    <div className="SearchLanguage">
                        <div className="dropdown">
                            <button onClick={toggleDropdown} className="dropdown-button">
                                {selectedValue || 'Ozbekcha'}
                                <div className={`vniz ${isOpen ? 'rotate' : ''}`}>
                                    <div className="down"><FaAngleDown /></div>
                                    <div className="up"><FaAngleUp /></div>
                                </div>
                            </button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <button onClick={() => handleSelect('Ozbekcha')}>Ozbekcha <div className="chek"><FaCheck /></div></button>
                                    <button onClick={() => handleSelect('Ruscha')}>Русский <div className="chek"><FaCheck /></div></button>
                                    <button onClick={() => handleSelect('Inglizcha')}>English <div className="chek"><FaCheck /></div></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
