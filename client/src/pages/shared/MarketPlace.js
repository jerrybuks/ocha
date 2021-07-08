import { Box, Button } from '@material-ui/core';
import React from 'react'
import SideNav from '../../components/sidebar';
import MarketPlaceItem from './MarketPlaceItems';
import Battery from "../../assets/battery.jpg";
import Metal from "../../assets/metal.jpg";

export default function CheckRecyclability() {
    const item1 = {
        sellerName: "Ndukwu chukwuma",
        imgSrc: Metal,
        itemName: "steel metal",
        date: "12th june 2021",
        // ItemText: "Ndukwu chukwuma",
        phoneNo: "07052317489"
    }

    const item2 = {
        sellerName: "Chibuokem Jerry",
        imgSrc: Battery,
        itemName: "car battery",
        date: "4th july 2021",
        // ItemText: "Ndukwu chukwuma",
        phoneNo: "08156717434"
    }
    return (
        <div>
            <SideNav activeNav="Marketplace">
                <Box mb="2rem">
                    <Button variant="outlined" color="primary">Upload Item</Button>
                </Box>
                {/* <Box display="grid" gr>
                {new Array(50).fill(0).map(() =>  <MarketPlaceItem />)}
                </Box> */}
                <Box display="flex" with="48rem" justifyContent="space-between">
                    <MarketPlaceItem sellerDetails={item1} />
                    <MarketPlaceItem sellerDetails={item2} />
                </Box>
            </SideNav>
        </div>
    )
}
