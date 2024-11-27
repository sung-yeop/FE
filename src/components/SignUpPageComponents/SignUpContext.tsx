import {StyleSheet, Text, View} from 'react-native';
import React, {Children, createContext, useContext, useState} from 'react';
import {SignUpInfo} from '../../types';

export interface SignUpContextType {
  current: SignUpInfo;
  updateCurrent: (updates: Partial<SignUpInfo>) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const SignUpManageContext = createContext<SignUpContextType | undefined>(
  undefined,
);

type Props = {
  children?: React.ReactNode;
};

const SignUpContext = ({children}: Props) => {
  const defaultSignUpInfo: SignUpInfo = {
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
    isGuardian: false,
  };

  const [current, setCurrent] = useState<SignUpInfo>(defaultSignUpInfo);
  const [step, setStep] = useState<number>(1);

  const updateCurrent = (updates: Partial<SignUpInfo>) => {
    setCurrent(prev => ({...prev, ...updates}));
  };

  return (
    <SignUpManageContext.Provider
      value={{
        current,
        updateCurrent,
        step,
        setStep,
      }}>
      {children}
    </SignUpManageContext.Provider>
  );
};

export default SignUpContext;

const styles = StyleSheet.create({});
