import axios from 'axios';
import { useEffect, useState } from "react";

export default function HelloReact() {


  const [employees, setUsers] = useState([]);
  const [id, setId] = useState('');

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/index");
    setUsers(result.data.users);
    // console.log(result.data.users[0]['name']);

  }
  async function save(event)
  {
      event.preventDefault();
  try
      {
       await axios.post("http://127.0.0.1:8000/api/save",
      {
      
        name: name,
        email: email
      });
        alert("Employee Registation Successfully");
        setName("");
        setEmail("");
        Load();
      
      }
  catch(err)
      {
        alert("User Registation Failed");
      }
 }
 async function DeleteEmployee(id)
 {
     
      await axios.delete("http://127.0.0.1:8000/api/delete/" + id); 
      alert("Employee deleted Successfully");
      Load();
 
 }

 async function editEmployee(employees)
 {
  setName(employees.name);
  setEmail(employees.email);
  setId(employees.id);
  
 }

 async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://127.0.0.1:8000/api/update/"+ employees.find(u => u.id === id).id || id,
       {
         id: id,
         name: name,
         email: email
       
       });
         alert("Registation Updateddddd");
         setId("");
         setName("");
         setEmail("");
         Load();
       
       }
   catch(err)
       {
         alert("User Registation Failed");
       }
  }
  return (
    <div>
    <h1>User Details</h1>
    <div class="container mt-4" >
       <form>
           <div class="form-group">
            <input  type="text" class="form-control" id="employee_id" hidden
             value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
            />
             <label>Employee Name</label>
             <input  type="text" class="form-control" id="name" onChange={(e)=>setName(e.target.value)} value={name}
       
             />
           </div>
           <div class="form-group">
             <label>Employee Address</label>
             <input  type="text" class="form-control" id="email" 
             onChange={(e)=>setEmail(e.target.value)} value={email}
             />
           </div>

              <div>
           <button   class="btn btn-primary mt-4"  onClick={save} >Register</button>
           <button   class="btn btn-warning mt-4"  onClick={update} >Update</button>
           </div>   
         </form>
     


    <table className="table table-dark" align="center">
      <thead>
        <tr>
          <th scope="col">Employee Id</th>
          <th scope="col">Employee Name</th>
          <th scope="col">Employee Email</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      {employees.map(function fn(employee)
       {
            return(
            <tbody>
                <tr key={employee.id}>
                <th scope="row" >{employee.id} </th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                    <button type="button" class="btn btn-warning" onClick={() => editEmployee(employee)}>Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteEmployee(employee.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
    </table>

    </div>
    
    </div>
  );
}
