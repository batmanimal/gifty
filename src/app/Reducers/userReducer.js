import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS, GET_USER } from '../Constants/ActionTypes';

const initialState = { profile: {}, friends: [] };

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
        case FETCH_FRIENDS:
      var getDaysFromToday = function(birthday) {
        if(!birthday) {
          return null;
        }
        // create new Date for today
        var today = new Date();

        // add 1 to current month because getMonth returns months starting at 0
        var currentMonth = today.getMonth() + 1;
        var currentYear = today.getFullYear();
        var currentDD = today.getDate();
        // create new Date for today, reflecting adjusted month
        today = new Date(currentYear, currentMonth, currentDD);

        // initialize array to hold friend's 'MM/DD/YY' bday as [ 'MM', 'DD', 'YY' ]
        var friendBdayArray = birthday.split('/');
        var friendBdayMonth = friendBdayArray[0];
        var friendBdayDD = friendBdayArray[1];
        // create new Date, replacing birth year with current year
        var friendBday = new Date(currentYear, friendBdayMonth, friendBdayDD);

        // calculate time between now to friend's day -- getTime() returns time in ms
        // NOTE: if day is in the past, elapsed will be negative
        var elapsed = ( friendBday.getTime() - today.getTime() );
        // divide by 86,400,000 to convert milliseconds to days
        var daysFromToday = Math.floor(elapsed / 86400000);
        // add 365 to any negative daysFromToday value to get days until next year's date
        daysFromToday > 0 ? daysFromToday = daysFromToday : daysFromToday = daysFromToday + 365;
        
        return daysFromToday;
      };

      // append daysFromToday to each friend object and push to friends array
      var friends = [];
      action.friends.forEach(function(friend) {
        friend.daysFromToday = getDaysFromToday(friend.birthday);
        friends.push(friend);
      });

      // sort friends in array by daysFromToday in descending order
      friends.sort(function(friendA, friendB){
        if (friendA.daysFromToday === null) {
          return 1;
        }
        if (friendB.daysFromToday === null) {
          return -1;
        }
        return friendA.daysFromToday - friendB.daysFromToday;
      });
      // es6 syntax to return the updated state
      return Object.assign({}, state, { friends: friends });

    case GET_USER:
      return Object.assign({}, state, { profile: action.profile });

    default:
      return state;

  }

};
