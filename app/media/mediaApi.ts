import axios from "axios";

// Fetch objects
export async function fetchMedia() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/media`
  );
  return data;
}

// Delete objects
export async function deleteMedia(files: string[]) {
  return axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}api/media`, {
    body: files,
  });
}

// Create folder
export async function createFolder(title: string) {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/media/folder`, {
    body: title,
  });
}

// Get folders
export async function fetchFolders() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/media/folder`
  );
  return data;
}
