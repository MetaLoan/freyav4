import { TamaguiProvider as BaseTamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { useColorScheme } from 'react-native';

export function TamaguiProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  
  return (
    <BaseTamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'dark'}
    >
      {children}
    </BaseTamaguiProvider>
  );
}
