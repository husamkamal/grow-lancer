import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PropsTextEditor } from '../../interfaces';
import './style.css';

function TextEditor({ error, value, setValue }: PropsTextEditor) {
  return (
    <div className="text-editor-container">
      <ReactQuill
        className={error ? 'text-editor error' : 'text-editor'}
        theme="snow"
        value={value}
        style={{ borderColor: 'red !' }}
        onChange={(e) => {
          if (e === '<p><br></p>') {
            setValue('');
          } else { setValue(e); }
        }}
      />
    </div>
  );
}
export default TextEditor;
