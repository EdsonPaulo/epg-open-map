import { useSelector } from 'react-redux';

import {
  getFisgarData,
  getFisgarMessage,
  getLoading,
} from '../redux/fisgar/fisgar.selectors';

const useFisgarState = () => {
  const fisgarData = useSelector(getFisgarData);
  const loading = useSelector(getLoading);
  const fisgarMessage = useSelector(getFisgarMessage);

  return { fisgarData, fisgarMessage, loading };
};

export default useFisgarState;
