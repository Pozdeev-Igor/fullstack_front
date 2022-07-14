import React, { useEffect, useState } from 'react';


const AssignmentView = () => {
    const assigmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState(null); 

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        fetch(`/api/assignments/${assigmentId}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method:"PUT",
            body: JSON.stringify(assignment) 
        }).then((response) => {if (response.status === 200) return response.json();
        }).then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }
    useEffect(() => {
        fetch(`/api/assignments/${assigmentId}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(assignmentData => {
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