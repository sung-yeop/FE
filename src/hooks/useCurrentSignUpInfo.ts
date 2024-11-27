import {useContext} from 'react';
import {SignUpManageContext} from '../components/SignUpPageComponents/SignUpContext';

export const useCurrentSignUpInfo = () => {
  const context = useContext(SignUpManageContext);

  if (!context) {
    throw new Error('SignUp Context 외부에서 사용되고 있습니다.');
  }
  return context;
};
