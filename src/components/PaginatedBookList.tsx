import * as React from 'react';
import { Link } from 'react-router-dom';
import { QuickOptionsList } from './QuickOptionsList';
import { Book } from '../models';

interface BookListProps {
  books?: Book[];
  activeBook?: Book;
  searchTerm: string;
  handleListItemClick(clickedBook: Book): void;
}

export const PaginatedBookList: React.SFC<BookListProps> = ({ activeBook, books, handleListItemClick, searchTerm }) => (
  <ul className="list-unstyled list-group search-books-list">
    {books
      ? books.length
        ? <React.Fragment>
            {books.map((book, index) => (
              <BookListItem
                book={book}
                active={book === activeBook}
                handleListItemClick={handleListItemClick}
                key={index}
              />
            ))}
          </React.Fragment>
        : <li>
            <span className="text-danger">
              No books found for {searchTerm}.
              Do you need to <Link to="/register">create it?</Link>
            </span>
          </li>
      : <li>
          <span>Loading books...</span>
        </li>
    }
  </ul>
);

// To prevent new creation of function on each render:
// https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81
interface BookListItemProps {
  active: boolean;
  book: Book;
  handleListItemClick(clickedBook: Book): void;
}

class BookListItem extends React.PureComponent<BookListItemProps> {
  constructor(props: BookListItemProps) {
    super(props);
  }

  public render() {
    const { active, book } = this.props;
     return (
      <li className={`list-group-item${active ? ' active' : ''}`} onClick={this.handleListItemClick}>
        <div>
          <h4>{book.title}</h4>
          {book.authors &&
            <span className="text-muted">{book.authors.join(', ')}</span>
          }
        </div>
        <QuickOptionsList/>
      </li>
     );
  }

  private handleListItemClick = () => this.props.handleListItemClick(this.props.book);
}
