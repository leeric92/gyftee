import * as types from '../Constants/ActionTypes';

export function fetchFriend(json) {
  return {
    type: types.FETCH_FRIEND,
    friend: json
  };
};

export function saveImageUrl(url) {
  return {
    type: types.SAVE_IMAGE_URL,
    image_url: url
  };
};
