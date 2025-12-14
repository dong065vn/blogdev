/**
 * Database Service - CRUD operations for Portfolio
 * Supports: Firebase Firestore
 */

const Database = {
  db: null,
  
  // Initialize
  async init() {
    if (window.FirebaseDB) {
      const result = await window.FirebaseDB.init();
      if (result) {
        this.db = result.db;
        return true;
      }
    }
    console.warn('Using localStorage fallback');
    return false;
  },

  // ============ BLOG POSTS ============
  async getPosts() {
    if (this.db) {
      const { collection, getDocs, orderBy, query } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const q = query(collection(this.db, 'posts'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    // Fallback to localStorage
    const data = localStorage.getItem('blog_posts');
    return data ? JSON.parse(data).posts : [];
  },

  async getPost(id) {
    if (this.db) {
      const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const docRef = doc(this.db, 'posts', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }
    const posts = await this.getPosts();
    return posts.find(p => p.id === id);
  },

  async savePost(post) {
    if (this.db) {
      const { doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const postData = { ...post, updatedAt: serverTimestamp() };
      await setDoc(doc(this.db, 'posts', post.id), postData);
      return post.id;
    }
    // Fallback
    const posts = await this.getPosts();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) posts[idx] = post;
    else posts.unshift(post);
    localStorage.setItem('blog_posts', JSON.stringify({ posts }));
    return post.id;
  },

  async deletePost(id) {
    if (this.db) {
      const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      await deleteDoc(doc(this.db, 'posts', id));
      return true;
    }
    const posts = await this.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem('blog_posts', JSON.stringify({ posts: filtered }));
    return true;
  },

  // ============ PORTFOLIO CONFIG ============
  async getConfig() {
    if (this.db) {
      const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const docSnap = await getDoc(doc(this.db, 'config', 'portfolio'));
      return docSnap.exists() ? docSnap.data() : null;
    }
    const data = localStorage.getItem('portfolio_config');
    return data ? JSON.parse(data) : null;
  },

  async saveConfig(config) {
    if (this.db) {
      const { doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      await setDoc(doc(this.db, 'config', 'portfolio'), { ...config, updatedAt: serverTimestamp() });
      return true;
    }
    localStorage.setItem('portfolio_config', JSON.stringify(config));
    return true;
  },

  // ============ PROJECTS ============
  async getProjects() {
    const config = await this.getConfig();
    return config?.projects || [];
  },

  async saveProject(project) {
    const config = await this.getConfig() || {};
    config.projects = config.projects || [];
    const idx = config.projects.findIndex(p => p.id === project.id);
    if (idx >= 0) config.projects[idx] = project;
    else config.projects.push(project);
    await this.saveConfig(config);
    return project.id;
  },

  // ============ CONTACT MESSAGES ============
  async saveMessage(message) {
    if (this.db) {
      const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const docRef = await addDoc(collection(this.db, 'messages'), {
        ...message,
        createdAt: serverTimestamp(),
        read: false
      });
      return docRef.id;
    }
    // Fallback - just log
    console.log('Message received:', message);
    return 'local_' + Date.now();
  },

  async getMessages() {
    if (this.db) {
      const { collection, getDocs, orderBy, query } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const q = query(collection(this.db, 'messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
  }
};

// Export
window.Database = Database;
