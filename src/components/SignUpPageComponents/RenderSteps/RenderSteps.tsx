import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useCurrentSignUpInfo} from '../../../hooks/useCurrentSignUpInfo';
import SignUpStep_1 from './SignUpStep_1';
import SignUpStep_2 from './SignUpStep_2';
import SignUpStep_3 from './SignUpStep_3';
import SignUpStep_4 from './SignUpStep_4';
import SignUpStep_5 from './SignUpStep_5';
import SignUpStep_6 from './SignUpStep_6';
import SignUpStep_7 from './SignUpStep_7';
import SignUpStep_8 from './SignUpStep_8';

const RenderSteps = () => {
  const {current, updateCurrent, step, setStep} = useCurrentSignUpInfo();

  useEffect(() => {
    console.log('RenderStep | current Changed : ', current);
  }, [current]);

  const viewStep = (step: number) => {
    switch (step) {
      case 1:
        return <SignUpStep_1 updateCurrent={updateCurrent} setStep={setStep} />;
      case 2:
        return <SignUpStep_2 updateCurrent={updateCurrent} setStep={setStep} />;
      case 3:
        return (
          <SignUpStep_3
            current={current}
            updateCurrent={updateCurrent}
            setStep={setStep}
          />
        );

      case 4:
        return <SignUpStep_4 updateCurrent={updateCurrent} setStep={setStep} />;
      case 5:
        return <SignUpStep_5 setStep={setStep} />;
      case 6:
        return <SignUpStep_6 updateCurrent={updateCurrent} setStep={setStep} />;
      case 7:
        return <SignUpStep_7 updateCurrent={updateCurrent} setStep={setStep} />;
      case 8:
        return (
          <SignUpStep_8
            current={current}
            updateCurrent={updateCurrent}
            setStep={setStep}
          />
        );
    }
  };

  return <View>{viewStep(step)}</View>;
};

export default RenderSteps;

const styles = StyleSheet.create({});
