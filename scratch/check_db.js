import { db } from '../src/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

async function inspectDatabase() {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    console.log('--- FIRESTORE PROJECTS ---');
    snapshot.docs.forEach(doc => {
      console.log(`Project ID: ${doc.id}`);
      console.log(`Title: ${doc.data().title}`);
      console.log(`Thumbnail: ${doc.data().thumbnail}`);
      console.log(`Screenshots:`, doc.data().screenshots);
      console.log('-------------------------');
    });
  } catch (err) {
    console.error('Error reading Firestore:', err);
  }
}

inspectDatabase();
