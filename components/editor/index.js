import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function Editor({name, value, formik}) {
  const [content, setContent] = useState(value);
useEffect(()=>{
    setContent(value)
},[value]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };


  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];


  const handleEditorChange = (newContent) => {
        setContent(newContent);
    formik.setFieldValue(name, newContent);
  formik.setFieldTouched(name, true);
  };


    return (
    <main>
     <div className="h-screen w-screen flex items-center flex-col">
         <div className="h-full w-[90vw]">
             <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-10 bg-white"
            />
        </div>
        {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red" }}>{formik.errors[name]}</div>
          )}
        </div>
    </main>
 );
}