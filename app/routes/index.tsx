import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import RiSearchLine from 'remixicon-react/SearchLineIcon';
import { request, gql } from 'graphql-request'
import React, { useState } from 'react';

import MoviesGrid from './../components/Movies';
import { maskOn, maskOff } from './../components/SpinnerMask';

export default function Index() {


  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');


  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') onSearch();
  }

  const onSearchChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    if (!searchValue || searchValue.length == 0) return;
    maskOn();
    const query = gql`
      {
        searchMovies(query: "`+ searchValue + `") {
          id
          name
          score
          releaseDate
          genres {
            name
          }
        }
      }
    `;
    request('https://tmdb.sandbox.zoosh.ie/dev/grphql', query).then((data) => { setData(data); maskOff(); })
  };

  return (
    <div className='Main scroll'>
      <TextField className="searchInput" size="small" variant="outlined" onChange={onSearchChange} onKeyPress={handleKeyDown} value={searchValue} InputProps={{
        endAdornment: (
          <InputAdornment className='pointer' position="end">
            <RiSearchLine onClick={onSearch} />
          </InputAdornment>
        ),
      }} />
      <MoviesGrid rawData={data} />
    </div>
  );
}
