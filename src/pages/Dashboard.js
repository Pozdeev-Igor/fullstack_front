import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import ajax from '../services/fetchService';
import StatusBadge from "../StatusBadgeComponent";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";

const Dashboard = () => {

    const user = useUser();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments",
            "GET",
            user.jwt).then(
            assignmentsData => {
                setAssignments(assignmentsData);
            });
        if (!user.jwt) navigate("/login");
    }, [user.jwt]);

    function createAssignment() {
        ajax("/api/assignments",
            "POST",
            user.jwt).then(
            assignment => {
                navigate(`/assignments/${assignment.id}`);
            }
        );
    }

    return (
        <div style={{margin: "2em"}}>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            user.setJwt(null);
                            navigate("/login");
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>
            <div className="mb-5">
                <Button size="lg" onClick={() => createAssignment()}>
                    Submit New Assignment
                </Button>
            </div>
            {assignments ? (
                <div
                    className="d-grid gap-5"
                    style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}
                >
                    {assignments.map((assignment) => (
                        <Card
                            key={assignment.id}
                            style={{width: "18rem", height: "18rem"}}
                        >
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment #{assignment.number}</Card.Title>
                                <div className="d-flex align-items-start">
                                    <StatusBadge text={assignment.status}/>
                                </div>
                                <Card.Text style={{marginTop: "1em"}}>
                                        <p>
                                            <b>GitHub URL</b>: {assignment.gitHubUrl}
                                        </p>
                                        <p>
                                            <b>Branch</b>: {assignment.branch}
                                        </p>
                                </Card.Text>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        navigate(`/assignments/${assignment.id}`);
                                    }}
                                >
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Dashboard;