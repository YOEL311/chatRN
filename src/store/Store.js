import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

class UserStore {
  name = '';
  id = 0;

  setName(name) {
    this.name = name;
    this.id = uuidv4();
  }
}

const userStore = new UserStore();

export default userStore;
