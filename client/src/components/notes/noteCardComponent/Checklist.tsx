import React, { useState } from 'react';
import { List, ListItem, Checkbox, Typography, Tooltip, Divider, Button, Zoom } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { ChecklistItem } from '../../../store/types';
import { Color } from '../../../data/cardColor';
import { updateChecklist } from '../../../http/notes';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../../store/notesSlice';
import { useNotification } from '../../../contexts/NotificationContext';

interface ChecklistProps {
    items: ChecklistItem[];
    color: Color;
    noteId: string;
}

const Checklist: React.FC<ChecklistProps> = ({ items, color, noteId }) => {
    const dispatch = useDispatch()
    const { addNotification } = useNotification();
    const [showAllChecked, setShowAllChecked] = useState(false);
    const [checkList, setCheckList] = useState<ChecklistItem[]>(items);
    const [loading, setLoading] = useState(false);
    const checkedItems = checkList.filter((item) => item.completed);
    const uncheckedItems = checkList.filter((item) => !item.completed);
    const visibleCheckedItems = showAllChecked ? checkedItems : checkedItems.slice(0, 2);

    const hiddenCheckedItemsCount = checkedItems.length - visibleCheckedItems.length;

    const handleShowMore = () => {
        setShowAllChecked((prev) => !prev);
    };

    const handleCheckBoxClick = async (item: ChecklistItem) => {
        if (loading) return;
        setLoading(true);
        try {
            setCheckList((prev) => {
                const updatedChecklist = prev.map((i) => {
                    if (i.id === item.id) {
                        return { ...i, completed: !i.completed };
                    }
                    return i;
                });
                return updatedChecklist;
            });
            const response = await updateChecklist(noteId, {
                id: item.id,
                text: item.text,
                completed: !item.completed,
            });
            dispatch(updateNote(response.updatedNote));
            console.log(response);
        } catch (error) {
            addNotification("Error updating checklist item", "error");
            setCheckList((prev) => {
                const updatedChecklist = prev.map((i) => {
                    if (i.id === item.id) {
                        return { ...i, completed: !i.completed };
                    }
                    return i;
                });
                return updatedChecklist;
            });
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <List sx={{ padding: 0 }}>
                {uncheckedItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{
                            padding: '0.2rem 0',
                            margin: 0,
                            alignItems: 'center',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                        }}
                    >
                        <Tooltip title="Mark as completed" arrow disableInteractive TransitionComponent={Zoom}>
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleOutlineIcon />}
                                checked={item.completed}
                                onClick={() => {
                                    handleCheckBoxClick(item)
                                }}
                                disableRipple
                                sx={{ padding: '0.1rem' }}
                            />
                        </Tooltip>
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: color.name !== "default" ? color.contentColor + (item.completed ? "90" : "e0") : "text.secondary",
                                marginLeft: '0.5rem',
                            }}
                        >
                            {item.text}
                        </Typography>
                    </ListItem>
                ))}
                {uncheckedItems.length > 0 && checkedItems.length > 0 && <Divider sx={{ my: '0.5rem' }} />}
                {visibleCheckedItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{
                            padding: '0.2rem 0',
                            margin: 0,
                            alignItems: 'center',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                        }}
                    >
                        <Tooltip title="Mark as uncomplete" arrow disableInteractive TransitionComponent={Zoom}>
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleOutlineIcon />}
                                checked={item.completed}
                                onClick={() => {
                                    handleCheckBoxClick(item)
                                }}
                                disableRipple
                                sx={{ padding: '0.1rem' }}
                            />
                        </Tooltip>
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: color.name !== "default" ? color.contentColor + (item.completed ? "90" : "e0") : "text.secondary",
                                marginLeft: '0.5rem',
                            }}
                        >
                            {item.text}
                        </Typography>
                    </ListItem>
                ))}
                {checkedItems.length > 2 && (
                    <Button
                        onClick={handleShowMore}
                        sx={{
                            textTransform: 'none',
                            marginTop: '0.5rem',
                            color: color.name !== "default" ? color.contentColor : 'text.primary',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                        }}
                        endIcon={showAllChecked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        {showAllChecked ? 'Show less' : `Show ${hiddenCheckedItemsCount} more`}
                    </Button>
                )}
            </List>
        </div>
    );
};

export default Checklist;
