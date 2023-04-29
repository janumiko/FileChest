import React from 'react';
import {Container, Row, Col, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Breadcrumbs from "./Breadcrumbs";
import {useLoaderData, useLocation} from "react-router-dom";
import {iconClassByExtension} from "../utils";

const DirectoryContainer = () => {
    const directoryData = useLoaderData();
    const location = useLocation();
    const currentFolder = location.pathname.split("/").pop();


    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <Breadcrumbs/>
                    <hr/>
                    <h3><FontAwesomeIcon icon={solid("folder-tree")}/> {currentFolder}</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {directoryData["folders"].map((folder) => (
                            <li key={folder.name} className="list-group-item">
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={solid("folder")} className="me-2"/>
                                    <a href={`${location.pathname}/${folder.name}`}>{folder.name}</a>
                                </div>
                            </li>
                        ))}
                        {directoryData["files"].map((file) => {
                            const extension = file.name.split('.').pop();
                            return (
                                <li key={file.name} className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={iconClassByExtension[extension]} className="me-2"/>
                                        <a href={`${location.pathname.replace("directory", "view")}/${file.name}`}>{file.name}</a>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default DirectoryContainer;