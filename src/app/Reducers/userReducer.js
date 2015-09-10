import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS, GET_USER, SET_LOCK } from '../Constants/ActionTypes';

const initialState = { profile: {}, friends: [], lock: {} };

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case ADD_FRIEND:
      return Object.assign({}, state, {
        friends: state.friends.concat([action.friend])
      });

    case REMOVE_FRIEND:
      var friends = state.friends.filter(friend => {
        return friend.id !== action.id;
      });
      return Object.assign({}, state, { friends: friends });

    case FETCH_FRIENDS:
      var getDaysFromToday = function(birthday) {
        if(!birthday) {
          return null;
        }
        var today = new Date();
        // add 1 to current month bc getMonth starts at Jan = 0
        var currentMonth = today.getMonth() + 1;
        var currentYear = today.getFullYear();
        var currentDD = today.getDate();
        today = new Date(currentYear, currentMonth, currentDD);

        var friendBdayArray = birthday.split('/');
        var friendBdayMonth = friendBdayArray[0];
        var friendBdayDD = friendBdayArray[1];
        // replace year with current year
        var friendBday = new Date(currentYear, friendBdayMonth, friendBdayDD);
        // calculate days from now to the bday; getTime() returns time in ms
        var elapsed = ( friendBday.getTime() - today.getTime() );
        // 86,400,000 ms per day
        var daysFromToday = Math.floor(elapsed / 86400000);
        // add 365 days to get upcoming day
        // if(daysFromToday < 0) {
        //   daysFromToday = daysFromToday + 365;
        // }
        daysFromToday > 0 ? daysFromToday = daysFromToday : daysFromToday = daysFromToday + 365;
        return daysFromToday;
      };

      var friends = [];
      action.friends.forEach(function(friend) {
        friend.daysFromToday = getDaysFromToday(friend.birthday);
        friends.push(friend);
      });

      friends.sort(function(friendA, friendB){
        if (friendA.daysFromToday === null) {
          return 1;
        }
        if (friendB.daysFromToday === null) {
          return -1;
        }
        return friendA.daysFromToday - friendB.daysFromToday;
      });

      return Object.assign({}, state, { friends: friends });

    case GET_USER:
      return Object.assign({}, state, { profile: action.profile });

    case SET_LOCK:
      return Object.assign({}, state, { lock: action.lock });

    default:
      return state;

  }

};
