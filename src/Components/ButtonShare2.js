import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class ButtonShare2 extends React.Component {
  constructor() {
    super();
    this.state = {
      copy: false,
    };
  }

  handleShare = () => {
    const { type, id } = this.props;
    navigator.clipboard.writeText(`https://joaogmmoreira.github.io/recipesapp/${type}s/${id}`);
    this.setState({ copy: true });
  };

  render() {
    const { copy } = this.state;
    const { index } = this.props;
    return (
      <div id="shareBtn">
        { copy ? (<h3>Link copied!</h3>) : (null) }
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ this.handleShare }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
      </div>
    );
  }
}

ButtonShare2.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonShare2;
