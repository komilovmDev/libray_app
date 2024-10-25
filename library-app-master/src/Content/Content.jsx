// Content.jsx
import React from 'react';
import "./Content.css";
import { FaCloudArrowDown } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";

export default function Content({ data }) {
    return (
        <div className="Content">
            {
                data.length === 0 ? (
                    <div>No results found for ""</div>
                ) : (
                    data.map(item => (
                        <div className="CenterBox" key={item.id}>
                            <div className="CenterUp">
                                <div className="imgleftbox">
                                    <SiBookstack />
                                </div>
                                <div className="LeftTextBox">
                                    <p>{item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title}</p>
                                    <h6>{item.slug.length > 10 ? `${item.slug.slice(0, 10)}...` : item.slug}</h6>
                                    <h6>{item.file_size}mb</h6>
                                </div>
                            </div>
                            <div className="LeftButtonbox">
                                <a href={item.file} download>
                                    <button><FaCloudArrowDown /> <p>yuklab olish</p></button>
                                </a>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}
