import React, { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [backendData, setBackendData] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [openRepo, setOpenrepo] = useState<any[]>([]);

  const filterLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const clickedLanguage: HTMLButtonElement = event.currentTarget;
    const filteredArr: any[] = displayData.filter(
      (item) => item.language === clickedLanguage.name
    );
    setDisplayData(filteredArr);
  };

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
        setDisplayData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log('???');
      });
  }, []);

  return (
    <div className="container">
      <button
        onClick={() => {
          setDisplayData(backendData);
          setOpenrepo([]);
        }}
        className="resetBtn"
      >
        Reset Data
      </button>
      {displayData.length > 0 &&
        openRepo.length === 0 &&
        // eslint-disable-next-line array-callback-return
        displayData.map((item) => {
          return (
            <div key={item.name + item.id} className="listStructure">
              <div onClick={() => setOpenrepo([item])} className="itemName">
                {item.name}
              </div>
              <div className="itemDetail">
                <div className="singleItem">
                  <b>Language:</b>
                  <button
                    onClick={filterLanguage}
                    className="languageBtn"
                    name={item.language}
                  >
                    {item.language}
                  </button>
                </div>
                <div className="singleItem">
                  <b>Description:</b> {item.description}
                </div>
                <div className="singleItem">
                  <b>Forks_count:</b> {item.forks_count}
                </div>
              </div>
            </div>
          );
        })}
      {displayData.length === 0 && openRepo.length === 0 && (
        <div>Loading...</div>
      )}
      {openRepo.length > 0 && (
        <div className="repoDetail">
          Latest Update: {openRepo[0].updated_at.split('T')[0]}
        </div>
      )}
    </div>
  );
}
