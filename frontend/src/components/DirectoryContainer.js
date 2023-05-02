import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile, faFileDownload, faFileZipper, faFolder, faFolderTree, faTags} from '@fortawesome/free-solid-svg-icons';
import {Link, useLoaderData, useLocation, useSearchParams} from "react-router-dom";
import AsyncSelect from "react-select/async";
import {Button} from "react-bootstrap";

import Breadcrumbs from "./Breadcrumbs";
import {BACKEND_URL, downloadFile, formatBytes, iconClassByExtension} from "../utils";


function TagsSelect() {
    const [searchParams, setSearchParams] = useSearchParams();

    const loadOptions = inputValue => {
        return tagsLoader().then(tags => tags.map(tag => ({value: tag.name, label: tag.name})));
    };

    const handleChange = tags => {
        searchParams.delete('tags');
        tags.map(tag => searchParams.append('tags', tag.value));
        setSearchParams(searchParams);
    };

    async function tagsLoader() {
        return await fetch(`${BACKEND_URL}/tags`, {credentials: "include"}).then(res => res.json());
    }

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            value={searchParams.getAll('tags').map(tag => ({value: tag, label: tag}))}
            onChange={handleChange}
        />
    );
}


const DirectoryHeader = ({currentFolder, location}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const directoryLink = location.pathname.replace('directory', 'download/directory')

    const handleClick = event => {
        if (event.target.checked) {
            searchParams.append('recursive', 'true');
        } else {
            searchParams.delete('recursive');
        }
        setSearchParams(searchParams);
    };

    const handleChange = event => {
        searchParams.delete('name');
        searchParams.append('name', event.target.value);
        setSearchParams(searchParams);
    };

    return (
        <div className="card-header">
            <Breadcrumbs/>
            <hr/>
            <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight text-truncate">
                    <h3><FontAwesomeIcon icon={faFolderTree}/> {currentFolder}</h3>
                </div>
                {location.pathname !== '/directory' && <div className="d-flex p-2 justify-content-end">
                    <Button className="p-2 bd-highlight"
                            onClick={() => downloadFile(directoryLink, `${currentFolder}.zip`)}>
                        <FontAwesomeIcon
                            icon={faFileZipper}
                            className="me-2"
                        />
                        Download archive
                    </Button>
                </div>}

            </div>
            <div className="d-flex bd-highlight">
                <div className="p-2 bd-highlight">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control mt-0" placeholder="Name" aria-label="Name"
                               aria-describedby="basic-addon1" onChange={handleChange} value={searchParams.get('name') || ''}/>
                    </div>
                </div>
                <div className="p-2 flex-grow-1 bd-highlight">
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Tags</span>
                        <TagsSelect/>
                    </div>
                </div>
                <div className="p-2 bd-highlight">
                    <div className="input-group-text">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                   onClick={handleClick} defaultChecked={searchParams.get('recursive') === ""}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Recursive</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const DirectoryBody = ({directoryData, location}) => {
    return (
        <div className="card-body">
            <ul className="list-group list-group-flush">
                {directoryData["folders"].map((folder) => (
                    <FolderItem key={`${location.pathname}/${folder.name}`} folder={folder} location={location}/>
                ))}
                {directoryData["files"].map((file) => (
                    <FileItem key={`${location.pathname}/${file.name}`} file={file} location={location}/>
                ))}
            </ul>
        </div>
    );
}


const FileItem = ({file, location}) => {
    const extension = file.name.split('.').pop();
    // FIXME: find a better way to create the file link
    const relativePath = file["relative_path"].replace(/\\/g, "/")
    const fileLink = `${location.pathname.replace('directory', 'download/file')}${relativePath}/${file.name}`.replace('./', '');

    return (
        <li key={file.name} className="list-group-item">
            <div className="d-flex bd-highlight">
                <div className="p-2 bd-highlight">
                    <FontAwesomeIcon
                        icon={iconClassByExtension[extension] || faFile}
                        className="me-2"
                    />
                </div>
                <div className="p-2 flex-grow-1 bd-highlight">
                    {file.name}
                </div>
                <div className="col-3">
                    {file["relative_path"] ?
                        <Link to={{pathname: `/directory/${file["relative_path"]}`, search: location.search}}>{file["relative_path"]}</Link> : null}
                </div>
                <div className="col-1 p-2">
                    {formatBytes(file.size)}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" onClick={() => downloadFile(fileLink, file.name)}>
                        <FontAwesomeIcon icon={faFileDownload}/>
                    </button>
                </div>
            </div>
            {file.tags.length > 0 ? (
                <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight">
                        <FontAwesomeIcon icon={faTags} className="me-2"/>
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                        {file.tags.map((tag) => (
                            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                        ))}
                    </div>
                </div>
            ) : null}

        </li>
    );
}


const FolderItem = ({folder, location}) => {
    return (
        <li key={folder.name} className="list-group-item">
            <div className="d-flex bd-highlight">
                <div className="p-2 bd-highlight">
                    <FontAwesomeIcon
                        icon={faFolder}
                        className="me-2"
                    />
                </div>
                <div className="p-2 flex-grow-1 bd-highlight">
                    <Link to={{pathname: `${location.pathname}/${folder.name}`, search: location.search}}>{folder.name}</Link>
                </div>
            </div>
            {folder.tags.length > 0 ? (
                <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight">
                        <FontAwesomeIcon icon={faTags} className="me-2"/>
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                        {folder.tags.map((tag) => (
                            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                        ))}
                    </div>
                </div>
            ) : null}
        </li>
    );
}


const DirectoryContainer = () => {
    const directoryData = useLoaderData();
    const location = useLocation();

    location.pathname = location.pathname.replace(/\/$/, "");
    const currentFolder = decodeURI(location.pathname.split("/").pop());

    return (
        <div className="container">
            <div className="card mt-5 shadow-lg">
                <DirectoryHeader currentFolder={currentFolder} location={location}/>
                <DirectoryBody directoryData={directoryData} location={location}/>
            </div>
        </div>
    );
}

export default DirectoryContainer;