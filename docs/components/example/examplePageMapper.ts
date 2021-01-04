// eslint-disable-next-line import/prefer-default-export
export const mapListFromApi = (response: Array<{ id: number }>)
  : Array<{ id: number }> => response.map((item) => ({
  id: item.id,
}));
