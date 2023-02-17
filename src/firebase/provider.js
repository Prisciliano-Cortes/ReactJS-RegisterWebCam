import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { FirebaseAuth, FirebaseDB, FirebaseStorage } from './config';

const connection = collection(FirebaseDB, 'user');

export const registerUser = async(user) => {
    try {
        const {email, password, name: displayName} = user;

        await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        await updateProfile(FirebaseAuth.currentUser, { displayName });

        const data = await addDoc(connection, user);
        

        const id = data.id;
        return id;
    } catch (error) {
        console.log(error);
    }
}

export const loginApp = ({email, password}) => {
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

export const uploadProfileStorage = async(id, file) => {
    // const storage = getStorage();

    // const name = ref(storage, `user/${id}`);

    // await uploadBytes(name, file);

    // const url = await getDownloadURL(name);

    // return url;

    try {
        const storageRef = ref( FirebaseStorage, "user/" + id + Math.random());
        await uploadString(storageRef, file, "data_url").then((snapshot) => {
            console.log("Uploaded a data_url string!");
        });

        const url = await getDownloadURL(storageRef);

        return url;
    } catch (e) {
        console.log(e);
    }
}

export const EditUrlImg = async(id, url) => {
    await updateDoc(doc(FirebaseDB, "user", id), { profile: url });
}

export const validateRepeatData = async(user) => {
    try {
        const rpt = [];
        const q = query(connection, where("email", "==", user.email));
        const queryConsult = await getDocs(q);
        queryConsult.forEach((doc) => {
            rpt.push(doc.data());
        });
        return rpt.length;
    } catch (error) {
      console.log(error);
    }
}

export const getUsers = async() => {
    const data = await getDocs(collection(FirebaseDB, "user"));

    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    return users
}