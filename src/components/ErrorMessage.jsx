import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

function ErrorMessage({ message }) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  )
}

export default ErrorMessage