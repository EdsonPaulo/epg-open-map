import { useSelector } from 'react-redux';

import {
  getFisgarData,
  getFisgarMessage,
  getLoading,
  getMapLayers,
} from '../redux/fisgar/fisgar.selectors';

const useFisgarState = () => {
  const fisgarData = useSelector(getFisgarData);
  const mapLayers = useSelector(getMapLayers);
  const loading = useSelector(getLoading);
  const fisgarMessage = useSelector(getFisgarMessage);

  return { fisgarData, mapLayers, fisgarMessage, loading };
};

export default useFisgarState;
