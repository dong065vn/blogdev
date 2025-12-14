/**
 * Firebase Configuration
 * Thay thế các giá trị bên dưới bằng config từ Firebase Console
 */

// Firebase Config - LẤY TỪ FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyDCls_5XeIw5LbAP7wsjcaffeG6_1sCAzY",
  authDomain: "dbblogdev.firebaseapp.com",
  projectId: "dbblogdev",
  storageBucket: "dbblogdev.firebasestorage.app",
  messagingSenderId: "363253081554",
  appId: "1:363253081554:web:2ff3f7d3dd6371a7b1540b"
};

// Initialize Firebase
let db = null;
let auth = null;

async function initFirebase() {
  try {
    // Dynamic import Firebase modules
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    console.log('Firebase initialized successfully');
    return { db, auth };
  } catch (error) {
    console.error('Firebase init error:', error);
    return null;
  }
}

// Export for use
window.FirebaseDB = {
  init: initFirebase,
  getDb: () => db,
  getAuth: () => auth
};
