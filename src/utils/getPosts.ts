import { basePath, secretKey } from './constants';

/** get post api */
const getPosts = async () => {
  const response = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': secretKey,
    },
    body: JSON.stringify({
      query: `query MyQuery {
  posts {
    body
    title
    id
  }
}
`,
      variables: {},
    }),
  });

  const result = await response.json();

  return result.data.posts;
};

export default getPosts;
