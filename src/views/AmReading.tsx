import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookTable } from '../components';
import { Book } from '../models';
import { BookcaseState, getAmReadingBooks } from '../redux';

interface AmReadingProps {
  books?: Book[];
}

export class AmReadingView extends React.PureComponent<AmReadingProps> {
  constructor(props: AmReadingProps) {
    super(props);
  }

  public render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-book-reader pr-2 mr-1"/>
          Am Reading
        </h2>
        <p>
          The collection you're currently chipping away at!
          Once you've finished one, transfer it to your <Link to="/have-read">completed list,</Link>
          or <Link to="/wishlist">shelf it for later!</Link>
        </p>
        {books && books.length
          ? <BookTable books={books} />
          : <h3>Nothing here. Better get started!</h3>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: BookcaseState): AmReadingProps => (
  {
    books: getAmReadingBooks(state),
  }
);

export const AmReadingPage = connect(mapStateToProps)(AmReadingView);
