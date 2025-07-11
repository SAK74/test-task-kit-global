import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbzk13AY8OitKdKDhyBngDdwDqX0clPRE",
  authDomain: "test-firebase-db-project-1dccc.firebaseapp.com",
  projectId: "test-firebase-db-project-1dccc",
  storageBucket: "test-firebase-db-project-1dccc.firebasestorage.app",
  messagingSenderId: "1078964232678",
  appId: "1:1078964232678:web:23699a340bfa86bc767627",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export type Post = {
  title: string;
  content?: string;
  id: string;
  timestamp?: string;
};

export async function getPosts() {
  const postsCollection = collection(db, "posts") as CollectionReference<Post>;
  const queryPosts = await getDocs(postsCollection);

  return queryPosts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function addPost(post: Omit<Post, "id">) {
  const postsCollection = collection(db, "posts") as CollectionReference<
    Omit<Post, "id">
  >;
  const docRef = await addDoc(postsCollection, {
    ...post,
    timestamp: serverTimestamp(),
  });
  console.log("In action: ", docRef);

  return { ...post, id: docRef.id };
}

export async function getPostById(id: string) {
  const postDoc = doc(collection(db, "posts") as CollectionReference<Post>, id);
  const docSnap = await getDoc(postDoc);

  if (!docSnap.exists()) {
    return null;
  }

  return { ...docSnap.data(), id: docSnap.id };
}
