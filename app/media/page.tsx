import { fetchFolders, fetchMedia } from "./mediaApi";
import Media from "./Media";

export default async function MediaPage() {
  const items = await fetchMedia();
  const folders = await fetchFolders();

  return <Media items={items} folders={folders} />;
}
