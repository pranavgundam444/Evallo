import { useEffect, useState } from "react";
import API from "./api";

export default function Employees({ setPage }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  async function load() {
    const res = await API.get("/employees");
    setList(res.data);
  }

  async function add(e) {
    e.preventDefault();
    await API.post("/employees", { name, role });
    load();
  }

  useEffect(() => { load() }, []);

  return (
    <div>
      <h2>Employees</h2>
      {list.map(e => <div key={e.id}>{e.name} - {e.role}</div>)}

      <form onSubmit={add}>
        <input placeholder="name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="role" value={role} onChange={e=>setRole(e.target.value)} />
        <button>Add</button>
      </form>

      <button onClick={() => setPage("teams")}>Go to Teams</button>
    </div>
  );
}
