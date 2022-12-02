// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import fs from 'fs';

import Service from '.';
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
} from '../../env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage();

class FirebaseService extends Service {
	static async uploadFile(pathFile: string) {
		const fileData = fs.readFileSync(pathFile);

		const storageRef = ref(
			storage,
			`exel/${new Date()} => ${pathFile.replace(
				'public/uploadsFiles/',
				''
			)}`
		);

		uploadBytes(storageRef, fileData).then((snapshot) => {
			console.log(
				`Uploaded to firebase storage => ${snapshot.ref.fullPath}!`
			);
			return snapshot.ref.fullPath;
		});
	}
}

export default FirebaseService;
