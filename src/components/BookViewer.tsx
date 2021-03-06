import * as React from 'react';
import { QuickOptionsList } from '../components';
import { Book } from '../models';

interface BookViewerProps {
  book?: Book;
}

export const BookViewer: React.SFC<BookViewerProps> = ({ book }) => {
  if (!book) {
    return <h4 className="h5">See books here!</h4>;
  }

  let imgSrc = '';
  if (book.imageLinks) {
    const { extraLarge, large, medium, small, smallThumbnail, thumbnail } = book.imageLinks;
    imgSrc = extraLarge || large || medium || small || smallThumbnail || thumbnail;
  }

  return (
    <div className="card book-viewer">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <QuickOptionsList book={book} className="float-right"/>
            <h4 className="card-title">{book.title}</h4>
            {book.authors &&
              <h5 className="card-subtitle mb-2 text-muted">{book.authors.join(', ')}</h5>
            }
            {book.isbn &&
              <h5 className="card-subtitle mb-2">
                {book.isbn}
              </h5>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <p className="card-text">{book.description}</p>
            {/* Cap this at x number of characters and offer a "click to see full description" option */}
          </div>
          <div className="col-4">
            <img src={imgSrc} className="d-block mx-auto" alt={`${book.title} Cover`}/>
          </div>
        </div>
        <a href={book.previewLink} target="_blank" className="card-link clearfix">
          <i className="fab fa-google pr-1"/>
          Preview on Google Books
          <i className="fas fa-external-link-alt pl-1"/>
        </a>
        <a href={book.infoLink} target="_blank" className="card-link">
          <i className="fab fa-google pr-1"/>
          More info on Google Books
          <i className="fas fa-external-link-alt pl-1"/>
        </a>
      </div>
    </div>
  );
};
