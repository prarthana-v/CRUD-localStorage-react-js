import React, { useEffect, useState } from 'react'
import './style.css'

const CRUD = () => {

  const [name, setName] = useState("");
  const [phone, SetPhone] = useState("");
  let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data);
  const [edit, setEdit] = useState("");
  const [single, setSingle] = useState("");
  const [mdelete, setMdelete] = useState([]);
  const [mstatus, setmStatus] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone) {
      alert("Please fill all the fields");
      return false;
    }

    let obj = {
      id: Date.now(),
      name, phone,
      status: "deactivate",
    };

    let newObj = [...record, obj];
    localStorage.setItem("users", JSON.stringify(newObj))
    setRecord(newObj);
    setName("");
    SetPhone("");
  }

  const deleteUser = (id) => {
    let finalUsers = record.filter((value) => {
      return value.id !== id
    })
    localStorage.setItem("users", JSON.stringify(finalUsers));
    setRecord(finalUsers)
    alert("Want to delete the user?")
  }

  const editUser = (id) => {
    const s = record.find((val) => val.id == id);
    setEdit(s.id);
    setSingle(s);
  }
  useEffect(() => {
    setName(single.name);
    SetPhone(single.phone);
  }, [single])

  const handleStatus = (id, status) => {
    if (status == "deactivate") {
      let updateStatus = record.map((val) => {
        if (val.id === id) {
          val.status = "activate"
        }
        return val
      })
      localStorage.setItem("users", JSON.stringify(updateStatus))
      setRecord(updateStatus);
      alert("status changed")
    }
    else {
      let updateStatus = record.map((val) => {
        if (val.id === id) {
          val.status = "deactivate"
        }
        return val;
      })
      localStorage.setItem("users", JSON.stringify(updateStatus))
      setRecord(updateStatus);
      alert("status changed")
    }

  }

  const changeDelete = (id, checked) => {
    let checkedId = [...mdelete];

    if (checked) {
      checkedId.push(id);
    }
    else {
      checkedId = checkedId.filter(val => val != id);
    }
    setMdelete(checkedId);
  }

  // console.log(mdelete);

  const multipleDelete = () => {

    // console.log(mdelete);

    if (mdelete.length > 0) {
      let deleteId = record.filter(val => !mdelete.includes(val.id));
      localStorage.setItem('users', JSON.stringify(deleteId));
      setRecord(deleteId);
    }
    else {
      alert("please select atleast one record");
      return false;
    }
  }

  const handleChangeStatus = (id, checked) => {
    const changeStatus = [...mstatus];

    if (checked) {
      changeStatus.push(id);
    }
    else {
      changeStatus = changeStatus.filter(val => val != id);
    }
    setmStatus(changeStatus);
  }
  return (
    <div align="center" onSubmit={handleSubmit}>
      <form action="" >
        <h1 className='py-2 bg-dark text-white mb-5'>Form</h1>
        <span className='fw-bold pe-3'>Name:-</span>
        <input className='ps-2 py-1 w-25' type="text" placeholder='Name..' onChange={(e) => setName(e.target.value)} value={name || ""} />
        <br /><br />

        <span className='fw-bold pe-3'>
          Phone :-
        </span>
        <input type="text" className='ps-2 py-1 w-25' placeholder='Phone no..' onChange={(e) => SetPhone(e.target.value)} value={phone || ""} />
        <br /><br />
        {
          edit ? (
            <input className='btn btn-light' type="submit" value="Edit" />
          ) : (
            <input className='btn btn-light' type="submit" />
          )
        }
      </form>

      <br />
      {/* view record in table */}
      <table className='table  table-secondary table-striped table-border' border={1} cellPadding={3} cellSpacing={1}>
        <thead><tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col" className='ps-4'>Status</th>
          <th scope="col" className='ps-5'>Action</th>
          <th scope="col" style={{ width: 100 }}>
            <button className='btn btn-light' onClick={() => multipleDelete()} style={{ width: 100 }}>Delete</button>
          </th>
          <th scope="col">
            <button className='btn btn-light'>Edit Status</button>
          </th>
        </tr>
        </thead>

        <tbody>
          {

            record.map((value, i) => {
              const { id, name, phone, status } = value;
              return (
                <tr key={i}>
                  <td scope='col' >{++i}</td>
                  <td scope='col' >{name}</td>
                  <td scope='col' >{phone}</td>

                  <td scope='col' >
                    {
                      status === "deactivate" ? (
                        <button onClick={() => handleStatus(id, status)} className='btn btn-secondary' >{status}</button>

                      ) : (
                        <button onClick={() => handleStatus(id, status)} className='btn btn-success'>{status}</button>
                      )
                    }</td>
                  <td scope='col' className=''>
                    <button className='btn btn-danger me-2' onClick={() => deleteUser(id)}>Delete</button>
                    <button className='btn btn-primary' onClick={() => editUser(id)}>Edit</button>
                  </td>

                  <td scope='col' >
                    <input type="checkbox" onChange={(e) => changeDelete(id, e.target.checked)} style={{ width: 100 }} />
                  </td>
                  <td scope='col' className='ps-5'>
                    <input type="checkbox" className='' onChange={(e) => handleChangeStatus(id, e.target.checked)} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default CRUD
