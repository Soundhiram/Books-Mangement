import { Request, Response } from 'express';
import Book, { IBook } from './book-models';

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: IBook[] = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const book: IBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    yearOfPublication: req.body.yearOfPublication
  });

  try {
    const newBook: IBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedBook: IBook | null = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const updatedBook: IBook | null = await Book.findByIdAndUpdate(
        id,
        { archived: true }, 
        { new: true }
      );
  
      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
  
      res.status(200).json({ message: 'Book archived successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const book: IBook | null = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
