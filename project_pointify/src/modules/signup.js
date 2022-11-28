export default async function registration(setRegister, setErrorType, passwordSafety) {
  setRegister(true);
  setErrorType('');
  if (document.getElementById('RegisrerUsername') && document.getElementById('RegisterPassword')
      && document.getElementById('recoveryQuestion') && document.getElementById('recoveryAnswer')) {
    const signupUsername = document.getElementById('RegisrerUsername').value;
    const signupPassword = document.getElementById('RegisterPassword').value;
    const recoveryQuestion = document.getElementById('recoveryQuestion').value;
    const recoveryAnswer = document.getElementById('recoveryAnswer').value;
    const regEx = /^[0-9a-zA-Z]+$/;
    const safety = passwordSafety(signupPassword);
    if (signupUsername.match(regEx)) { // check if alphanumeric
      const response = await fetch(`https://project-pointify.herokuapp.com/users/${signupUsername}`);
      const existingUser = await response.json();
      if (existingUser.length === 0) { // if the username doesn't exist
        if (safety === 'safe') {
          const rawResponse = await fetch('https://project-pointify.herokuapp.com/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: signupUsername,
              password: signupPassword,
              recoveryq: recoveryQuestion,
              recoverya: recoveryAnswer,
              joinDate: (new Date(Date.now())).toDateString(),
            }),
          });
          const content = await rawResponse.json();
          console.log(content);
          setRegister(false);
        } else {
          setErrorType(safety);
        }
      } else {
        setErrorType('Existing username');
      }
    } else { // if the input is not alphanumeric
      setErrorType('Not alphanumeric');
    }
  }
}
