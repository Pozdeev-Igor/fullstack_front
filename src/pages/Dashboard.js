import React, { useEffect, useState } from 'react';
import {Card, Button, Badge, Col, Row} from 'react-bootstrap';
import ajax from '../services/fetchService';

const Dashboard = () => {

    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments",
            "GET",
            localStorage.getItem('jwt')).then(

                assignmentsData => {
                    setAssignments(assignmentsData);
                }
            )
    }, []);

    function createAssignment() {
        ajax("/api/assignments",
            "POST",
            localStorage.getItem('jwt')).then(

                assignment => {
                    window.location.href = `assignments/${assignment.id}`;
                }
            );
    }

    return (
        <div style={{ margin: "2em" }}>
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
          <div className="mb-5">
            <Button size="lg" onClick={() => createAssignment()}>
              Submit New Assignment
            </Button>
          </div>
          {assignments ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments.map((assignment) => (
                // <Col>
                <Card
                  key={assignment.id}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <div className="d-flex align-items-start">
                            <Badge pill bg={assignment.status === "Completed" ? "success" :"info"}>
                          {assignment.status}
                            </Badge>
                      </div>
                    <Card.Text style={{ marginTop: "1em" }}>
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
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
                // </Col>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
};

export default Dashboard;