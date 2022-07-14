import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ajax from '../services/fetchService';
import { useLocalState } from '../util/useLocalState';

const Dashboard = () => {

    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax(   "api/assignments", 
                "GET", 
                localStorage.getItem('jwt')).then(
                    
                    assignmentsData => {
                    setAssignments(assignmentsData);
                    }
                )
    }, []);

    function createAssignment(){
        ajax(   "/api/assignments", 
                "POST", 
                localStorage.getItem('jwt')).then(
                    
                    assignment => {
                    window.location.href = `assignments/${assignment.id}`;
                    }
                );
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