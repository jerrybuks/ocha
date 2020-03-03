import React from 'react'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import './Home.css'
import { Button } from '@material-ui/core';

const Home = withRouter(props => <HomeContainer {...props}/>)

const useStyles = makeStyles(theme => ({
    root: {
        color: 'white',
        margin: theme.spacing(3),
        border: "1px solid #ffffff"
    },
    margin: {
     
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

function HomeContainer(props) {
    const classes = useStyles();
    const handleAuth = (value) =>{
        props.history.push({pathname:`/signInOrUp`, state : value})
    }
    return (
        <div>
            <header className="header">
                <div className="header-container">
                    <div className="header-container--left">
                       Stop disposing/managing waste the wrong way. Manage Waste the right way.
                    </div>
                    <div>
                      <Button variant="outlined"  size="large" className={classes.root} onClick={()=>handleAuth("signin")}>sign in</Button>
                        <Button variant="contained" size="large"  onClick={()=>handleAuth("signup")}>sign up</Button>
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default Home