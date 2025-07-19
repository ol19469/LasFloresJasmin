export async function getAllInstagramPosts(
  accessToken: string,
  userId: string
) {
  let posts: any[] = [];
  let url = `https://graph.facebook.com/v23.0/${userId}/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${accessToken}&limit=100`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) break;

    const data = await res.json();
    if (data?.data) {
      posts = posts.concat(data.data);
    }

    url = data?.paging?.next ?? null;
  }

  return posts;
}
