import { useSession } from 'next-auth/client';
import React, { useContext, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import {db} from './firebase';

const DocumentsContext = React.createContext();
const DocumentsProvider = ({children}) => {
    const [session] = useSession();
    const [search,setSearch] = useState('');

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const [snapshot] = search ? useCollection(db.collection('userDocs').doc(session?.user?.email).collection('documents').where('filename','>=', search).where('filename', '<=', search + '\uf8ff')): useCollection(db.collection('userDocs').doc(session?.user?.email).collection('documents').orderBy('timestamp','desc'));
    const documents = snapshot?.docs;
 
    const addDocuments = (filename, timestamp) => {
        db.collection('userDocs').doc(session.user.email).collection('documents').add({
            filename,
            timestamp
        });
    }

    const deleteDocument = (id) => {
        console.log(id);
        db.collection('userDocs').doc(session.user.email).collection('documents').doc(id).delete();
    }

    return (
        <DocumentsContext.Provider value={{documents, search, changeSearch, addDocuments,deleteDocument}} >
            {children}
        </DocumentsContext.Provider>
    )
}


const useDocumentsProviderValue = () => useContext(DocumentsContext);

export {
    DocumentsContext,
    useDocumentsProviderValue,
    DocumentsProvider
}
    


