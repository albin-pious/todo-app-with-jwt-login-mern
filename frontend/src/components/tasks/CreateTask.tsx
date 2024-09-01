import { Task } from "@/typescript/TodoTypes";
import { Box, Container, FormControl, Paper, TextField, Typography, InputLabel, MenuItem, Select, } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from "dayjs";
import { FC, useState } from "react";

const CreateTask: FC = ()=>{
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskStatus, setTaskStatus] = useState<'pending' | 'completed' | 'on-hold'>('pending');
    const [taskDate, setTaskDate] = useState<Dayjs | null>(null);
    const [taskTime, setTaskTime] = useState<Dayjs | null>(null);
    const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
    const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
    
    const handleAddTask = ()=> {
        if(taskName.trim() !== ''){
            const newTaskItem: Task = {
                name: taskName,
                description: taskDescription,
                status: taskStatus,
                date: taskDate,
                time: taskTime,
                completed: taskCompleted,
                priority: taskPriority,
            }
            setTasks([...tasks, newTaskItem]);
            setTaskName('');
            setTaskDescription('')
            setTaskStatus('pending');
            setTaskDate(null);
            setTaskTime(null);
            setTaskCompleted(false);
            setTaskPriority('medium');
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "error.main";
            case "medium":
                return "warning.main";
            case "low":
                return "success.main";
            default:
                return "text.primary";
        }
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="sm">
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Create Task
                    </Typography>
                    <Paper sx={{ p:3, mb:2 }}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label='Task Name'
                                variant="outlined"
                                fullWidth
                                value={taskName}
                                onChange={(e)=> setTaskName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label='Task Description'
                                variant="outlined"
                                fullWidth
                                value={taskDescription}
                                onChange={(e)=> setTaskDescription(e.target.value)}
                                sx={{ mb: 2 }}
                                multiline
                                rows={4}
                            />
                            <FormControl fullWidth sx={{ mb: 2}}>
                                <DatePicker
                                    label="Task Date"
                                    value={taskDate}
                                    onChange={(date) => setTaskDate(date)}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2}}>
                                <TimePicker
                                    label="Task Time"
                                    value={taskTime}
                                    onChange={newValue=> setTaskTime(newValue)}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="priority-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-label"
                                    value={taskPriority}
                                    label="Priority"
                                    onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </LocalizationProvider>
    )
}

export default CreateTask;

