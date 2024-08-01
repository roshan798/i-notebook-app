import { Box } from "@mui/material";
import AddTags from "../../addTags/AddTagsTextArea";
export interface TagsOption {
    title: string;
    inputValue?: string;
}

interface TagsFieldProps {
    tags: (TagsOption | string)[];
    setTags: React.Dispatch<React.SetStateAction<(TagsOption | string)[]>>;
    options: TagsOption[];
    setOptions: React.Dispatch<React.SetStateAction<TagsOption[]>>;
    loading: boolean;
    error: string | null;
    tagRef: React.RefObject<HTMLDivElement>;
}
const TagsField = ({ tags, setTags, options, setOptions, loading, error, tagRef }: TagsFieldProps) => (
    <Box ref={tagRef}>
        <AddTags
            tagListId="tags-standard"
            value={tags}
            setValue={setTags}
            options={options}
            setOptions={() => {
                setOptions(options)
            }}
            loading={loading}
            error={error}
        />
    </Box>
);

export default TagsField;