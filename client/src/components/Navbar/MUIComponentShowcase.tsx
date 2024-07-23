import {
    Button,
    Typography,
    TextField,
    Checkbox,
    Switch,
    Radio,
    FormControlLabel,
    FormGroup,
    RadioGroup,
    Select,
    MenuItem,
    Slider,
    Paper,
    Card,
    CardContent,
    CardActions,
    IconButton,
} from '@mui/material'
import { Container, Grid } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'

const MUIComponentShowcase = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Material UI Components Showcase
            </Typography>

            <Typography variant="h4" gutterBottom>
                Buttons
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="contained">Contained</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Outlined</Button>
                </Grid>
                <Grid item>
                    <Button variant="text">Text</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Primary
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success">
                        Success
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="warning">
                        Warning
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="error">
                        Error
                    </Button>
                </Grid>
                <Grid item>
                    <IconButton color="primary">
                        <Add />
                    </IconButton>
                    <IconButton color="secondary">
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>
                Text Fields
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Standard" variant="standard" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Outlined" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Filled" variant="filled" fullWidth />
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>
                Form Controls
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Checkbox"
                        />
                        <FormControlLabel control={<Switch />} label="Switch" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RadioGroup>
                        <FormControlLabel control={<Radio />} label="Radio 1" />
                        <FormControlLabel control={<Radio />} label="Radio 2" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select fullWidth defaultValue="">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Slider defaultValue={30} aria-label="Slider" />
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>
                Paper & Cards
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">Paper Component</Typography>
                        <Typography variant="body1">
                            This is an example of a Paper component.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Card Component</Typography>
                            <Typography variant="body1">
                                This is an example of a Card component.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Action 1</Button>
                            <Button size="small">Action 2</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MUIComponentShowcase
