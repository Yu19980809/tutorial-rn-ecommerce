import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import StackNavigator from './navigation/StackNavigator';
import store from './store';
import { UserContext } from './UserContext';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

export default function App() {
  return (
    <Provider store={ store }>
      <UserContext>
        <StackNavigator />
        <ModalPortal />
      </UserContext>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
