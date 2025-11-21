import { useState } from "react";
import Login from "./Login";
import Employees from "./Employees";
import Teams from "./Teams";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" && <Login setPage={setPage} />}
      {page === "employees" && <Employees setPage={setPage} />}
      {page === "teams" && <Teams setPage={setPage} />}
    </div>
  );
}
