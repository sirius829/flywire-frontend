import { FC, useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

import { Employee } from "../types/Employee";
import EmployeeItem from "./EmployeeItem";
import { SERVER_URL } from "..";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import AddEmployeeModal from "./AddEmployeeModal";
import CircularProgress from "@mui/material/CircularProgress";

const EmployeeList: FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchActiveEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<Employee[]>(`${SERVER_URL}/employees/active`);
            if (response.status === 200) {
                setEmployees(response.data);
            } else {
                setError(response.statusText);
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchActiveEmployees();
    }, []);

    const addEmployee = () => {
        fetchActiveEmployees();
        setIsModalOpen(false);
    }
    //assume not show deactived users here
    const deactiveEmployee = (id: number) => {
        setEmployees(prev => prev.filter((employee: Employee) => employee.id !== id));
    }

    return (
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" marginTop={2} gutterBottom>
                    Active Employees
                </Typography>
                <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
                    <Add />
                    New Employee
                </Button>
            </Box>
            {error ? <Alert severity="error">Error: {error}</Alert> : ""}
            <List dense sx={{ width: "100%", maxWidth: 500, bgColor: "background.paper" }}>
                {!isLoading ? (employees.length ?
                    employees.map((employee) => (
                        <EmployeeItem employee={employee} onUserDisable={deactiveEmployee} onDisableFail={(msg) => setError(msg)} key={`employee-${employee.id}`} />
                    ))
                    : <Typography>
                        No active employee found.
                    </Typography>
                )
                    : <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <CircularProgress size={40} />
                        Loading...
                    </Typography>
                }
            </List>
            {isModalOpen && employees && <AddEmployeeModal onAdd={addEmployee} open={isModalOpen} onClose={() => setIsModalOpen(false)} employees={employees} />}
        </Container>
    );
};

export default EmployeeList;