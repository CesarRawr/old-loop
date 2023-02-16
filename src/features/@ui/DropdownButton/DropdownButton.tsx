import React from "react";
import Button from '../button/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu, { MenuProps } from '@mui/material/Menu';

export default function DropdownButton(props: DropdownButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Open
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    // Close
    const handleClose = () => {
        setAnchorEl(null);
    };

    const listItems: JSX.Element[] = props.listItems.map((itemText: string, index: number) => (
        <MenuItem key={index} onClick={handleClose}>{ itemText }</MenuItem>
    ));
    return (
        <>
            <Button text={props.text} onClick={handleClick}/>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={(e: any) => e.stopPropagation()}>
                {
                    listItems
                }
            </Menu>
        </>
    );
}

interface DropdownButtonProps {
    text: string;
    listItems: string[];
}
