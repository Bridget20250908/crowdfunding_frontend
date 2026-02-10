async function postUpdatePledge(pledgeId, fundraiserId, amount, comment, anonymous) {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}`;
    const response = await fetch(url, {
        method: "PUT", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "amount": amount,
            "comment": comment,
            "anonymous": anonymous
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postUpdatePledge;