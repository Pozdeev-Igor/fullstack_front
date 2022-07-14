import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalState';

const Dashboard = () => {

    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        fetch("api/assignments", {
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            method: "GET"
        }).then((response) => {
                if (response.status === 200)    return response.json();

        }).then(assignmentsData => {
            setAssignments(assignmentsData);
        })
    }, []);

    function createAssignment(){
        fetch("/api/assignments", {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(assignment => {
            window.location.href = `assignments/${assignment.id}`;
        });
    }

    return (
        <div style={{margin: "2em"}}>
            {assignments 
                        ? 
            assignments.map((assignment) => 
                <div key={assignment.id}>
                    <ol className="list-group list-group">
                        <li className="list-group-item">
                            <Link to={`/assignments/${assignment.id}`}>
                                Assignment ID: {assignment.id}
                            </Link>
                        </li>
                    </ol>
                </div>) : <></>}
        
        <button type="button" className="btn btn-secondary" onClick={() => createAssignment()}>Submit new Assignment</button>
    </div>
    );
};

export default Dashboard;