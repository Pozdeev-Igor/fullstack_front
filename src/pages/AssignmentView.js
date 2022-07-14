import React, { useEffect, useState } from 'react';
import ajax from '../services/fetchService';


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
        <div>
            <h1>Assignment ID: {assigmentId}</h1>
            {assignment ? 
                <>
                    <h2>
                        Assignment status: {assignment.status}
                    </h2>
                    <h3>
                        GitHub URL: 
                            <input 
                                type="URL" 
                                id="gitHubUrl" 
                                onChange={(e) => updateAssignment("gitHubUrl", e.target.value)}
                                value={assignment.gitHubUrl}
                                /> 
                    </h3>
                    <h3>
                        Branch: 
                            <input 
                                type="text" 
                                id="branch" 
                                onChange={(e) => updateAssignment("branch", e.target.value)}
                                value={assignment.branch}
                                />
                    </h3>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => save()}>Submit
                    </button>
                
                </> : 
                    <>
                    
                    </> }
        </div>
    );
};

export default AssignmentView;