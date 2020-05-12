import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { signOutStart } from '../../../redux/user/user.actions';

import {ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,useStyles} from'./styles.js';

 function DrawerContent({active, history, signOutStart, navigation}) {
    const classes  = useStyles()

    const handleClick = (path, isExpand) => {
		if (!isExpand) {
			history.push(path);
		}
		
	};
    
    return (
        <div>
        <div className={classes.toolbar} >
            <div className={ classes.logo}>
            ocha
            </div>
        </div>
        <Divider />
        <List className={classes.list}>
            {navigation.map(({ text, path, icon, isExpandable, childIcon }, index) => (
                <ListItem button key={text} onClick={() => handleClick(path, isExpandable)}>
                    
                    {!isExpandable ? <>
                        <span className={active === text ? classes.isActive : ''}>{icon}</span>
                        <ListItemText primary={text} className={classes.leftMarginSmall}/>
                    </> : <ExpansionPanel >
                            
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon className={classes.icon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >	
                                <span >{icon}</span>
                                <div ><ListItemText primary={text} className={classes.leftMarginSmall}/></div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <List >
                                {childIcon.map(({text,icon,path}) => (
                                    <div key={text}>
                                    
                                        <ListItem button key={text} onClick={() => handleClick(path)}>
                                        <span className={active === text ? classes.isActive : ''}>{icon}</span>
                                            <ListItemText primary={text} className={classes.leftMarginSmall}/>
                                        </ListItem>
                                    
                                    </div>
                                ))}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    }

                </ListItem>
            ))}
            <div className={classes.button}> 
                <Button variant="contained" size="small"  onClick={signOutStart}>Log out</Button>	
            </div>
        </List>
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})

DrawerContent.propTypes = {
    active: PropTypes.string
}
export default withRouter(connect(null,mapDispatchToProps)(DrawerContent));