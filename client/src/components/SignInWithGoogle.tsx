import { Google } from '@mui/icons-material'
import { Divider, Button } from '@mui/material'

export default function SignInWithGoogle() {
    return (
        <>
            <Divider
                sx={{
                    fontSize: '0.8rem',
                    color: 'GrayText',
                    userSelect: 'none',
                }}>
                OR
            </Divider>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<Google />}
                disabled
                sx={{
                    marginTop: 2,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                Sign in with Google
            </Button>
        </>
    )
}
