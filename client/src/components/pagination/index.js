
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
export default function Pagination({hasNextPage, hasPrevPage, getNextPage, getPrevPage, curPage, totalNumOfPages}) {
    const classes = useStyles1();
  
    return (
      <Box display="flex" justifyContent="center" className={classes.root}>
        <Box display="flex" alignItems="center">{curPage} of {totalNumOfPages}</Box>
        <IconButton onClick={getPrevPage} disabled={!hasPrevPage} aria-label="previous page">
           <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={ getNextPage}
          disabled={!hasNextPage}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  }
  
  Pagination.propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
    getNextPage: PropTypes.func.isRequired,
    getPrevPage: PropTypes.func.isRequired,
    curPage: PropTypes.number.isRequired,
    totalNumOfPages: PropTypes.number.isRequired
  };