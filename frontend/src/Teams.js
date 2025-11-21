    import { useEffect, useState } from "react";
import API from "./api";

export default function Teams({ setPage }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await API.get("/teams");
    setList(res.data);
  }

  async function add(e) {
    e.preventDefault();
    await API.post("/teams", { name });
    load();
  }

  useEffect(() => { load() }, []);

  return (
    <div>
      <h2>Teams</h2>

      {list.map(t => <div key={t.id}>{t.name}</div>)}

      <form onSubmit={add}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Team Name" />
        <button>Add</button>
      </form>

      <button onClick={() => setPage("employees")}>Back to Employees</button>
    </div>
  );
}
