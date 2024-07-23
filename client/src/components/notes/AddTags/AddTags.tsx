import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { defaultBorderColor } from '../CreateNoteForm';

interface FilmOption {
    title: string;
    inputValue?: string;
}

interface AddTagsProps {
    tagListId: string;
    value: (FilmOption | string)[];
    setValue: (value: (FilmOption | string)[]) => void;
    options: FilmOption[];
    setOptions: (options: FilmOption[]) => void;
    loading?: boolean;
    error?: string | null;
}

export default function AddTags({ tagListId, value, setValue, options, setOptions }: AddTagsProps) {

    const handleAddTag = (_event: React.SyntheticEvent, newValue: (FilmOption | string)[]) => {
        const newOptions = newValue.filter((option) => {
            if (typeof option === 'string') {
                return !options.some((existingOption) => existingOption.title === option);
            }
            if (option.inputValue) {
                return !options.some((existingOption) => existingOption.title === option.inputValue);
            }
            return false;
        }).map((option) => {
            if (typeof option === 'string') {
                return { title: option };
            }
            if (option.inputValue) {
                return { title: option.inputValue };
            }
            return option;
        });

        setValue(newValue);
        setOptions([...options, ...newOptions]);
    };

    return (
        <Stack spacing={3} sx={{
            width: '100%',
            borderLeft: `1px solid ${defaultBorderColor}`,
            borderRight: `1px solid ${defaultBorderColor}`,
        }}>
            <Autocomplete
                size="small"
                multiple
                freeSolo
                id={tagListId}
                options={options}
                value={value}
                onChange={handleAddTag}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            {option.title}
                        </li>
                    );
                }}
                getOptionLabel={(option: FilmOption | string) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                filterOptions={(options: FilmOption[], params) => {
                    const filtered = options.filter((option) =>
                        option.title.toLowerCase().includes(params.inputValue.toLowerCase())
                    );

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Tags..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                border: 'none',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                )}
                sx={{
                    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    },
                }}
            />
        </Stack>
    );
}
