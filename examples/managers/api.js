var a = {
  // eslint-disable-next-line plentific/no-trailing-slash
  path: '/',       // should be error
  // eslint-disable-next-line plentific/no-trailing-slash
  path: '/path/',  // should be error 
  path: '/path'   // OK 
}