import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

const HistoryBlogCard = ({ blog, image, onDelete }) => {
    const { userInfo } = useContext(UserContext);

    const [title, setTitle] = useState(blog.title);
    const [story, setStory] = useState(blog.story);
    const [originalTitle, setOriginalTitle] = useState(blog.title);
    const [originalStory, setOriginalStory] = useState(blog.story);
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(blog.comments || []);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (image && image.path) {
            const imagePath = image.path.replace(/\\/g, "/");
            const url = `https://postsphere-ten.vercel.app/${imagePath}`;
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
                const res = await fetch(`https://postsphere-ten.vercel.app/api/blog/${blog._id}/comment`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(newComment),
                });

                const data = await res.json();
                if (data.status === 'success') {
                    const addedComment = data.comment || { ...newComment, _id: data._id };
                    setComments(prevComments => [...prevComments, addedComment]);
                    setComment('');
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const res = await fetch(`https://postsphere-ten.vercel.app/api/blog/${blog._id}/comment/${commentId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            });

            const data = await res.json();
            if (data.status === 'success') {
                setComments(prevComments => prevComments.filter(c => c._id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleBlogDelete = () => {
        if (onDelete) {
            onDelete(blog._id);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`https://postsphere-ten.vercel.app/api/blog/${blog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, story }),
            });

            const data = await res.json();
            if (data.status === 'success') {
                setOriginalTitle(title);
                setOriginalStory(story);
                setIsEditing(false);
                console.log('Blog updated successfully!');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleCancel = () => {
        setTitle(originalTitle);
        setStory(originalStory);
        setIsEditing(false);
    };

    const hasChanges = title !== originalTitle || story !== originalStory;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 relative">
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
                    <h1>Created on {new Date(blog.timestamp).toLocaleDateString()} at {new Date(blog.timestamp).toLocaleTimeString()}</h1>
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800 mb-1">Title</h1>
                    {isEditing ? (
                        <input
                            className="text-sm border border-gray-300 rounded-md px-3 py-2 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <p className="text-sm text-gray-600">{title}</p>
                    )}
                </div>

                <div>
                    <h1 className="text-lg font-semibold text-gray-800 mb-1">Story</h1>
                    {isEditing ? (
                        <textarea
                            className="text-sm border border-gray-300 rounded-md px-3 py-2 outline-none w-full"
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        />
                    ) : (
                        <p className="text-sm text-gray-600">{story}</p>
                    )}
                </div>

                {isEditing ? (
                    <div className="flex gap-2 mt-4 justify-center">
                        {hasChanges ? (
                            <button
                                onClick={handleUpdate}
                                className="bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                        >
                            Edit
                        </button>
                    </div>
                )}

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

                    <div className="space-y-2 h-16 overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map((c) => (
                                <div
                                    key={c._id}
                                    className="bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-800 flex justify-between items-center"
                                >
                                    <span>{c.content}</span>
                                    {userInfo?.id === c.user._id && (
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

                <button
                    onClick={handleBlogDelete}
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 w-full"
                >
                    Delete Blog
                </button>
            </div>
        </div>
    );
};

export default HistoryBlogCard;
