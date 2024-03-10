export async function getData(endPoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endPoint}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        return response;
    } catch (error) {
        return {}
    }
}

export async function postData(element, endPoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        });
        return response;
    }
    catch (error) {
        return {}
    }
}
