    import { Box, TextField, Typography } from "@mui/material";
    import { useState } from "react";

    export const AdditionalComments = () => {
        const [comments, setComments] = useState('');

        const handleCommentsChange = (event) => {
            setComments(event.target.value);
        };

        return (
            <Box>
                <Typography variant="h6">הוסף הערות נוספות למעצב</Typography>
                <TextField
                    label="הערות"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={comments}
                    onChange={handleCommentsChange}
                    sx={{ mt: 2 }}
                />
            </Box>
        );
    };