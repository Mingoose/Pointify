const addUser = async (db, userName, userPassword, recoveryq, recoverya, date) => {
  const user = {
    username: userName, password: userPassword, recoveryQuestion: recoveryq, recoveryAnswer: recoverya, joinDate: date, blocked: 'No',
  };
  try {
    const result = await db.collection('Users').insertOne(user);
    console.log(`Created user with id: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a user');
  }
};

const findUser = async (db, userName) => {
  try {
    console.log(userName);
    const result = await db.collection('Users').find({ username: userName }).toArray();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a user');
  }
};

const getAllUsers = async (db, userName) => {
  try {
    console.log(userName);
    const result = await db.collection('Users').find().toArray();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get users');
  }
};

const blockUser = async (db, userName) => {
  try {
    await db.collection('Users').update({ username: userName }, { $set: { blocked: (new Date(Date.now())) } });
  } catch (err) {
    throw new Error('could not block  user');
  }
};

const unblockUser = async (db, userName) => {
  try {
    await db.collection('Users').update({ username: userName }, { $set: { blocked: 'No' } });
  } catch (err) {
    throw new Error('could not block  user');
  }
};

const resetPassword = async (db, userName, newPassword) => {
  try {
    await db.collection('Users').update({ username: userName }, { $set: { password: newPassword } });
  } catch (err) {
    throw new Error('could not reset password');
  }
};

module.exports = {
  addUser, findUser, blockUser, unblockUser, getAllUsers, resetPassword,
};
