import { useDispatch } from 'react-redux';

import store from '../redux/store';

type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
