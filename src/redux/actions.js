const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

export  function login(user) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/api/users/sign-in`,user);
            if(response.headers.auth_token)
            localStorage.setItem('jwtToken',response.headers.auth_token);
            return dispatch({type:'SUCCESS-SIGNIN',payload:{
                role:response.data.role,
                date:response.data.date,
                _id:response.data._id,
                name:response.data.name,
                email:response.data.email,
                auth_token:response.headers.auth_token
            }});
        } catch (error) {
            return dispatch({type:'UNSUCCESS-SIGNIN'});
        }

    }
}

export  function signedUp(email) {
return {type:"SIGNED-UP",payload:email}
}

export function setUserType(role,_id) {
   
    return async (dispatch) => {
        try {
             const response = await axios.put('/api/users/role',{role : role ,_id : _id});
             localStorage.setItem('jwtToken',response.headers.auth_token);
             return dispatch({type:'SET-USER-ROLE',payload:{role:response.data,auth_token:response.headers.auth_token}});
        } catch (error) {
             return dispatch({type:'UNSUCCESS'});
        }
    }
}

export function resumeNotCreated() {
    return {type:"RESUME-NOT-CREATED"}
};

export function resumeCreated() {
    return {type:"RESUME-CREATED"}
};

export function jobSearchResult(jobs) {
    return {type:"JOB-SEARCH-RESULT",payload:jobs}
};

export function jobIndex(jobIndex) {
    return {type:"JOB-INDEX",payload:jobIndex}
};


export function applyJob(job_id,applier_id,auth_token , index) {   
    return async (dispatch) => {
        try {
             const response = await axios.post('/api/applied-jobs',{job_id : job_id ,applier_id : applier_id}, 
             {
                 headers: {
                     'auth_token': auth_token,
                 }
             });
             if(response)
             return dispatch({type:'APPLIED-SUCCESSFULLY',payload:{index:index}});
        } catch (error) {
             return dispatch({type:'ALREADY-APPLIED',payload:{index:index}});
        }
    }
   
}

export function appliedJob(appliedJob) {
    return {type:"APPLIED-JOB",payload:appliedJob}
};

export function resumeSearchResult(resumes) {
    return {type:"RESUME-SEARCH-RESULT",payload:resumes}
};

export function resumeIndex(resumeIndex) {
    return {type:"RESUME-INDEX",payload:resumeIndex}
};


export function saveResume(resume_id,saver_id,auth_token , index) {   
    return async (dispatch) => {
        try {
             const response = await axios.post('/api/saved-resumes',{resume_id : resume_id ,saver_id : saver_id}, 
             {
                 headers: {
                     'auth_token': auth_token,
                 }
             });
             
             if(response)
             return dispatch({type:'ADDED-SUCCESSFULLY',payload:{index:index}});
        } catch (error) {
            
             return dispatch({type:'ALREADY-ADDED',payload:{index:index}});
        }
    }
   
}

export function savedResume(savedResume) {
    return {type:"SAVED-RESUME",payload:savedResume}
};

export function logOut(){
    return {type:'LOGOUT'}
}

export function getUserByToken(){
    return async (dispatch) => {
        try {
             const response = await axios.get('/api/users/jwt-varify', 
             {
                 headers: {
                     'auth_token': localStorage.getItem('jwtToken'),
                 }
             });
             return dispatch({type:'SUCCESS-SIGNIN',payload:{
                role:response.data.role,
                date:response.data.date,
                _id:response.data._id,
                name:response.data.name,
                email:response.data.email,
                auth_token:localStorage.getItem('jwtToken')
             }});
        } catch (error) {
             return dispatch({type:'ERROR'});
        }
    }
}