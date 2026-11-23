import StackNavigation from './url/navigation/StackNativagion';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
    <StackNavigation />
    </SafeAreaProvider>
  );
}
