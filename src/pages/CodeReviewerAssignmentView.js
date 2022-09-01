import React, {useEffect, useRef, useState} from 'react';
import ajax from "../services/fetchService";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import StatusBadge from "../StatusBadgeComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useLocalState} from "../util/useLocalState";
import {useUser} from "../UserProvider/UserProvider";

const CodeReviewerAssignmentView = () => {

    const user = useUser();
    const { assignmentId } = useParams();
    // const [jwt, setJwt] = useLocalState("", "jwt");
    let navigate = useNavigate();
    // const assigmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        gitHubUrl: "",
        branch: "",
        number: null,
        status: null
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);

    const previousAssignmentValue = useRef(assignment);

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function persist() {
        ajax(
            `/api/assignments/${assignmentId}`,
            "PUT",
            user.jwt,
            assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            }
        );
    }

    function save(status) {
        if (status && assignment.status !== status) {
            updateAssignment("status", status);
        }
         else {
            persist();
        }
    }

    useEffect(() => {
        if (previousAssignmentValue.current.status !== assignment.status) {
            persist();
        }
        previousAssignmentValue.current = assignment;
    }, [assignment])

    useEffect(() => {

        ajax(`/api/assignments/${assignmentId}`,
            "GET",
            user.jwt).then(
            (assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                if (assignmentData.gitHubUrl === null) assignmentData.gitHubUrl = "";
                if (assignmentData.branch === null) assignmentData.branch = "";
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
                    <StatusBadge text={assignment.status}/>
                </Col>
            </Row>
            {assignment ?
                <>
                    <Form.Group as={Row} className="my-4" controlId="gitHubUrl">
                        <Form.Label column sm="3" md="2">
                            GitHub URL
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                onChange={(e) => updateAssignment("gitHubUrl", e.target.value)}
                                value={assignment.gitHubUrl}
                                type="url"
                                readOnly
                                placeholder="https://github.com/username/repo-name"/>
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
                                type="text"
                                readOnly
                                placeholder="branch-name"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="codeReviewVideoUrl">
                        <Form.Label column sm="3" md="2">
                            Video Review URL
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)}
                                value={assignment.codeReviewVideoUrl}
                                type="url"
                                placeholder="https://screencast-o-matic.com/something"/>
                        </Col>
                    </Form.Group>

                    <div className="d-flex gap-3">
                        {assignment.status === "Completed" ? (
                            <Button size="lg"
                                    variant="secondary"
                                    onClick={() => save(assignmentStatuses[2].status)}>Re-Claim</Button>
                        ) : (
                            <Button size="lg" onClick={() => save(assignmentStatuses[4].status)}>
                                Complete Review
                            </Button>
                        )}
                        {assignment.status === "Needs update" ? (
                            <Button size="lg"
                                    variant="secondary"
                                    onClick={() => save(assignmentStatuses[2].status)}>Re-Claim</Button>
                            ) : (
                            <Button size="lg"
                                    variant="danger"
                                    onClick={() => save(assignmentStatuses[3].status)}>Reject Assignment</Button>
                        )
                        }

                        <Button size="lg" variant="secondary" onClick={() => (navigate("/dashboard"))}>
                            Go Back
                        </Button>
                    </div>

                </> :
                <>

                </>}
        </Container>
    );
};

export default CodeReviewerAssignmentView;