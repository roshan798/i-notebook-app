import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function SignInWithGoogle() {
    return (
        <>
            
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
