import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolder, faFolderTree} from '@fortawesome/free-solid-svg-icons';
import {Link, useLoaderData, useLocation} from "react-router-dom";

import {iconClassByExtension, removeTrailingSlash} from "../utils";
import Breadcrumbs from "./Breadcrumbs";

const BACKEND_URL = 'http://localhost:8000';


const DirectoryHeader = ({currentFolder}) => {
    return (
        <div className="card-header">
            <Breadcrumbs/>
            <hr/>
            <h3><FontAwesomeIcon icon={faFolderTree}/> {currentFolder}</h3>
        </div>
    );
}


const DirectoryBody = ({directoryData, location}) => {

    return (
        <div className="card-body">
            <ul className="list-group">
                {directoryData["folders"].map((folder) => (
                    <FolderItem folder={folder} location={location}/>
                ))}
                {directoryData["files"].map((file) => (
                    <FileItem file={file} location={location}/>
                ))}
            </ul>
        </div>
    );
}


const FileItem = ({file, location}) => {
    const extension = file.name.split('.').pop();
    const fileLink = `${BACKEND_URL}${location.pathname.replace("directory", "view")}/${file.name}`;

    return (
        <li key={file.name} className="list-group-item">
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={iconClassByExtension[extension]} className="me-2"/>
                <Link to={fileLink}>
                    {file.name}
                </Link>
            </div>
        </li>
    );
}


const FolderItem = ({folder, location}) => {
    return (
        <li key={folder.name} className="list-group-item">
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faFolder} className="me-2"/>
                <Link to={`${location.pathname}/${folder.name}`}>{folder.name}</Link>
            </div>
        </li>
    );
}


const DirectoryContainer = () => {
    const directoryData = useLoaderData();
    const location = useLocation();
    const currentFolder = location.pathname.split("/").pop();

    location.pathname = removeTrailingSlash(location.pathname)

    return (
        <div className="container mt-5">
            <div className="card">
                <DirectoryHeader currentFolder={currentFolder}/>
                <DirectoryBody directoryData={directoryData} location={location}/>
            </div>
        </div>
    );
}

export default DirectoryContainer;