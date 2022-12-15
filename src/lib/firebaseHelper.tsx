import { collection, Firestore, getDocs } from "firebase/firestore";

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
