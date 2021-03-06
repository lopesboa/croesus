const UserController = require('./user.controller.js');
const { applyMiddlewaresWithDatabase } = require('./../../../common/applyMiddlewares');

module.exports.submit = (...args) => {
  applyMiddlewaresWithDatabase([...args], UserController.create.bind(UserController, ...args));
};

module.exports.update = (...args) => {
  applyMiddlewaresWithDatabase(
    [...args],
    UserController.authenticateJWT.bind(UserController, ...args),
    UserController.update.bind(UserController, ...args)
  );
};

module.exports.list = (...args) => {
  applyMiddlewaresWithDatabase(
    [...args],
    UserController.authenticateJWT.bind(UserController, ...args),
    UserController.list.bind(UserController, ...args)
  );
};

module.exports.delete = (...args) => {
  applyMiddlewaresWithDatabase(
    [...args],
    UserController.authenticateJWT.bind(UserController, ...args),
    UserController.delete.bind(UserController, ...args)
  );
};

module.exports.login = (...args) => {
  applyMiddlewaresWithDatabase([...args], UserController.login.bind(UserController, ...args));
};

module.exports.getSelf = (...args) => {
  applyMiddlewaresWithDatabase(
    [...args],
    UserController.authenticateJWT.bind(UserController, ...args),
    UserController.getSelf.bind(UserController, ...args)
  );
};
