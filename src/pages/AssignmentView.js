import React, {useEffect, useRef, useState} from 'react';
import ajax from '../services/fetchService';
import {Badge, ButtonGroup, Col, Container, DropdownButton, Form, Row, Dropdown, Button} from "react-bootstrap";
import StatusBadge from "../StatusBadgeComponent";
import {useNavigate} from "react-router-dom";
import {useLocalState} from "../util/useLocalState";
import {useUser} from "../UserProvider/UserProvider";
import loginPage from "./LoginPage";


const AssignmentView = () => {

    const user = useUser();
    const [jwt, setJwt] = useLocalState("", "jwt");
    let navigate = useNavigate();
    const assigmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        gitHubUrl: "",
        branch: "",
        number: null,
        status: null
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const [comment, setComment] = useState({
        text: "",
        assignment: assigmentId,
        user: user.jwt,

    });
    const previousAssignmentValue = useRef(assignment);

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function persist() {
        ajax(
            `/api/assignments/${assigmentId}`,
            "PUT",
            jwt,
            assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            }
        );
    }

    function save(status) {
        // this implies that the student is submitting the assignment for the first time
        if (status && assignment.status !== status) {
            updateAssignment("status", status);
        } else {
            persist();
        }
    }

    function submitComment() {
        ajax('/api/comments', "POST", user.jwt, comment).then(data => {
            console.log(data);
        })
    }

    function updateComment(value) {
        const commentCopy = {...comment}
        commentCopy.text = value;
        setComment(commentCopy);
    }

    useEffect(() => {
        if (previousAssignmentValue.current.status !== assignment.status) {
            persist();
        }
        previousAssignmentValue.current = assignment;
    }, [assignment])

    useEffect(() => {

        ajax(`/api/assignments/${assigmentId}`,
            "GET", jwt).then(
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
                                type="url" placeholder="https://github.com/username/repo-name"/>
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
                                type="text" placeholder="branch-name"/>
                        </Col>
                    </Form.Group>

                    {assignment.status === "Completed" ? (
                        <>
                            <Form.Group as={Row} className="d-flex align-items-center mb-3"
                                        controlId="codeReviewVideoUrl">
                                <Form.Label column sm="3" md="2">
                                    Code Review Video URL
                                </Form.Label>
                                <Col sm="9" md="8" lg="6">
                                    <a href={assignment.codeReviewVideoUrl}
                                       style={{fontWeight: "bold"}}>
                                        {assignment.codeReviewVideoUrl}
                                    </a>
                                </Col>
                            </Form.Group>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => (navigate("/dashboard"))}>Go Back</Button>
                        </>
                    ) : assignment.status === "Pending submission" ? (
                        <div className="d-flex gap-3">
                            <Button size="lg" onClick={() => save("Submitted")}>
                                Submit assignment
                            </Button>

                            <Button size="lg" variant="secondary" onClick={() => (navigate("/dashboard"))}>
                                Go Back
                            </Button>
                        </div>
                    ) : (<div className="d-flex gap-3">
                        <Button size="lg" onClick={() => save("Resubmitted")}>
                            Resubmit assignment
                        </Button>

                        <Button size="lg" variant="secondary" onClick={() => (navigate("/dashboard"))}>
                            Go Back
                        </Button>
                    </div>)}

                    <div className="mt-5">
                        <textarea style={{width: "100%", borderRadius: "0.35em"}}
                                  onChange={(e) => updateComment(e.target.value)}></textarea>
                        <Button onClick={() => submitComment()}>Comment</Button>
                    </div>
                </> :
                <>

                </>}
        </Container>
    );
};

export default AssignmentView;