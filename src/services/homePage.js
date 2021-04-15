import api from './api';
import { formatPrice } from '../utils/formatPrice';

const homePage = async ({ onSuccess, onEnd, onError }) => {
  try {
    const response = await api.get('products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    onSuccess(data);
  } catch (e) {
    onError(e);
  } finally {
    onEnd();
  }
};

export default homePage;
