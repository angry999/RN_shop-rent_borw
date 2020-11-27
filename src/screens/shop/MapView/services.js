import request2 from 'src/utils/fetch2';
import globalConfig from '../../../utils/global';

/**
 * API get location by address
 * @param data
 * @returns {Promise<unknown>}
 */
export const getLocationByAddress = async (data) => {
  return await request2.getLocation(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=${globalConfig.getGoogleAPIKey()}`);
  // request2.post('/api/v1/products', data).then(result => {
  //   return result;
  // })
}

/**
 * API get address by location
 * @param data
 * @returns {Promise<unknown>}
 */
export const getAddressByLocation = async (data) => {
  return await request2.getAddress(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data[0]},${data[1]}&key=${globalConfig.getGoogleAPIKey()}`);
}