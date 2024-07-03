import { FC } from "react";
import { Employee } from "../types/Employee";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import axios from "axios";
import { SERVER_URL } from "..";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";

interface EmployeeItemProps {
    employee: Employee;
    onUserDisable: (id: number) => void;
    onDisableFail: (msg: string) => void;
}

const EmployeeItem: FC<EmployeeItemProps> = ({ employee, onUserDisable, onDisableFail }) => {
    const navigate = useNavigate();
    const disableUser = async () => {
        try {
            const response = await axios.put<Employee>(`${SERVER_URL}/employees/deactivate/${employee.id}`);
            if (response.status === 200) {
                onUserDisable(employee.id);
            } else {
                onDisableFail(`Failed to disable user: ${employee.name} (${response.statusText})`);
            }
        } catch (error) {
            if (onDisableFail) {
                onDisableFail(`Failed to disable user: ${employee.name} (${(error as Error).message})`);
            }
        }
    };

    const showEmployeeDetail = () => {
        navigate(`/employee/${employee.id}`);
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="disable" onClick={disableUser}>
                    <Tooltip title={`Deactive ${employee.name}`}>
                        <FaceRetouchingOffIcon />
                    </Tooltip>
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton onClick={showEmployeeDetail}>
                <ListItemAvatar>
                    <Avatar alt={employee.name} src={`https://i.pravatar.cc/150?u=${employee.id}`} />
                </ListItemAvatar>
                <ListItemText
                    primary={employee.name}
                    secondary={
                        <>
                            <Typography component="span" display="block" variant="body2">Position: {employee.position}</Typography>
                            <Typography component="span" display="block" variant="body2">Hire Date: {employee.hireDate}</Typography>
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    )
};

export default EmployeeItem;