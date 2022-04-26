import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainComponent from './components/MainComponent/MainComponent';
import { RecoilRoot } from "recoil"

export default function App() {
  return (
    <RecoilRoot>
        <View style={styles.container}>
          <MainComponent />
          <StatusBar style="auto" />
        </View>
    </RecoilRoot>
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
