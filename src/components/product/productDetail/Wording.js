

import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Wording = () => {
    const [editorHtml, setEditorHtml] = useState('');
  
    const handleChange = (content, delta, source, editor) => {
        setEditorHtml(content);
    };

    return (
        <Row className="justify-content-center align-items-center">
            <Col className="text-center">
                <ReactQuill
                    className="mt-3"
                    theme="snow"
                    value={editorHtml}
                    onChange={handleChange}
                    placeholder="הקלד כאן ניסוח" // Placeholder text
                    style={{ width: '300px', margin: '0 auto' }}
                />
            </Col>
        </Row>
    );
};






