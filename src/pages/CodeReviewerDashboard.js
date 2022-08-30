import React, {useEffect, useState} from 'react';
import ajax from "../services/fetchService";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import jwt_decode from "jwt-decode";

const CodeReviewerDashboard = () => {
    const [assignments, setAssignments] = useState(null);

    function claimAssignment(assignment) {
        const decodedJwt = jwt_decode(localStorage.getItem("jwt"));

        const user = {
            // id: null,
            username: decodedJwt.sub,
            authorities: decodedJwt.authorities,
        }
            assignment.codeReviewer = user;
        //TODO: don't hardcode this status
            assignment.status = "In review";
        ajax(       `/api/assignments/${assignment.id}`,
            "PUT",
                        localStorage.getItem("jwt"),
                        assignment)
            .then(updatedAssignment => {
            //TODO: update the view for the assignment that changed
                const assignmentsCopy = [...assignments];
                const i = assignmentsCopy.findIndex(a => a.id === assignment.id);
                assignmentsCopy[i] = updatedAssignment;
                setAssignments(assignmentsCopy);
        })
    }
    useEffect(() => {
        ajax("api/assignments", "GET", localStorage.getItem("jwt")).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, [localStorage.getItem("jwt")]);

    return (
        <Container>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="h1">Code Reviewer Dashboard</div>
                </Col>
            </Row>
            <div className="assignment-wrapper in-review">
                <div className="assignment-wrapper-title h3 px-2">In Review</div>
                {assignments && assignments.filter((assignment) => assignment.status === 'In review').length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {assignments.filter((assignment) => assignment.status === 'In review')
                                    .map((assignment) => (
                            <Card
                                key={assignment.id}
                                style={{ width: "18rem", height: "18rem" }}
                            >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                        <Badge
                                            pill
                                            bg="info"
                                            style={{
                                                fontSize: "1em",
                                            }}
                                        >
                                            {assignment.status}
                                        </Badge>
                                    </div>

                                    <Card.Text style={{ marginTop: "1em" }}>
                                        <p>
                                            <b>GitHub URL</b>: {assignment.githubUrl}
                                        </p>
                                        <p>
                                            <b>Branch</b>: {assignment.branch}
                                        </p>
                                    </Card.Text>

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            claimAssignment(assignment);
                                        }}
                                    >
                                        Claim
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div>No assignments found</div>
                )}
            </div>

            <div className="assignment-wrapper submitted">
                <div className="assignment-wrapper-title h3 px-2">Awaiting Review</div>
                {assignments && assignments.filter((assignment) => assignment.status === 'Submitted').length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {assignments.filter((assignment) => assignment.status === 'Submitted')
                                    .map((assignment) => (
                            <Card
                                key={assignment.id}
                                style={{ width: "18rem", height: "18rem" }}
                            >
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                        <Badge
                                            pill
                                            bg="info"
                                            style={{
                                                fontSize: "1em",
                                            }}
                                        >
                                            {assignment.status}
                                        </Badge>
                                    </div>

                                    <Card.Text style={{ marginTop: "1em" }}>
                                        <p>
                                            <b>GitHub URL</b>: {assignment.githubUrl}
                                        </p>
                                        <p>
                                            <b>Branch</b>: {assignment.branch}
                                        </p>
                                    </Card.Text>

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            claimAssignment(assignment);
                                        }}
                                    >
                                        Claim
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div>No assignments found</div>
                )}
            </div>

            <div className="assignment-wrapper needs-update">
                <div className="assignment-wrapper-title h3 px-2">Needs Update</div>
                {assignments && assignments.filter((assignment) => assignment.status === 'Needs update').length > 0 ? (
                    <div
                        className="d-grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {assignments.filter((assignment) => assignment.status === 'Needs update')
                            .map((assignment) => (
                                <Card
                                    key={assignment.id}
                                    style={{ width: "18rem", height: "18rem" }}
                                >
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                                        <div className="d-flex align-items-start">
                                            <Badge
                                                pill
                                                bg="info"
                                                style={{
                                                    fontSize: "1em",
                                                }}
                                            >
                                                {assignment.status}
                                            </Badge>
                                        </div>

                                        <Card.Text style={{ marginTop: "1em" }}>
                                            <p>
                                                <b>GitHub URL</b>: {assignment.githubUrl}
                                            </p>
                                            <p>
                                                <b>Branch</b>: {assignment.branch}
                                            </p>
                                        </Card.Text>

                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                claimAssignment(assignment);
                                            }}
                                        >
                                            Claim
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>No assignments found</div>
                )}
            </div>


        </Container>
    );
};

export default CodeReviewerDashboard;