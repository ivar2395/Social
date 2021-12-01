/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from 'react-native';

const AppStack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
        if(value == null){
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else{
          setIsFirstLaunch(false);
        }
    });

  },[]);

  if(isFirstLaunch === null){
    return null;
  } else if(isFirstLaunch === true){
    return(
      <NavigationContainer>
        <AppStack.Navigator
          headerMode="none"
        >
          <AppStack.Screen name="Onboarding" component={OnboardingScreen}/>
          <AppStack.Screen name="Login" component={LoginScreen}/>
      </AppStack.Navigator>
      </NavigationContainer>

      );
  } else{
    return <LoginScreen />;
  }

}

export default App;
