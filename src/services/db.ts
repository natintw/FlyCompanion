import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  serverTimestamp,
  onSnapshot,
  QueryConstraint
} from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  async getDocument<T>(collectionPath: string, docId: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionPath, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as T) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${collectionPath}/${docId}`);
      return null;
    }
  },

  async setDocument(collectionPath: string, docId: string, data: Record<string, unknown>) {
    try {
      await setDoc(doc(db, collectionPath, docId), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${collectionPath}/${docId}`);
    }
  },

  async createDocument(collectionPath: string, data: Record<string, unknown>, customId?: string) {
    try {
      const docRef = customId ? doc(db, collectionPath, customId) : doc(collection(db, collectionPath));
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, collectionPath);
      return null;
    }
  },

  async updateDocument(collectionPath: string, docId: string, data: Record<string, unknown>) {
    try {
      const docRef = doc(db, collectionPath, docId);
      await setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${collectionPath}/${docId}`);
    }
  },

  async deleteDocument(collectionPath: string, docId: string) {
    try {
      const { deleteDoc } = await import('firebase/firestore');
      const docRef = doc(db, collectionPath, docId);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionPath}/${docId}`);
    }
  },

  async listDocuments<T>(collectionPath: string, queryConstraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const q = query(collection(db, collectionPath), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, collectionPath);
      return [];
    }
  },

  subscribeToDocument<T>(collectionPath: string, docId: string, callback: (data: T | null) => void) {
    const docRef = doc(db, collectionPath, docId);
    return onSnapshot(docRef, (docSnap) => {
      callback(docSnap.exists() ? (docSnap.data() as T) : null);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `${collectionPath}/${docId}`);
    });
  },

  subscribeToCollection<T>(collectionPath: string, queryConstraints: QueryConstraint[], callback: (data: T[]) => void) {
    const q = query(collection(db, collectionPath), ...queryConstraints);
    return onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    });
  }
};
