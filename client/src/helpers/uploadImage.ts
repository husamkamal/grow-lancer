import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';

import storage from './firebaseConfig';

const imageUpload = async (file: File, userId: number) => {
  const storageReferance = ref(storage, `files/${userId}`);
  const snapshot = await uploadBytes(storageReferance, file);
  const imgURL = await getDownloadURL(snapshot.ref);
  return imgURL;
};

export default imageUpload;
