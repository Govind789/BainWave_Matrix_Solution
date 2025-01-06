import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

const BlogCard = ({ blog,image }) => {
    const { userInfo } = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(blog.comments || []);
    const [imageUrl , setImageUrl ] = useState('');

    useEffect(() => {
        if (image && image.path) {
            const imagePath = image.path.replace(/\\/g, "/"); 
            const url = `http://localhost:3000/${imagePath}`;
            setImageUrl(url); 
        }
    }, [image]);



    const handleCommentPost = async () => {
        if (comment.trim()) {
            const newComment = {
                user: userInfo.id,
                content: comment.trim()
            };

            try {
                const res = await fetch(`http://localhost:3000/api/blog/${blog._id}/comment`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(newComment),
                });

                const data = await res.json();
                if (data.status === 'success') {
                    console.log(data);
                    const addedComment = data.comment || { ...newComment, _id: data._id }; 
                    setComments(prevComments => [
                        ...prevComments,
                        addedComment 
                    ]);
                    setComment('');
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };



    const handleCommentDelete = async (commentId) => {
        // const commentToDelete = blog.comments;

        try {
            const res = await fetch(`http://localhost:3000/api/blog/${blog._id}/comment/${commentId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            });

            const data = await res.json();
            console.log(data);
            if (data.status === 'success') {
                setComments(prevComments => prevComments.filter(c => c._id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
            <div className="relative h-40">
            {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <h1 className="text-lg text-gray-800 mb-1">
                        <b>{blog.user.username}</b>
                    </h1>
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800 mb-1">Title</h1>
                    <h2 className="text-sm text-gray-600 break-words max-h-11 overflow-y-auto">{blog.title}</h2>
                </div>

                <div>
                    <h1 className="text-lg font-semibold text-gray-800 mb-1">Story</h1>
                    <p className="text-sm text-gray-600 break-words max-h-16 overflow-y-auto">{blog.story}</p>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 outline-none"
                            placeholder="Add a comment"
                        />
                        <button
                            onClick={handleCommentPost}
                            className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                        >
                            Post
                        </button>
                    </div>

                    <div className="space-y-2 h-16  overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map((c, idx) => (
                                <div
                                    key={c._id}
                                    className="bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-800 flex justify-between items-center"
                                >
                                    <span>{c.content}</span>
                                    {blog.user?._id === (c.user._id)&& (
                                        <button
                                            onClick={() => handleCommentDelete(c._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
