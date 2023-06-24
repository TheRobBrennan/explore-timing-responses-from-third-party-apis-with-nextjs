"use client";
import { useState, useEffect } from "react";

interface APIEndpoint {
  endpoint: string
}

interface APIResponse {
  endpoint: string
  responseTime: number
  httpStatusCode: number
  meta: any
}

export default function APIComparison() {
  const [results, setResults] = useState<Array<APIResponse>>([]);
  const API_REQUESTS: APIEndpoint[] = [
    { endpoint: "https://www.espn.com" },
    { endpoint: "https://www.nhl.com" }
  ]

  useEffect(() => {
    const fetchAPIResponses = async (apiEndpoints: APIEndpoint[]) => {
      const promises = apiEndpoints.map(async (url) => {
        const startTime = performance.now();

        // Simple example - let's see how long it takes each request to complete
        const res = await fetch(url.endpoint).then((res) => res);

        const endTime = performance.now();

        return {
          endpoint: url.endpoint,
          responseTime: endTime - startTime,
          httpStatusCode: res.status,
          meta: res,
        };
      });

      const apiResponses = await Promise.all(promises);
      setResults(apiResponses);
    };

    fetchAPIResponses(API_REQUESTS);
  }, []);

  return (
    <div>
      <h1>API Performance</h1>
      &nbsp;
      <p />
      <ul>
        {results.length > 0 && results.map((result, index) => (
          <li key={index}>
            Response time is {result.responseTime.toFixed(2)}ms for{" "}
            <a href={result.endpoint} target="_blank" rel="noopener noreferrer">
              {result.endpoint}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
