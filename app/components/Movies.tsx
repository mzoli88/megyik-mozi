import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Axios from 'axios';
import { maskOn, maskOff } from './../components/SpinnerMask';

export default function BasicTable(rawData: any) {
  var gridComponent;

  function Row(row: any) {
    row.releaseDate = row.releaseDate || '';
    const [open, setOpen] = useState(false);
    const [openHtml, setOpenHtml] = useState('');
    const [wikiId, setWikiId] = useState('');
    const year = row.releaseDate.split('-').shift();
    const onMovieClick = (name: string, year: string) => {
      if (open) {
        setOpen(false);
        return;
      }
      maskOn();
      Axios.get(
        "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch="
        + encodeURIComponent(name + " " + year + " film")
      ).then(function (response) {
        // console.log(response.data);
        if (response.data && response.data.query && response.data.query.search) {
          let data = response.data.query.search.shift();
          // console.log(data);
          setOpenHtml(data.snippet);
          setWikiId(data.pageid);
          setOpen(!open);
        }
        maskOff();
      }).catch(function (error) {
        maskOff();
        setOpen(!open);
      })
    }

    return (<TableRow
      key={'rowID_' + row.id}
    >
      <TableCell component="th" scope="row">
        {open ? <span>&#9650;</span> : <span>&#9660;</span>}
        <span className='movieRowButton pointer' onClick={() => onMovieClick(row.name, year)}>{row.name}</span>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <p>
            <a target="_blank" href={"https://en.wikipedia.org/?curid=" + wikiId}>wikipedia</a>
          </p>
          <p className='MovieRowData' dangerouslySetInnerHTML={{ __html: openHtml }} />
        </Collapse>
      </TableCell>
      <TableCell align="right">{row.score.toFixed(1)}</TableCell>
      <TableCell align="right">{year}</TableCell>
      <TableCell align="left">{year}</TableCell>
    </TableRow>)
  }
  if (rawData.rawData.searchMovies) {
    gridComponent =
      <TableContainer className="moviesTable" component={Paper}>
        <Table aria-label="Movies">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Release year</TableCell>
              <TableCell align="left">Categorys</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rawData.rawData.searchMovies.map((row: { id: Number, name: string, score: Number, releaseDate: string, genres: Array<Object> }) => Row(row))}
          </TableBody>
        </Table>
      </TableContainer>
      ;
  }

  return (
    <div className='MainMoviesTable'>
      {gridComponent}
    </div>
  );
}