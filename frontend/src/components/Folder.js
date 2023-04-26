import React from "react";
import {Link, useLoaderData, useLocation, Outlet} from "react-router-dom";
import BreadCrumbs from "./Breadcrumbs";
import {Container, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import {FaFolder, FaFile} from "react-icons/fa";


const BACKEND_URL = "http://127.0.0.1:8000"


const Folder = () => {
    const response = useLoaderData();
    const location = useLocation();
    console.log('response', response);

  return (
    <div>
      <BreadCrumbs />
      <Container className="p-3">
        <Row>
          <Col md={6}>
            <h2>
              <FaFolder /> Folders
            </h2>
            <ListGroup>
              {response["folders"].map((folder) => (
                <ListGroupItem key={folder.name}>
                  <Link to={`${location.pathname}/${folder.name}`}>
                    <FaFolder /> {folder.name}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={6}>
            <h2>
              <FaFile /> Files
            </h2>
            <ListGroup>
              {response["files"].map((file) => (
                <ListGroupItem key={file.name}>
                  <Link
                    to={`${BACKEND_URL}${location.pathname.replace(
                      "directory",
                      "view"
                    )}/${file.name}`}
                  >
                    <FaFile /> {file.name}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Folder;
