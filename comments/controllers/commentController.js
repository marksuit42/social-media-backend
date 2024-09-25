const {
    addCommentToPost,
    getCommentsForPost,
    likeCommentById,
    updateComment,
    deleteComment,
  } = require('../repository/commentRepository');
  
  const addComment = async (req, res) => {
    try {
      const { content, author } = req.body;
      const { postId } = req.params;
  
      const comment = await addCommentToPost(postId, content, author);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await getCommentsForPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const likeComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;  // Assuming user ID is available in req.user
      console.log(userId);
      const comment = await likeCommentById(commentId, userId);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCommentById = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
  
      const comment = await updateComment(commentId, content);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteCommentById = async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const comment = await deleteComment(commentId);
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    addComment,
    getComments,
    likeComment,
    updateCommentById,
    deleteCommentById,
  };