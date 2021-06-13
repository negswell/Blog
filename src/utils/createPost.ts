import { basePath, secretKey } from './constants';

const createPost = async (title: string, body: string) => {
  const response = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': secretKey,
    },
    body: JSON.stringify({
      query: `mutation MyMutation {
  insert_posts_one(object: {title: "${encodeURIComponent(
    title
  )}", body: "${encodeURIComponent(body)}"}) {
    body
    id
    title
  }
}
`,
      variables: {},
    }),
  });

  return await response.json();
};

export default createPost;
