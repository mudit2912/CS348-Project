import React, { useState } from 'react';

import { getUsers } from '../../apicalls/WrappedCalls';

import { Link } from 'react-router-dom';

const Search = () => {
  const [users, setUsers] = useState(null);

  const getLifts = async (username) => {
    if (username === '') {
      setUsers(null);

      return;
    }

    const response = await getUsers(username);

    setUsers(response.data.lifts);
  };

  return (
    <div className='leaderboard cont'>
      <h1 className='leaderboard title'>Search Username</h1>
      <div className='leaderboard indiv'>
        <h2 className='leaderboard in label'>Enter username below:</h2>
        <input
          className='leaderboard input'
          type='text'
          placeholder=''
          onChange={(event) => getLifts(event.target.value)}
        />
      </div>
      <div className='leaderboard indiv'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {users !== null && users !== undefined
            ? users.map(({ id, username, pfp_url }) => {
                return (
                  <div
                    key={id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}
                  >
                    <img
                      src={pfp_url}
                      alt={username}
                      width='100'
                      height='100'
                    />
                    <Link to={`/u/${username}`}>
                      <span style={{ marginLeft: 10 }}>{username}</span>
                    </Link>
                  </div>
                );
              })
            : 'Search for a User!'}
        </div>
      </div>
    </div>
  );
};

export default Search;
