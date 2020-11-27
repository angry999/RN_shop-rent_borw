
import request2 from 'src/utils/fetch2';

/**
 * API get list product
 * @param data
 * @returns {Promise<unknown>}
 */
export const getListProduct = async (data) => {
  if (!data.isDesigner) {
    if (data.location) {
      return await request2.getListProduct(`/api/v1/products?page=${data.page}&limit=${data.limit}&isDesigner=false&location=${data.location}`);
    }
    return await request2.getListProduct(`/api/v1/products?page=${data.page}&limit=${data.limit}&isDesigner=false`);
  } else {
    return await request2.getListProduct(`/api/v1/products?page=${data.page}&limit=${data.limit}`);
  }
}

/**
 * API get list designers
 * @param data
 * @returns {Promise<unknown>}
 */
export const getListDesigners = async (data) => {
  if (data.location) {
    return await request2.getListDesigners(`/api/v1/products?page=${data.page}&limit=${data.limit}&isDesigner=true&location=${data.location}`);
  } else {
    return await request2.getListDesigners(`/api/v1/products?page=${data.page}&limit=${data.limit}&isDesigner=true`);
  }
}

/**
 * API like item
 * @param data
 * @returns {Promise<unknown>}
 */
export const likeItem = async (data) => {
  return await request2.likeItem(`/api/v1/products/${data.id}/likes`, data);
}

/**
 * API bookmark item
 * @param data
 * @returns {Promise<unknown>}
 */
export const bookmarkItem = async (data) => {
  return await request2.bookmarkItem(`/api/v1/products/${data.id}/bookmark`, data);
}