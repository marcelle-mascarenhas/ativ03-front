import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [page, setPage] = useState(0);
  const [breweries, setBreweries] = useState([]);
  const fetchBreweries = (newPage = 3) =>
  axios.get("https://api.openbrewerydb.org/breweries?page=" + newPage).then((res) => setBreweries(res.data))


  const { isLoading, isError, error, isFetching, } = useQuery(
    ["breweries", page],
    () => fetchBreweries(page),

  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {breweries.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}

      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Página anterior
      </button>{" "}
      <button
       onClick={() => setPage((old) => Math.max(old +1, 0))}
       disabled={page === 3}
      >
        Próxima página
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}

  export default App;
