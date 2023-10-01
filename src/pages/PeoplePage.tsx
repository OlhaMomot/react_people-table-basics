import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState([] as Person[]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getCurrentPeople = async () => {
    setIsLoading(true);
    try {
      const currentPeople = await getPeople();

      setPeople(currentPeople);
    } catch {
      setErrorMessage('Something went wrong');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !errorMessage && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleTable people={people} />
          )}

        </div>
      </div>
    </>
  );
};
