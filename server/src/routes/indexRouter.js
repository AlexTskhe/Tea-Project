const router = require('express').Router(); //* получаем экземпляр роутинга из библиотеки
const teaRouter = require('./teaRouter'); //* подтягиваем набор роутинга по определенному пути
const formatResponse = require('../utils/formatResponse'); //* подтягиваем утилиту для унификации ответа по 404
// const authRouter = require('./authRouter');
const commentRouter = require('./commentRouter');

// router.use('/auth', authRouter);
router.use('/teas', teaRouter); //* по пути на posts отрабатывает набор из postRouter
router.use('/comments', commentRouter);
  
//! Обработка всех запросов на несуществующие маршруты (меняем стандартный ответ от express)
router.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;