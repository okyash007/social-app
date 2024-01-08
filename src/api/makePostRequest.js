export async function makePostRequest(url, body, callback) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Adjust content type as needed
      },
      redirect: "follow",
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!response) {
      console.log("something went wrong");
    }

    const data = await response.json();
    callback(data); // Call the specified callback function with the response data
  } catch (error) {
    // console.log(error.message);
  }
}
