export const getUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/users`);
    return await response.json();
};