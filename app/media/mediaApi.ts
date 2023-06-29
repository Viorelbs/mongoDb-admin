import axios from "axios";

export async function fetchMedia() {
  const { data } = await axios.get("api/media");
  return data;
}

export async function deleteMedia(files: string) {
  return axios.patch("api/media", { body: files });
}