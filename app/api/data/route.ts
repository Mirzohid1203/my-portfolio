
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const DOC_ID = 'main_data';
const COLLECTION = 'portfolio';

export async function GET() {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      // Seed from JSON if Firestore is empty
      const jsonPath = path.join(process.cwd(), 'data', 'portfolio.json');
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      await setDoc(docRef, jsonData);
      return NextResponse.json(jsonData);
    }
  } catch (error) {
    console.error('Firebase GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const docRef = doc(db, COLLECTION, DOC_ID);

    // In Firebase we can just overwrite the whole doc or merge. 
    // We'll overwrite with the new full state from admin panel.
    await setDoc(docRef, body);

    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Firebase POST Error:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
