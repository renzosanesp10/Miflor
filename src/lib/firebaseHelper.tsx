import {
  doc,
  getDoc,
  collection,
  Firestore,
  getDocs,
} from "firebase/firestore";

export const getWholeDocumentByName = async (
  db: Firestore,
  nameOfDoc: string
): Promise<any[]> => {
  const arrayAux: any[] = [];
  const docRef = collection(db, nameOfDoc);
  const querySnap = await getDocs(docRef);
  querySnap.forEach((item) => arrayAux.push({ id: item.id, ...item.data() }));
  return arrayAux;
};

export const getOneItemFromDocumentByID = async (
  db: Firestore,
  nameOfDoc: string,
  id: string
): Promise<any> => {
  const docRef = doc(db, nameOfDoc, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.error("No role exits");
  }
  return docSnap.data();
};
