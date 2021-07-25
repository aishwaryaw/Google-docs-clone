import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/dist/client/router'
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useDocumentsProviderValue } from '../context'

function Document({id, filename, date}) {

    const router = useRouter();
    const {deleteDocument} = useDocumentsProviderValue();

    return (
        <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon name="article" size="3xl" color="blue" />
            <p className="flex-grow pl-5 w-10 pr-10 truncate" onClick={()=>{router.push(`doc/${id}`)}}>{filename}</p>
            <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
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
                    onClick={() => deleteDocument(id)}
                >
                    Delete Document
                </DropdownLink>
            </Dropdown>

            {/* <Button
                color="gray"
                ripple="dark"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                className="!border-0"
                >
                    
                </Button> */}
        </div>
    )
}

export default Document
