import React, { useEffect, useState } from 'react'

const CRUD = () => {

  const [name, setName] = useState("");
  const [phone, SetPhone] = useState("");
  let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data);
  const [edit, setEdit] = useState("");
  const [single, setSingle] = useState("");
  const [mdelete, setMdelete] = useState([]);

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

  console.log(mdelete);

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

  return (
    <div align="center" onSubmit={handleSubmit}>
      <form action="">
        <h1>ADD user</h1>
        Name:-
        <input type="text" placeholder='Name..' onChange={(e) => setName(e.target.value)} value={name || ""} />
        <br /><br />
        Phone :-
        <input type="text" placeholder='phone no..' onChange={(e) => SetPhone(e.target.value)} value={phone || ""} />
        <br /><br />
        {
          edit ? (
            <input type="submit" value="Edit" />
          ) : (
            <input type="submit" />
          )
        }
      </form>
      <br />
      {/* view record in table */}
      <table border={1} cellPadding={3} cellSpacing={1}>
        <thead><tr>
          <th>Id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Action</th>
          <th style={{ width: 100 }}>
            <button onClick={() => multipleDelete()} style={{ width: 100 }}>Delete</button>
          </th>
        </tr>
        </thead>

        <tbody>
          {

            record.map((value, i) => {
              const { id, name, phone, status } = value;
              return (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{phone}</td>

                  <td>
                    {
                      status === "deactivate" ? (
                        <button onClick={() => handleStatus(id, status)} style={{ color: 'white', backgroundColor: 'red', border: 0, padding: 4, cursor: 'pointer' }}>{status}</button>

                      ) : (
                        <button onClick={() => handleStatus(id, status)} style={{ color: 'white', backgroundColor: 'green', border: 0, padding: 4 }}>{status}</button>
                      )
                    }</td>
                  <td>
                    <button onClick={() => deleteUser(id)}>Delete</button>
                    <button onClick={() => editUser(id)}>Edit</button>
                  </td>

                  <td>
                    <input type="checkbox" onChange={(e) => changeDelete(id, e.target.checked)} style={{ width: 100 }} />
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
