import { basePath, secretKey } from './constants';

/** delete post api */
const deletePost = async (id: string) => {
  const response = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': secretKey,
    },
    body: JSON.stringify({
      query: `mutation MyMutation {
  delete_posts_by_pk(id: "${id}") {
    id
  }
}

`,
      variables: {},
    }),
  });

  return await response.json();
};

export default deletePost;
