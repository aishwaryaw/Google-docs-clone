import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon';
import {useSession,getSession} from 'next-auth/client';
import Login from '../../components/Login';
import {db} from '../../firebase';
import {useDocumentOnce} from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/dist/client/router';
import {signOut} from 'next-auth/client';
import TextEditor from '../../components/TextEditor';

function Doc(){

    const [session]= useSession();

    if(!session) return <Login/>
    const router = useRouter();

    const {id} = router.query;

    const [snapshot, loading] = useDocumentOnce(db.collection('userDocs').doc(session?.user.email).collection('documents').doc(id));

    if(!loading && !snapshot?.data()?.filename){
        router.replace('/');
    }

    return (
        <div>
            <header className="flex items-center justify-between p-3 pb-1">
                <span onClick={()=>{router.push('/')}} className="cursor-pointer" >
                    <Icon name="description" size="5xl" color="blue" />
                </span>

                <div className="flex-grow px-2">
                    <h1 className="font-bold">{snapshot?.data()?.filename}</h1>
                    <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>

                <Button
                color="lightBlue"
                ripple="dark"
                buttonType="filled"
                size="regular"
                rounded={true}
                iconOnly={false}
                block={false}
                className="hidden md:inline-flex"
                >
                    <Icon name="people" size="md" />Share
                </Button>

                <img loading="lazy" className="cursor-pointer rounded-full ml-2 h-10 w-10 z-50" src={session?.user?.image} alt="" onClick={signOut} />

            </header>

            <TextEditor/>
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context){

    const session = await getSession(context);

    return {
        props :{
            session
        }
    }
}