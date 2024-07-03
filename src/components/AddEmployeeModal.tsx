import { FC, useState } from "react";
import { Employee } from "../types/Employee";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { SERVER_URL, updateDateFormat } from "..";
import CircularProgress from "@mui/material/CircularProgress";

interface AddEmployeeModalProps {
    open: boolean;
    onAdd: () => void;
    onClose: () => void;
    employees: Employee[];
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 2
};

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({ open, onAdd, onClose, employees }) => {
    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        name: "",
        position: "",
        hireDate: "",
        active: true,
        directReports: [],
        manager: 0
    });
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState("");

    const addEmployee = async () => {
        setInProgress(true);
        try {
            if (!employee.name) {
                setError("Name should be added");
                return;
            }
            if (!employee.position) {
                setError("Position should be added");
                return;
            }
            if (!employee.hireDate) {
                setError("HireDate should be added");
                return;
            }
            if (!employee.id) {
                setError("ID should be added and should not be 0");
                return;
            }
            let data = { ...employee, hireDate: updateDateFormat(employee.hireDate) };
            const response = await axios.post(`${SERVER_URL}/employees/add`, data);
            if (response.status === 200 && onAdd) {
                onAdd();
            } else {
                setError(response.statusText);
            }
        } catch (error) {
            setError((error as any).response?.data?.message);
        } finally {
            setInProgress(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom>
                    Add New Employee
                </Typography>
                {error && <Alert severity="error">Error: {error}</Alert>}
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="ID"
                    value={employee.id}
                    onChange={(e) => setEmployee({ ...employee, id: parseInt(e.target.value) })}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Name"
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Position"
                    value={employee.position}
                    onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Hire Date"
                    value={employee.hireDate}
                    type="date"

                    onChange={(e) => setEmployee({ ...employee, hireDate: e.target.value })}
                />
                <Select
                    value={employee.manager}
                    onChange={(e) => setEmployee({ ...employee, manager: parseInt(e.target.value.toString()) })}
                >
                    <MenuItem value={0}>None</MenuItem>
                    {employees.map((employ, index) => (
                        <MenuItem key={index} value={employ.id}>
                            {employ.name}({employ.position})
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ flex: 1, display: "flex", alignItems: "center" }}
                        onClick={addEmployee}
                        disabled={inProgress}
                    >
                        {inProgress ? <CircularProgress size={20} /> : ""} Add Employee
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ flex: 1 }} onClick={onClose} disabled={inProgress}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;