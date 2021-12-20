import React from  'react';
import { useState } from "react";
import { setDoc,getDoc,doc } from "firebase/firestore"; 
import firebaseConfig from "./Firebase.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';
import Load from './loding';
toast.configure()


function App() {
  const [amount, setamount] =useState('');
  const [totalamount, settotalamount] =useState('');
  const [udhaya, setudhaya] =useState('');
  const [mom, setmom] =useState('');
  const [source, setsource] =useState('');
  const [ loading, setLoading ] = useState(false);
  const db= firebaseConfig.firestore();
  const today = new Date();
  const time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  const date = ''+today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
  const unique_id = uuid();
  get();
  async function add(){
    get();
    console.log(source)
    if(amount.length===0){
      toast.warning("Invalid Input");
    }else{
      try {   
        setLoading(true);
        const docRef = await setDoc(doc(db, "Petrol","Data",date,unique_id), {
          data:{
            "Amount":  amount,
            "Source": source,
            "Time":time ,
            "Date"  :date
          }
                
        });
        toast.success("Done");
        setamount("");
        setsource("");
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }setLoading(false);
      try {   
        if(source==="Udhaya"){
          setLoading(true);
        const docRef = await setDoc(doc(db, "Petrol","Udhaya"), {
          data:{
            "Udhaya": parseInt(udhaya)+parseInt(amount)
          }    
        });
        const docRef1 = await setDoc(doc(db, "Petrol","Total"), {
          data:{
            "TotalAmount": parseInt(totalamount)+parseInt(amount)
          }    
        });
        toast.success("Total Updated");
        console.log("Document written with ID: ", docRef,docRef1);
        }else if(source==="Mom"){
          setLoading(true);
        const docRef = await setDoc(doc(db, "Petrol","Mom"), {
          data:{
            "Mom": parseInt(mom)+parseInt(amount)
          }    
        });
        const docRef1 = await setDoc(doc(db, "Petrol","Total"), {
          data:{
            "TotalAmount": parseInt(totalamount)+parseInt(amount)
          }    
        });
        toast.success("Total Updated");
        console.log("Document written with ID: ", docRef,docRef1);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }setLoading(false);get();
    }

  }
  async function get(){
    const docRef = doc(db,"Petrol", "Total");
    const docRef1 = doc(db,"Petrol", "Udhaya");
    const docRef2 = doc(db,"Petrol", "Mom");
    const docSnap = await getDoc(docRef);
    const docSnap1 = await getDoc(docRef1);
    const docSnap2 = await getDoc(docRef2);
    const data =  docSnap.data();
    const data1 =  docSnap1.data();
    const data2 =  docSnap2.data();
    
    if (docSnap.exists()) {
      settotalamount(data.data.TotalAmount);
      setudhaya(data1.data.Udhaya);
      setmom(data2.data.Mom);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className="App">
      {loading ? <Load></Load>:<><div className="continer-sm  shadow " style={{ width: "23rem", borderRadius: "12px" }}>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Petrol</h5>
            <p class="card-text">Fill all fields.</p>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Amount</label>
              <input type="number" class="form-control" placeholder="RS" value={amount} onInput={e => setamount(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Source</label>
              <select class="form-select" aria-label="Default select example" value={source} onInput={e => setsource(e.target.value)}>
                <option defaultValue={null}>Who's Amount</option>
                <option value="Udhaya">Udhaya</option>
                <option value="Mom">Mom</option>
              </select>
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button" onClick={add}>Submit</button>
            </div>
          </div>
        </div>
      </div><div className="continer-sm  shadow " style={{ width: "23rem", borderRadius: "12px" }}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Dashboard</h5>
              <h6>Total Amount Spent :{totalamount}</h6>
              <h6>Udhaya Spent :{udhaya}</h6>
              <h6>Mom Spent :{mom}</h6>
              <button class="btn btn-outline-secondary" type="button" onClick={get}>Refresh</button>

            </div>
          </div>
        </div></>}
      
      
    </div>
  );
}

export default App;
