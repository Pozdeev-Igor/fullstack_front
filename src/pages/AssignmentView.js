import React, { useEffect, useState } from 'react';
import ajax from '../services/fetchService';
import {Badge, Col, Container, Form, Row} from "react-bootstrap";


const AssignmentView = () => {

    const assigmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        gitHubUrl:"",
        branch:""
    }); 

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        ajax(           `/api/assignments/${assigmentId}`, 
                        "PUT", 
                        localStorage.getItem('jwt'), 
                        assignment).then(
            
            (assignmentData) => {
            setAssignment(assignmentData);
            }
        );
    }
    useEffect(() => {

        ajax(   `/api/assignments/${assigmentId}`, 
                "GET", 
                localStorage.getItem('jwt')).then(
                    
            assignmentData => {
                if(assignmentData.gitHubUrl === null)   assignmentData.gitHubUrl = "";
                if(assignmentData.branch === null)   assignmentData.branch = "";
                setAssignment(assignmentData);
        });
    }, [])

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    <h1>Assignment ID: {assigmentId}</h1>
                </Col>
                <Col>
                    <Badge pill bg="info">
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>
            {assignment ? 
                <>
                    <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            GitHub URL
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control id="gitHubUrl"
                                          onChange={(e) => updateAssignment("gitHubUrl", e.target.value)}
                                          value={assignment.gitHubUrl}
                                          type="url" placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            Branch
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control id="branch"
                                          onChange={(e) => updateAssignment("branch", e.target.value)}
                                          value={assignment.branch}
                                          type="text" placeholder="branch-name" />
                        </Col>
                    </Form.Group>

                    <button
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => save()}>Submit assignment
                    </button>
                
                </> : 
                    <>
                    
                    </> }
        </Container>
    );
};

export default AssignmentView;