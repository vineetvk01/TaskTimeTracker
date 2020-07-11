

export const FETCH_TAGS = 'FETCH_TAGS';
export const UPDATE_TAGS = 'UPDATE_TAGS';

export const fetchTags = () => ({
  type: FETCH_TAGS
})

export const UpdateTags = (tags) => ({
  type: UPDATE_TAGS,
  payload: tags,
});
