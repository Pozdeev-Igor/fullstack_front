import React, { useEffect, useState } from 'react';
import ajax from '../services/fetchService';
import {Badge, ButtonGroup, Col, Container, DropdownButton, Form, Row, Dropdown} from "react-bootstrap";


const AssignmentView = () => {

    const assigmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        gitHubUrl:"",
        branch:"",
        number: null,
        status: null
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);

    async function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        await setAssignment(newAssignment);
    }

    function save() {
        //this implies that the student is submitting the assignment for the first time
        if (assignment.status === assignmentStatuses[0].status) {
            updateAssignment("status", assignmentStatuses[1].status);
        }
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
                    
            (assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                if(assignmentData.gitHubUrl === null)   assignmentData.gitHubUrl = "";
                if(assignmentData.branch === null)   assignmentData.branch = "";
                setAssignment(assignmentData);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatuses(assignmentResponse.statusEnum);
        });
    }, [])

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
                </Col>
                <Col>
                    <Badge pill bg="info">
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>
            {assignment ? 
                <>
                    <Form.Group as={Row} className="my-4" controlId="assignmentName">
                        <Form.Label column sm="3" md="2">
                            Assignment number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                variant={'info'}
                                title={assignment.number ? `Assignment ${assignment.number}` : "Select an assignment"}
                                onSelect={(selectedElement) => {

                                    updateAssignment("number", selectedElement);
                                }
                                }
                            >
                                {assignmentEnums.map((assignmentEnum) =>
                                    <Dropdown.Item
                                        key={assignmentEnum.assignmentNum}
                                        eventKey={assignmentEnum.assignmentNum}>
                                        {assignmentEnum.assignmentNum}
                                    </Dropdown.Item>)}

                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="gitHubUrl">
                        <Form.Label column sm="3" md="2">
                            GitHub URL
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                          onChange={(e) => updateAssignment("gitHubUrl", e.target.value)}
                                          value={assignment.gitHubUrl}
                                          type="url" placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="branch">
                        <Form.Label column sm="3" md="2">
                            Branch
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
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