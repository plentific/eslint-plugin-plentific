export var a = {
  // eslint-disable-next-line plentific/no-trailing-slash
  path: '/',       // should be error
}

export var b = {
  // eslint-disable-next-line plentific/no-trailing-slash
  path: '/path/',  // should be error 
}

export var c = {
  path: '/path'   // OK 
}