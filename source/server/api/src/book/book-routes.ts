import { Router } from 'express';
import { getAllBooks, createBook, updateBook, deleteBook, getBookById } from './book-controller';

const bookRouter: Router = Router();

bookRouter.get('/books', getAllBooks);
bookRouter.post('/book', createBook);
bookRouter.put('/book/:id', updateBook);
bookRouter.delete('/book/:id', deleteBook);
bookRouter.get('/book/:id', getBookById);

export default bookRouter;
