import React, { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [backendData, setBackendData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/repos')
      .then((response) => response.json())
      .then((data) => {
        data.sort((i: any, j: any) => {
          if (
            new Date(i.created_at).getTime() / 1000 >
            new Date(j.created_at).getTime() / 1000
          ) {
            return 1;
          } else if (
            new Date(i.created_at).getTime() / 1000 <
            new Date(j.created_at).getTime() / 1000
          ) {
            return -1;
          } else {
            return 0;
          }
        });
        data.reverse();
        setBackendData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {backendData.length > 0 &&
        // eslint-disable-next-line array-callback-return
        backendData.map((item) => {
          return (
            <div key={item.name + item.id}>
              <div>{item.name}</div>
              <div>
                <div>{item.description}</div>
                <div>{item.language}</div>
                <div>{item.forks_count}</div>
              </div>
            </div>
          );
        })}
      {backendData.length === 0 && <div>Loading...</div>}
    </div>
  );
}
