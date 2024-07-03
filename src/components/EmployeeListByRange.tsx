import { FC, useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

import { Employee } from "../types/Employee";
import EmployeeItem from "./EmployeeItem";
import { SERVER_URL, updateDateFormat } from "..";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const EmployeeListByRange: FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [from, setFrom] = useState("2010-01-01");
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // we can consider to use dayjs and MUI X date picker

    const fetchActiveEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<Employee[]>(`${SERVER_URL}/employees/hired`, {
                params: {
                    start: updateDateFormat(from),
                    end: updateDateFormat(to)
                }
            });
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
    }, [from, to]);

    const deactiveEmployee = (id: number) => {
        setEmployees(prev => prev.filter((employee: Employee) => employee.id !== id));
    }

    return (
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Typography variant="h4" alignSelf="flex-start" marginTop={2} gutterBottom>
                Active Employees by hired range
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    label="From"
                    inputProps={{
                        pattern: "d{2}-\\d{2}-\\d{4}"
                    }}
                />
                <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    label="To"
                    inputProps={{
                        pattern: "d{2}-\\d{2}-\\d{4}"
                    }}
                />
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
        </Container>
    );
};

export default EmployeeListByRange;