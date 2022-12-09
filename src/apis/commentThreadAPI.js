export const getCommentThreads = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/commentThreads`);
    return await response.json();
};