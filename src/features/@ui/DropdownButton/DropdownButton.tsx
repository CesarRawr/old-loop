import {useState, MouseEvent} from "react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {Button} from '@ui/index';
import type {DropdownButtonProps} from '@models/interfaces';

export default function DropdownButton(props: DropdownButtonProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

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
