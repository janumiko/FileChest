import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolder, faFolderTree} from '@fortawesome/free-solid-svg-icons';
import {Link, useLoaderData, useLocation} from "react-router-dom";

import {iconClassByExtension, removeTrailingSlash} from "../utils";
import Breadcrumbs from "./Breadcrumbs";

const BACKEND_URL = 'http://localhost:8000';

const DirectoryContainer = () => {
    const directoryData = useLoaderData();
    const location = useLocation();
    const currentFolder = location.pathname.split("/").pop();

    location.pathname = removeTrailingSlash(location.pathname)

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <Breadcrumbs/>
                    <hr/>
                    <h3><FontAwesomeIcon icon={faFolderTree}/> {currentFolder}</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {directoryData["folders"].map((folder) => (
                            <li key={folder.name} className="list-group-item">
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faFolder} className="me-2"/>
                                    <Link to={`${location.pathname}/${folder.name}`}>{folder.name}</Link>
                                </div>
                            </li>
                        ))}
                        {directoryData["files"].map((file) => {
                            const extension = file.name.split('.').pop();
                            return (
                                <li key={file.name} className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={iconClassByExtension[extension]} className="me-2"/>
                                        <Link
                                            to={`${BACKEND_URL}${location.pathname.replace("directory", "view")}/${file.name}`}>{file.name}</Link>
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