import Head from 'next/head'
import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import {useSession,getSession} from 'next-auth/client';
import Login from '../components/Login';
import { useState } from 'react'
import firebase from 'firebase';
import Document from '../components/Document';
import {useDocumentsProviderValue} from '../context';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';


export default function Home() {

  const [session,loading] = useSession();

  const [input, setInput] = useState('');
 
  const [showModal, setShowModal] = useState(false);
  
  const {documents, addDocuments}= useDocumentsProviderValue();

  const createDocument = () => {
    if(!input) {
      setShowModal(false);
      return;
    }
    addDocuments(input,firebase.firestore.FieldValue.serverTimestamp());
    setInput('');
    setShowModal(false);
  }

    const modal = (
      <Modal size="sm" active = {showModal} toggler = {()=>{setShowModal(false); setInput('');}}>
            <ModalBody>
            <input 
              type="text" 
              value={input} 
              onChange={(e)=> setInput(e.target.value)} 
              placeholder="Enter document name"
              className="w-full outline-none"
              onKeyDown = {(e) => e.key === 'Enter' && createDocument()}
            ></input>
            </ModalBody>

            <ModalFooter>
                <Button buttonType="link" color="blue" ripple="dark" onClick={(e)=> {
                  setShowModal(false);
                  setInput('');}}>Cancel</Button>
                <Button color="blue" ripple="dark" onClick={createDocument}>Create</Button>
            </ModalFooter>
    </Modal>
    )


  if(!session) return <Login/>
  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {modal}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button color="gray" buttonType="outline" ripple="dark" iconOnly={true} className="!border-0" >
              <Icon name="more_vert" color="gray" size="3xl" />
            </Button>
          </div>

          <div onClick={()=>setShowModal(true)} className="h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
            <Image src="https://links.papareact.com/pju" layout="fill" />
          </div>
          <p className="text-gray-700 ml-2 mt-2 font-semibold text-sm">Blank</p>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
          {documents?.map(doc=> (
          <Document key = {doc.id} filename={doc.data().filename} date={doc.data().timestamp} id={doc.id} />
        ))}
        </div>
       
      </section>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
      props:{
          session
      }
  }
}