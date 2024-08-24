import { FC, useState } from "react";
import {
    TextField, Button, List, ListItem, ListItemText, Checkbox,
    IconButton, ListItemSecondaryAction, Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, Chip
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface Task {
    id: number;
    text: string;
    completed: boolean;
    priority: string;
}

const TaskPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [priority, setPriority] = useState<string>("medium");

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            const newTaskItem: Task = {
                id: Date.now(), // unique id for each task
                text: newTask,
                completed: false,
                priority: priority
            };
            setTasks([...tasks, newTaskItem]);
            setNewTask("");
            setPriority("medium"); // Reset priority to default
        }
    };

    const handleToggleComplete = (id: number) => {
        setTasks(tasks.map(task => (
            task.id === id ? { ...task, completed: !task.completed } : task
        )));
    };

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Function to get color based on priority
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

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Task Manager
                </Typography>
                <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <TextField
                        label="Add new task"
                        variant="outlined"
                        fullWidth
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <FormControl sx={{ ml: 2, minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as string)}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ ml: 2 }}>
                        Add
                    </Button>
                </Box>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.id} sx={{ textDecoration: task.completed ? 'line-through' : 'none', mb: 1 }}>
                            <Checkbox
                                edge="start"
                                checked={task.completed}
                                tabIndex={-1}
                                disableRipple
                                onChange={() => handleToggleComplete(task.id)}
                            />
                            <ListItemText primary={task.text} />
                            <Chip
                                label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                sx={{ ml: 2, bgcolor: getPriorityColor(task.priority), color: 'white' }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskPage;

