import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets,
    {
      staleTime: 0,
      cacheTime: 10,
    }
  );
  console.log(resolvedData);

  return (
    <div>
      <h1>Planets</h1>

      {status === "loading" && <div>Loading</div>}
      {status === "error" && <div>Error Fetching data</div>}
      {status === "success" && (
        <>
          <div className="dos">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span>{page}</span>
            <button
              onClick={() =>
                setPage((old) =>
                  !latestData || !latestData.next ? old : old + 1
                )
              }
              disabled={!latestData || !latestData.next}
            >
              Next Page
            </button>
            <div className="grid">
              {resolvedData.results.map((planet) => (
                <Planet key={planet.name} planet={planet} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
