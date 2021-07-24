import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import {useSession} from 'next-auth/client';
import { useRouter } from "next/dist/client/router";
import {db} from '../firebase';
import {useDocumentOnce} from 'react-firebase-hooks/firestore';

// will import Editor only for client side render and not for server side render
const Editor = dynamic(()=> import("react-draft-wysiwyg").then((module)=> module.Editor),{
    ssr : false
});

function TextEditor() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [session] = useSession();

    const router = useRouter();

    const {id} = router.query;

    const [snapshot] = useDocumentOnce(db.collection('userDocs').doc(session?.user.email).collection('documents').doc(id)); 

    useEffect(()=>{
        if(snapshot?.data()?.editorState){
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(snapshot?.data()?.editorState)
                )
            )
        }
    },[snapshot]);

    const onEditorStateChange = (editorState) => {

        setEditorState(editorState);

        db.collection('userDocs').doc(session?.user.email).collection('documents').doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge : true
        })

    }
    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor 
            editorState={editorState}
            toolbarClassName="flex sticky top-0 x-50 items-center !justify-center mx-auto"
            editorClassName="bg-white mt-6 max-w-5xl shadow-lg mx-auto mb-12 border p-10"
            onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default TextEditor
