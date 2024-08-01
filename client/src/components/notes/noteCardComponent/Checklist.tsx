import React from 'react';
import { List, ListItem, Checkbox, Typography } from '@mui/material';
import type { ChecklistItem } from '../../../store/types';

interface ChecklistProps {
    items: ChecklistItem[];
}

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
    return (
        <div>
            <List sx={{ padding: 0 }}>
                {items.map((item, index) => (
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
                        <Checkbox
                            checked={item.completed}
                            disableRipple
                            sx={{ padding: '0.1rem' }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.completed ? 'text.secondary' : 'text.primary',
                                marginLeft: '0.5rem',
                            }}
                        >
                            {item.text}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Checklist;
