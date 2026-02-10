async function postCreateFundraiser(title, description, goal, image, isOpen) {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "goal": goal,
            "image": image,
            "is_open": isOpen
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create fundraiser`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postCreateFundraiser;