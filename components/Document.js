import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/dist/client/router'
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useDocumentsProviderValue } from '../context'
import { useState } from 'react'
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';

function Document({id, filename, date}) {

    const router = useRouter();
    const {deleteDocument} = useDocumentsProviderValue();
    const [showModal, setShowModal] = useState(false);

    const modal = (
        <Modal size="sm" active = {showModal} toggler = {()=>setShowModal(false)}>
              <ModalBody>
                <p className="text-sm font-bold">Are you sure you want to delete a document ?</p> 
              </ModalBody>
  
              <ModalFooter>
                  <Button buttonType="link" color="blue" ripple="dark" onClick={(e)=> setShowModal(false)}>Cancel</Button>
                  <Button color="blue" ripple="dark" onClick={()=>deleteDocument(id)}>Delete</Button>
              </ModalFooter>
      </Modal>
      )
  

    return (
        <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon name="article" size="3xl" color="blue" />
            <p className="flex-grow pl-5 w-10 pr-10 truncate" onClick={()=>{router.push(`doc/${id}`)}}>{filename}</p>
            <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
            {modal}
            <Dropdown
                color="lightBlue"
                placement="bottom-start"
                buttonText={<Icon name='more_vert' size='3xl'/>}
                buttonType="outline"
                size="regular"
                rounded={true}
                block={false}
                ripple="dark"
                className="!border-0"
            >
                <DropdownLink
                    color="blue"
                    ripple="light"
                    onClick={() =>setShowModal(true)}
                >
                    Delete Document
                </DropdownLink>
            </Dropdown>
        </div>
    )
}

export default Document
