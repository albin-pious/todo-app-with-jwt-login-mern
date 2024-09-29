import { createTask } from "@/services/api/api";
import { Task } from "@/typescript/TodoTypes";
import { Box, Container, FormControl, Paper, TextField, Typography, Slider, Button } from "@mui/material";
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
    
    const handleAddTask = async()=> {
        try {
            const newTaskItem: Task = {
                name: taskName,
                description: taskDescription,
                status: taskStatus,
                date: taskDate,
                time: taskTime,
                completed: taskCompleted,
                priority: taskPriority,
            }
            const createdTask = await createTask(newTaskItem);
            if(createdTask){
                setTasks([...tasks, newTaskItem]);
                setTaskName('');
                setTaskDescription('')
                setTaskStatus('pending');
                setTaskDate(null);
                setTaskTime(null);
                setTaskCompleted(false);
                setTaskPriority('medium');
            }
        } catch (error) {
            
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

    const handlePriorityChange = (event: Event, newValue: number | number[]) => {
        const priorityValue = newValue as number;
        if (priorityValue === 0) {
            setTaskPriority('low');
        } else if (priorityValue === 50) {
            setTaskPriority('medium');
        } else if (priorityValue === 100) {
            setTaskPriority('high');
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
                            <Paper sx={{ p:3, mb:2 }}>
                                <Box sx={{ mb:2 }}>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <Typography gutterBottom>Prioriy</Typography>
                                        <Slider
                                            value={
                                                taskPriority === 'low' 
                                                ? 
                                                    0 
                                                : 
                                                    taskPriority === 'medium'
                                                ?   
                                                    50
                                                :
                                                    100
                                            }
                                            onChange={handlePriorityChange}
                                            step={50}
                                            marks={[
                                                { value: 0, label: 'Low'},
                                                { value: 50, label: 'Medium'},
                                                { value: 100, label: 'High'}
                                            ]}
                                            min={0}
                                            max={100}
                                            valueLabelDisplay='off'
                                            sx={{
                                                color: getPriorityColor(taskPriority),
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor: getPriorityColor(taskPriority),
                                                },
                                                '& .MuiSlider-track': {
                                                    backgroundColor: getPriorityColor(taskPriority),
                                                },
                                                '& .MuiSlider-rail': {
                                                    color: getPriorityColor(taskPriority),
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                            </Paper>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                            disabled={!taskName || !taskDate}
                        >
                            Create task
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </LocalizationProvider>
    )
}

export default CreateTask;

