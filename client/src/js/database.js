import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const postDb = async (content) => {
  try {
    try {
      const db = await openDB('jate', 1);
      const tx = db.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const note = store.add(content);
      // await tx.done;
      console.log('Content added to the database:', note);
    } catch (error) {
      console.log('Error adding content to the database:', error);
    }
  } catch (error) {
    console.log("PUT DB ERROR")
    console.log(error)
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GETTNG DB')
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    console.log('All content from the database:', allContent);
    return  allContent?.value;;
  } catch (error) {
    console.log('ERROR WITH DB')
    console.log(error)
  }
}

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);


  const contactDb = await openDB('jate', 1);


  const tx = contactDb.transaction('jate', 'readwrite');


  const store = tx.objectStore('jate');


  const request = store.delete(id);


  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();


 