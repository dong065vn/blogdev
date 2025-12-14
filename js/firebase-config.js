/**
 * Firebase Configuration
 * Blog posts được lưu trên Firebase Realtime Database
 */

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDCls_5XeIw5LbAP7wsjcaffeG6_1sCAzY",
  authDomain: "dbblogdev.firebaseapp.com",
  databaseURL: "https://dbblogdev-default-rtdb.firebaseio.com",
  projectId: "dbblogdev",
  storageBucket: "dbblogdev.firebasestorage.app",
  messagingSenderId: "363253081554",
  appId: "1:363253081554:web:2ff3f7d3dd6371a7b1540b"
};

// Initialize Firebase
let db = null;
let rtdb = null;
let auth = null;

async function initFirebase() {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    rtdb = getDatabase(app);
    auth = getAuth(app);
    
    console.log('Firebase initialized successfully');
    return { db, rtdb, auth };
  } catch (error) {
    console.error('Firebase init error:', error);
    return null;
  }
}

// Blog Posts API - Realtime Database
const BlogAPI = {
  // Load all posts with timeout
  async getPosts() {
    try {
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase timeout')), 5000)
      );
      
      const fetchPromise = (async () => {
        const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
        const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        
        let app = getApps()[0];
        if (!app) app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        
        const snapshot = await get(ref(database, 'posts'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const posts = Object.values(data).sort((a, b) => new Date(b.date) - new Date(a.date));
          return posts;
        }
        return [];
      })();
      
      return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
      console.error('Error loading posts from Firebase:', error.message);
      return null; // Return null to trigger fallback
    }
  },

  // Save a single post
  async savePost(post) {
    try {
      const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
      const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      
      let app = getApps()[0];
      if (!app) app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      
      await set(ref(database, `posts/${post.id}`), post);
      return true;
    } catch (error) {
      console.error('Error saving post:', error);
      return false;
    }
  },

  // Delete a post
  async deletePost(postId) {
    try {
      const { getDatabase, ref, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
      const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      
      let app = getApps()[0];
      if (!app) app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      
      await remove(ref(database, `posts/${postId}`));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  },

  // Save all posts (bulk)
  async saveAllPosts(posts) {
    try {
      const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
      const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      
      let app = getApps()[0];
      if (!app) app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      
      // Convert array to object with id as key
      const postsObj = {};
      posts.forEach(post => { postsObj[post.id] = post; });
      
      await set(ref(database, 'posts'), postsObj);
      return true;
    } catch (error) {
      console.error('Error saving posts:', error);
      return false;
    }
  }
};

// Export for use
window.FirebaseDB = {
  init: initFirebase,
  getDb: () => db,
  getRtdb: () => rtdb,
  getAuth: () => auth,
  config: firebaseConfig
};

window.BlogAPI = BlogAPI;
