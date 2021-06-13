import { basePath, secretKey } from './constants';

/** update post api */
const updatePost = async (id: string, title: string, body: string) => {
  const response = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': secretKey,
    },
    body: JSON.stringify({
      query: `mutation MyMutation {
  update_posts_by_pk(pk_columns: {id: "${id}"}, _set: {body: "${encodeURIComponent(
        body
      )}", title: "${encodeURIComponent(title)}"}) {
    id
  }
}

`,
      variables: {},
    }),
  });

  return await response.json();
};

export default updatePost;
