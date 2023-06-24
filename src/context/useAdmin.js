import { collection,getDocs,query,where } from 'firebase/firestore';
import { db } from '../firebase-config';


const useAdmin = () => {

    const userCollectionRef = collection(db,'users');
    async function getAdmin(response){
        const q = query(userCollectionRef,where('uid','==',response.user.uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs[0].data().isAdmin
    }
    return {getAdmin}
}


export default useAdmin;