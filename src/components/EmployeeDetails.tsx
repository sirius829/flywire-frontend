import { FC, useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import axios from "axios";
import { SERVER_URL } from "..";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useParams } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";

const EmployeeDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get<Employee>(`${SERVER_URL}/employees/${id}`);
                if (response.status === 200) {
                    setEmployee(response.data);
                    setError("");
                } else {
                    setError(response.statusText);
                    setEmployee(null);
                }
            } catch (error) {
                setError((error as Error).message);
                setEmployee(null);
            }
        };
        fetchEmployeeDetails();
    }, [id]);


    return (
        <Container sx={{ textAlign: "left" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ marginTop: 4 }} gutterBottom>
                    Employee Details
                </Typography>
                <Button onClick={() => navigate("/")} variant="text">
                    <ArrowBackIcon />
                    Go back to List
                </Button>
            </Box>
            {error && <Alert severity="error">Error: {error}</Alert>}
            {employee && (
                <>
                    <Avatar alt={employee.name} src={`https://i.pravatar.cc/150?u=${employee.id}`} />
                    <Typography variant="h5">name: {employee.name}</Typography>
                    <p>Position: {employee.position}</p>
                    <p>Hire Date: {employee.hireDate}</p>
                    <Typography variant="h6">Direct Hires:</Typography>
                    <List>
                        {employee.directHires?.map((hire) => (
                            <ListItem key={hire.id}>
                                <ListItemButton onClick={() => navigate(`/employee/${hire.id}`)}>
                                    <ListItemAvatar>
                                        <Avatar alt={hire.name} src={`https://i.pravatar.cc/150?u=${hire.id}`} />
                                    </ListItemAvatar>
                                    <ListItemText primary={hire.name} secondary={hire.position} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Container>
    )
};

export default EmployeeDetails;