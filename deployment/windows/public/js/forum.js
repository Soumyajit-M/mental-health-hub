/**
 * Forum Manager
 * Handles forum posts and discussions
 */

class ForumManager {
  constructor(socket) {
    this.socket = socket;
    this.posts = [];
    this.username = 'User';
    this.init();
  }

  init() {
    // Get DOM elements
    this.forumPosts = document.getElementById('forum-posts');
    this.postTitleInput = document.getElementById('post-title');
    this.postContentInput = document.getElementById('post-content');
    this.createPostBtn = document.getElementById('create-post-btn');

    // Set up event listeners
    this.setupEventListeners();
    this.setupSocketListeners();
  }

  setupEventListeners() {
    if (this.createPostBtn) {
      this.createPostBtn.addEventListener('click', () => this.createPost());
    }

    if (this.postContentInput) {
      this.postContentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
          this.createPost();
        }
      });
    }
  }

  setupSocketListeners() {
    this.socket.on('forumPost', (post) => {
      this.addPost(post);
    });
  }

  createPost() {
    const title = this.postTitleInput?.value;
    const content = this.postContentInput?.value;

    if (!title || !content) {
      UIUtils.showToast('Please fill in both title and content', 'error');
      return;
    }

    const validation = UIUtils.validateMessage(content);
    if (!validation.valid) {
      UIUtils.showToast(validation.error, 'error');
      return;
    }

    this.socket.emit('forumPost', {
      author: this.username,
      title: UIUtils.sanitizeInput(title),
      content: validation.sanitized
    });

    this.postTitleInput.value = '';
    this.postContentInput.value = '';
    UIUtils.showToast('Post created successfully!', 'success');
  }

  addPost(post) {
    this.posts.unshift(post);
    this.renderPosts();
  }

  renderPosts() {
    if (!this.forumPosts) return;

    if (this.posts.length === 0) {
      this.forumPosts.innerHTML = `
        <div class="empty-state">
          <p>No posts yet. Be the first to share!</p>
        </div>
      `;
      return;
    }

    this.forumPosts.innerHTML = this.posts.map(post => `
      <div class="forum-post" data-post-id="${post.id}">
        <div class="post-header">
          <div class="post-meta">
            <span class="post-author">👤 ${UIUtils.escapeHtml(post.author)}</span>
            <span class="post-time">${UIUtils.formatTimestamp(post.timestamp)}</span>
          </div>
          <h3 class="post-title">${UIUtils.escapeHtml(post.title)}</h3>
        </div>
        <div class="post-content">
          ${UIUtils.escapeHtml(post.content)}
        </div>
        <div class="post-footer">
          <button class="post-action" onclick="forumManager.likePost('${post.id}')">
            👍 Like (${post.likes || 0})
          </button>
          <button class="post-action" onclick="forumManager.toggleReplies('${post.id}')">
            💬 Reply (${post.replies?.length || 0})
          </button>
        </div>
        <div class="post-replies" id="replies-${post.id}" style="display: none;">
          ${this.renderReplies(post.replies || [])}
          <div class="reply-form">
            <textarea 
              placeholder="Write a reply..." 
              id="reply-input-${post.id}"
              maxlength="500"
            ></textarea>
            <button onclick="forumManager.addReply('${post.id}')">Send Reply</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderReplies(replies) {
    if (!replies || replies.length === 0) {
      return '<div class="empty-replies">No replies yet</div>';
    }

    return replies.map(reply => `
      <div class="reply">
        <div class="reply-header">
          <strong>${UIUtils.escapeHtml(reply.author)}</strong>
          <span class="reply-time">${UIUtils.formatTimestamp(reply.timestamp)}</span>
        </div>
        <div class="reply-content">${UIUtils.escapeHtml(reply.content)}</div>
      </div>
    `).join('');
  }

  likePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.renderPosts();
      UIUtils.showToast('Post liked!', 'success');
    }
  }

  toggleReplies(postId) {
    const repliesEl = document.getElementById(`replies-${postId}`);
    if (repliesEl) {
      repliesEl.style.display = repliesEl.style.display === 'none' ? 'block' : 'none';
    }
  }

  addReply(postId) {
    const input = document.getElementById(`reply-input-${postId}`);
    const content = input?.value;

    if (!content) {
      UIUtils.showToast('Reply cannot be empty', 'error');
      return;
    }

    const validation = UIUtils.validateMessage(content);
    if (!validation.valid) {
      UIUtils.showToast(validation.error, 'error');
      return;
    }

    const post = this.posts.find(p => p.id === postId);
    if (post) {
      if (!post.replies) post.replies = [];
      post.replies.push({
        author: this.username,
        content: validation.sanitized,
        timestamp: new Date().toISOString()
      });
      
      this.renderPosts();
      UIUtils.showToast('Reply added!', 'success');
    }
  }

  setUsername(name) {
    this.username = name || 'User';
  }
}

// Export for use in other modules
window.ForumManager = ForumManager;
