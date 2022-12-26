import * as React from "react";
import { Menu, Button, MenuItem, Divider, Stack} from "@mui/material";

const GdbMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const menuNameStr = props.children + '_name' ; 
    return (
        <div>
            <Button
                id={menuNameStr} 
                aria-controls={open ? 'basic-menu' : undefined} 
                aria-haspopup='true' 
                aria-expanded={open ? 'true' : undefined} 
                onClick={handleClick}
            >
            {props.children}
            </Button>
            <Menu
                id="basic-menu" 
                anchorEl={anchorEl} 
                open={open} 
                onClose={handleClose} 
                MenuListProps={{
                    'aria-labelledby': {menuNameStr}
                }}
            >
            {props.menuitems.map(item => <MenuItem key={item} onClick={handleClose}>{item}</MenuItem>)}
            </Menu>
        </div>
    );
}

const GdbMenuPanel = () => {
    const menuStrs = [
        {
            name: "File",
            items: ["Add Glb", "Remove All"]
        },
        {
            name: "Viewport",
            items: ["Show grid", "Shdow bounds", "Vizmode", "Camera", "Capture"]
        },
        {
            name: "View",
            items: ["Show Inspector", "Show hierarchy", "Show viewport", "Show logger", "Show stats", "Show viewport settings"]
        },
        {
            name: "Help",
            items: ["About"]
        }
    ]

    return (
        <div>
        <Stack 
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />} 
            spacing={2}>
        {menuStrs.map(menu => <div><GdbMenu key={menu.name} menuitems={menu.items}>{menu.name}</GdbMenu></div>)}
        </Stack>
        </div>
    );
}

export default GdbMenuPanel;

