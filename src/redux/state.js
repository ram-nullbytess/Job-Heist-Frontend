import {
    createStore
} from 'redux';
import {
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    // Auth
    isLoggedIn: false,
    alert: false,
    auth_token:"",
    // User
    name: "",
    email: "",
    role: "",
    _id: "",
    date: "",
    isResumeCreated:true,
    // jobs
    jobs:[],
    job:null,
    appliedJob:null,
   
    // search data
    region:['Pune','Hyderabad','Bengaluru','Kolkata','Mumbai','Jaipur','Lucknow','Surat','Kanpur','Ahmedabad','Chennai','Delhi','Gurgaon','Noida'],
    companies:['soal','Google','ola','infosys','Flipkart','Amazon','Oyo','One+','Uber','Swiggy','DHL','Tata','Zomato','Alphabet','Reliance','Bajaj','Paytm','Adobe'],
    category : ['Design','cooking','Artist','speak to client','event management','manual work','surveys','volunteer','full stack web developer','mern stack','mean stack','UI/UX Designer','Unix Engineer','Web Application Developer','Web Designer - Trainee','IT Software Fresher','Networking Manager','Computer Operator','Amazon','AngularJS Developer','Photoshop','After Effects','Digital Marketing','Content Writing','Blog Posting','Social Media Marketing','Bootstrap','Manual Testing','Operations Manager','Java Full Stack Developer','Javascript','Programmers','Game Developer','Graphic Designer','Internship','Trainee','Delivery Executives','Tutors','youtube content creators','fund rising','Animation','subtitle Translator' ],
    resumes:[],
    resume:null
}

const reducer = (state = initialState, action) => {
    let copyOfState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'SUCCESS-SIGNIN': {
            copyOfState.isLoggedIn = true;
            copyOfState.alert = false;
            copyOfState.name = action.payload.name;
            copyOfState.email = action.payload.email;
            copyOfState._id = action.payload._id;
            copyOfState.date = action.payload.date;
            copyOfState.role = action.payload.role;
            copyOfState.auth_token = action.payload.auth_token;
            return copyOfState;
        }
        case 'UNSUCCESS-SIGNIN': {
            copyOfState.alert = true;
            return copyOfState;
        }
        case "SIGNED-UP": {
            copyOfState.email = action.payload;
            return copyOfState;
        }
        case 'SET-USER-ROLE': {
            copyOfState.role = action.payload.role;
            copyOfState.auth_token = action.payload.auth_token;
            return copyOfState;
        }
        case 'RESUME-NOT-CREATED': { 
            copyOfState.isResumeCreated = false;
            return copyOfState;
        }
        case 'RESUME-CREATED': { 
            copyOfState.isResumeCreated = true;
            return copyOfState;
        }
        case 'JOB-SEARCH-RESULT': { 
            copyOfState.jobs = action.payload;
            return copyOfState;
        }
        case 'JOB-INDEX': { 
            let obj = copyOfState.jobs[action.payload];
            obj.index = action.payload;
            copyOfState.job = obj;
            return copyOfState;
        }
        case 'APPLIED-SUCCESSFULLY': { 
            copyOfState.jobs[action.payload.index].status = 'APPLIED SUCCESSFULLY';

            copyOfState.job = copyOfState.jobs[action.payload.index];
            return copyOfState;
        }
        case 'ALREADY-APPLIED': { 
            copyOfState.jobs[action.payload.index].status = 'ALREADY-APPLIED';
            copyOfState.job = copyOfState.jobs[action.payload.index];
            return copyOfState;
        }
        case 'APPLIED-JOB': { 
            copyOfState.appliedJob = action.payload;
            return copyOfState;
        }
        case 'RESUME-SEARCH-RESULT': { 
            copyOfState.resumes = action.payload;
            return copyOfState;
        }
        case 'RESUME-INDEX': { 
            let obj = copyOfState.resumes[action.payload];
            obj.index = action.payload;
            copyOfState.resume = obj;
            return copyOfState;
        }
        case 'ADDED-SUCCESSFULLY': { 
            copyOfState.resumes[action.payload.index].status = 'ADDED SUCCESSFULLY';

            copyOfState.resume = copyOfState.resumes[action.payload.index];
            return copyOfState;
        }
        case 'ALREADY-ADDED': { 
            copyOfState.resumes[action.payload.index].status = 'ALREADY ADDED';
            copyOfState.resume = copyOfState.resumes[action.payload.index];
            return copyOfState;
        }
        case 'SAVED-RESUME': { 
            copyOfState.resume = action.payload;
            return copyOfState;
        }
        case 'LOGOUT': {
            copyOfState.isLoggedIn = false;
            copyOfState.alert = false;
            copyOfState.auth_token = "";      
            // User
            copyOfState.name =  "";
            copyOfState.email = "";
            copyOfState.role =  "";
            copyOfState._id = "";
            copyOfState.date = "";
            copyOfState.isResumeCreated = true;
            // jobs
            copyOfState.jobs = [];
            copyOfState.job = null;
            copyOfState.appliedJob = null;
            // search data
            copyOfState.resumes = [];
            copyOfState.resume = null;
            localStorage.removeItem('jwtToken');
            return copyOfState;
        }
        default:
            return state;
    }

}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;