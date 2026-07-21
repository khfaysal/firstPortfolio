import { getDb } from '../src/firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function clearProjects() {
  try {
    const db = await getDb();
    const snapshot = await getDocs(collection(db, 'projects'));
    console.log(`Found ${snapshot.size} projects. Deleting...`);
    
    for (const d of snapshot.docs) {
      await deleteDoc(doc(db, 'projects', d.id));
      console.log(`Deleted project: ${d.id}`);
    }
    
    console.log('Database cleaned successfully!');
  } catch (err) {
    console.error('Error clearing database:', err);
  }
}

clearProjects();
