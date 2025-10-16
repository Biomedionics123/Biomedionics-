import React from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '../IconComponents';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editorRef = React.useRef<HTMLDivElement>(null);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCmd = (cmd: string, arg?: string) => {
        document.execCommand(cmd, false, arg);
        editorRef.current?.focus();
        handleInput();
    };
    
    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        execCmd('fontName', e.target.value);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        execCmd('fontSize', e.target.value);
    };

    // Sync state with div content
    React.useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="border rounded-md">
            <div className="flex items-center p-2 border-b bg-gray-50 rounded-t-md space-x-2 flex-wrap">
                <button type="button" onClick={() => execCmd('bold')} className="p-2 hover:bg-gray-200 rounded"><BoldIcon className="w-4 h-4" /></button>
                <button type="button" onClick={() => execCmd('italic')} className="p-2 hover:bg-gray-200 rounded"><ItalicIcon className="w-4 h-4" /></button>
                <button type="button" onClick={() => execCmd('underline')} className="p-2 hover:bg-gray-200 rounded"><UnderlineIcon className="w-4 h-4" /></button>
                
                <select onChange={handleFontChange} className="p-1 border-gray-300 rounded-md text-sm">
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select>

                 <select onChange={handleSizeChange} className="p-1 border-gray-300 rounded-md text-sm">
                    <option value="3">Normal</option>
                    <option value="4">Subtitle</option>
                    <option value="5">Heading</option>
                    <option value="6">Large Heading</option>
                </select>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="w-full p-3 h-48 overflow-y-auto focus:outline-none"
                dangerouslySetInnerHTML={{ __html: value }}
            >
            </div>
        </div>
    );
};

export default RichTextEditor;
