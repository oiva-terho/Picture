export const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await result.text();
  };

export const getResource = async (url) => {
const result = await fetch(url);
if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
}
return await result.json();
};