import {Navigation} from 'react-native-navigation';

import Chat from './src/screens/Chat';
import Intro from './src/screens/Intro';

Navigation.registerComponent('Intro', () => Intro);
Navigation.registerComponent('Chat', () => Chat);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Intro',
            },
          },
        ],
      },
    },
  });
});
