import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
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
                    window.location.href = `/assignments/${assignment.id}`;
                }
            );
    }

    return (
        <div style={{ margin: "2em" }}>
            {assignments
                ?
                assignments.map((assignment) =>
                    <div key={assignment.id}>

                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Assignment #{assignment.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                <Card.Text style={{ marginTop: "1em" }}>
                                    <p>
                                        <b>Github URL:</b> {assignment.gitHubUrl}
                                    </p>
                                    <p>
                                        <b>Branch:</b> {assignment.branch}
                                    </p>
                                </Card.Text>
                                
                                <Button onClick={() => {
                                    window.location.href = `/assignments/${assignment.id}`
                                }}>Edit</Button>
                            </Card.Body>
                        </Card>

                        {/* <ol className="list-group list-group">
                            <li className="list-group-item">
                                <Link to={`/assignments/${assignment.id}`}>
                                    Assignment ID: {assignment.id}
                                </Link>
                            </li>
                        </ol> */}
                    </div>) : <></>}

            <button type="button" className="btn btn-secondary" onClick={() => createAssignment()}>Submit new Assignment</button>
        </div>
    );
};

export default Dashboard;