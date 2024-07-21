import React, { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatClearIcon from '@mui/icons-material/FormatClear';

export const Wording = ({ setWording }) => {
    const [editorHtml, setEditorHtml] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handleChange = (content) => {
        setEditorHtml(content);
        setWording(content); // Pass content to parent
    };

    const handleToggleBold = () => {
        const editor = quillRef.current.getEditor();
        const format = editor.getFormat();
        editor.format('bold', !format.bold);
        setIsBold(!format.bold);
    };

    const handleToggleHighlight = () => {
        const editor = quillRef.current.getEditor();
        const format = editor.getFormat();
        editor.format('background', format.background ? false : 'yellow');
        setIsHighlighted(!!format.background);
    };

    const handleClearFormat = () => {
        const editor = quillRef.current.getEditor();
        editor.format('bold', false);
        editor.format('background', false);
        setIsBold(false);
        setIsHighlighted(false);
    };

    const quillRef = React.useRef();

    return (
        <Box sx={{ width: '100%', minHeight: '30px', border: '1px solid #ddd', borderRadius: '4px', padding: '16px', direction: 'rtl' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <Tooltip title={isBold ? 'Remove Bold' : 'Make Bold'}>
                    <Button variant={isBold ? 'contained' : 'outlined'} onClick={handleToggleBold} sx={{ mr: 1 }}>
                        <FormatBoldIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={isHighlighted ? 'Remove Highlight' : 'Highlight Yellow'}>
                    <Button variant={isHighlighted ? 'contained' : 'outlined'} onClick={handleToggleHighlight} sx={{ mr: 1 }}>
                        <FormatColorFillIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Clear Formatting">
                    <Button variant="outlined" onClick={handleClearFormat}>
                        <FormatClearIcon />
                    </Button>
                </Tooltip>
            </Box>
            <ReactQuill
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                placeholder="הקלד כאן ניסוח"
                style={{ width: '100%', minHeight: '25px' }}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link', 'image'],
                        ['clean']
                    ],
                }}
                ref={quillRef}
            />
        </Box>
    );
};