import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import type { Post } from "./schema";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDING_ID,
  appId: import.meta.env.VITE_API_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
    timestamp: Date.now(),
  });

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

export async function deletePost(id: string) {
  const postDoc = doc(db, "posts", id);
  await deleteDoc(postDoc);

  return id;
}

export async function updatePost(id: string, data: Partial<Omit<Post, "id">>) {
  const postDoc = doc(db, "posts", id);
  await updateDoc(postDoc, data);
  return { id, ...data };
}
