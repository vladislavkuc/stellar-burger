export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

// export function login(userData) {
//   return function(dispatch) {
//     sendLoginRequest(userData).then(res => {
//       if (res && res.success) {
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: res
//         });
//       } else {
//         dispatch({
//           type: LOGIN_FAILED,
//           text: res.message
//         });
//       }
//     })
//     .catch(errorText => console.log(`Ошибка: ${errorText}`));
//   };
// }

// export function register(formData) {
//   return function(dispatch) {
//     sendRegisterRequest(formData).then(res => {
//       if (res && res.success) {
//         dispatch({
//           type: REGISTER_SUCCESS,
//           payload: res
//         });
//       } else {
//         dispatch({
//           type: REGISTER_FAILED,
//           text: res.message
//         });
//       }
//     })
//     .catch(errorText => console.log(`Ошибка: ${errorText}`));
//   };
// }
