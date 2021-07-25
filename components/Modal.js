import React, {useState} from 'react'
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button'

function ModalComponent({content, action,modalVisibility}) {

    const [showModal, setShowModal] = useState(modalVisibility);
    const doAction  = () => {
        action()
    }
    console.log(showModal);
    return (
        <Modal size="sm" active = {showModal} toggler = {()=>setShowModal(false)}>
            <ModalBody>
              {content}
            </ModalBody>

            <ModalFooter>
                <Button buttonType="link" color="blue" ripple="dark" onClick={(e)=> setShowModal(false)}>Cancel</Button>
                <Button color="blue" ripple="dark" onClick={doAction}>Create</Button>
            </ModalFooter>
    </Modal>
    )
}

export default ModalComponent
