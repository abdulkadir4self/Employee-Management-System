import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
const URL = 'http://localhost:5004/api/v1/employee';

const initialState = {
    success : false,
    employee: [],
    message : '',
    editEmp: {  //agr null value denge toh problem ayega kyonki null ke andar woh keys dhondega
        name: '',
        email: '',
        phone : '',
        salary : '',
        designation: '',
    },
}


//create employee
export const addEmployee = createAsyncThunk('employee/addEmployee' , async function(employeeData){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    console.log(employeeData);
    try {
        const response = await fetch( URL , {
            method : 'POST',
            body: employeeData,// agr image hai toh stringify karke nhi send karneka.
            headers : {
                'Authorization' : token
            }
        })


        const data = await response.json();
        console.log(data);
        return data; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//view employee
export const viewEmployee = createAsyncThunk('employee/viewEmployee' , async function(){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        const response = await fetch( URL , {
            method : 'GET', //post se data nhi jayega isliye body object ki jarurat nhi hai.
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//get single employee
export const getSingleEmployee = createAsyncThunk('employee/getSingleEmployee' , async function(empID){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        //localho.......:5004/api/v1/employees/gdsgdshgdhgds
        const response = await fetch( `${URL}/${empID}` , {
            method : 'GET', 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//delete employee
export const deleteEmployee = createAsyncThunk('employee/deleteEmployee' , async function(empID){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        const response = await fetch( `${URL}/${empID}` , {
            method : 'DELETE', 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return {data , empID}; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})



//edit employee
export const editEmployee = createAsyncThunk('employee/editEmployee' , async function(editedEmpData){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        //localho.......:5004/api/v1/employees/gdsgdshgdhgds
        const response = await fetch( `${URL}/${editedEmpData.empID}` , {
            method : 'PUT',
            body: JSON.stringify(editedEmpData), 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})


const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers : {
        clearEmployees : function(state , action){
            state.employee = [];
        },
        clearMessage : function(state , action){
            state.message = '';
        }
    },
    extraReducers: function(builder){
        builder.addCase(addEmployee.pending , function(state){
            state.message = 'please wait. we are adding employee';
            state.success = false;
        });
        builder.addCase(addEmployee.fulfilled , function(state , action){
            state.message = 'employee added successfully';
            state.success = true;
        });
        builder.addCase(addEmployee.rejected , function(state , action){
            state.message = 'employee could not added successfully';
            state.success = false;
        });


        //view employee request
        builder.addCase(viewEmployee.pending , function(state){
            state.employee = [];
            state.message = 'loading ...please wait.';
            state.success = false;
        });
        builder.addCase(viewEmployee.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.employee = action.payload.data;//kyonki backend se data object ke andar real wala data hai.
            //yeh data ko hum redux mein store kar rhe hai. state.employee = action.payload.data; yeh line likhke
            state.message = 'employee fetched successfully';
            state.success = true;
           }
           else{
            state.employee = [];
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(viewEmployee.rejected , function(state , action){
            state.employee = [];
            state.message = 'pls try again. server error';//rejected mein server se problem hota hai isliye
            // reject hota hai.
            state.success = false;
        });

        //delete employee
        builder.addCase(deleteEmployee.pending , function(state){
            state.message = 'deleting employee ...please wait.';
            state.success = false;
        });
        builder.addCase(deleteEmployee.fulfilled , function(state , action){
           if(action.payload.data.status == 1){
            state.employee = state.employee.filter(function(emp){
                return emp._id != action.payload.empID
            });
            state.message = 'employee deletion successfully';
            state.success = true;
           }
           else{
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(deleteEmployee.rejected , function(state , action){
            state.message = 'pls try again. server error';//rejected mein server se problem hota hai isliye
            // reject hota hai.
            state.success = false;
        });

//get simgle employee
        builder.addCase(getSingleEmployee.pending , function(state){
            state.editEmp =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'getting employees ...please wait.';
            state.success = false;
        });
        builder.addCase(getSingleEmployee.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.editEmp = action.payload.data;
            state.message = 'got employee  successfully';
            state.success = true;
           }
           else{
            state.editEmp =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(getSingleEmployee.rejected , function(state , action){
            state.editEmp =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'pls try again. server error';
            state.success = false;
        });

        //edit empoloyee
        builder.addCase(editEmployee.pending , function(state){
// state.editEmp isliye nhi likh rhe hai kyonki usko change nhi karna hai koi bhi promise ki state pe.
// nhi likhne ka matlab uska data change nhi hoga. latest data store hoga redux mein. 
            state.message = 'getting employees ...please wait.';
            state.success = false;
        });
        builder.addCase(editEmployee.fulfilled , function(state , action){
           if(action.payload.status == 1){
// state.editEmp isliye nhi likh rhe hai kyonki usko change nhi karna hai koi bhi promise ki state pe.
// nhi likhne ka matlab uska data change nhi hoga. latest data store hoga redux mein.
            state.message = 'got employee  successfully';
            state.success = true;
           }
           else{
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(editEmployee.rejected , function(state , action){
            state.message = 'pls try again. server error';
            state.success = false;
        });
    },
    
 

    
})

const {clearEmployees , clearMessage} = employeeSlice.actions;
export default employeeSlice.reducer;