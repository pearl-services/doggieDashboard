
//since github doesn't appear to allow the upload of .env keys and Vite
//replaces my key with undefined, breaking the app, I have chosen to
//include it here.
//const API_KEY = import.meta.env.VITE_DOG_API_KEY;
const API_KEY="live_fQ5v1UNvM9V6fZ8jLtEIWTo5A55sY3QYhPQAcqb90q00hNkjYL7YJtkown3fzQ6t"

export async function fetchBreedImages(breedId, limit = 50) {    
  try {
    const res = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${limit}`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    if (!res.ok) {
      console.error("🐾 Dog API error:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("🐾 Network error:", err);
    return [];
  }
}




export async function fetchBreeds() {
    try{
    const res = await fetch(
      `https://api.thedogapi.com/v1/breeds`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    if (!res.ok) {
      console.error("🐾 Dog API error:", res.status);
      return [];
    }

    const data = await res.json();
    console.log(data)
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("🐾 Network error:", err);
    return [];
  }

}
