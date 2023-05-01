import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolder, faFolderTree} from '@fortawesome/free-solid-svg-icons';
import {Link, useLoaderData, useLocation, useSearchParams} from "react-router-dom";
import {iconClassByExtension, removeTrailingSlash} from "../utils";
import Breadcrumbs from "./Breadcrumbs";
import AsyncSelect from "react-select/async";

const BACKEND_URL = 'http://localhost:8000';


function TagsSelect() {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const loadOptions = inputValue => {
        return tagsLoader().then(tags => tags.map(tag => ({value: tag.name, label: tag.name})));
    };

    const handleChange = tags => {
        setSelectedTags(tags);
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
            value={selectedTags}
            onChange={handleChange}
        />
    );
}


const DirectoryHeader = ({currentFolder}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = event => {
        if (event.target.checked) {
            searchParams.append('recursive', 'true');
        } else {
            searchParams.delete('recursive');
        }
        setSearchParams(searchParams);
    };

    const handleChange = event => {
        setSearchParams({name: event.target.value});
    };

    return (
        <div className="card-header">
            <Breadcrumbs/>
            <hr/>
            <h3><FontAwesomeIcon icon={faFolderTree}/> {currentFolder}</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control mt-0" placeholder="Name" aria-label="Name"
                       aria-describedby="basic-addon1" onChange={handleChange}/>
                <span className="input-group-text" id="basic-addon1">Tags</span>
                <TagsSelect/>
                <div className="input-group-text">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                               onClick={handleClick}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Recursive</label>
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
    const fileLink = `${location.pathname.replace("directory", "download/file")}/${file.name}`;

    return (
        <li key={file.name} className="list-group-item">
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={iconClassByExtension[extension]} className="me-2"/>
                <Link to={fileLink}>{file.name}</Link>
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