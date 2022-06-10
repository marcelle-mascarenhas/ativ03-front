import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { Person } from "./components/Person";

function App (){
  const [page, setPage] = useState(1);
  const fetchPeople = () =>
    axios.get("https://swapi.dev/api/people/?page=" + page).then((res) => res.data);

  const { isLoading, isError, data, error, isFetching } = useQuery(
    `people-${page}`,
    fetchPeople,
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
        {data && data.results && data.results.map((person) => (
          <Person key={person.url} data={person} />
        ))}
      </div>
      )}

      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={!data || data.previous == null}
      >
        Anterior
      </button>{" "}
      <button
       onClick={() => setPage((old) => Math.max(old +1, 0))}
       disabled={!data || data.next == null}
      >
        Próximo
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}

  export default App;