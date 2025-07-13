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
  apiKey: "AIzaSyCbzk13AY8OitKdKDhyBngDdwDqX0clPRE",
  authDomain: "test-firebase-db-project-1dccc.firebaseapp.com",
  projectId: "test-firebase-db-project-1dccc",
  storageBucket: "test-firebase-db-project-1dccc.firebasestorage.app",
  messagingSenderId: "1078964232678",
  appId: "1:1078964232678:web:23699a340bfa86bc767627",
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
