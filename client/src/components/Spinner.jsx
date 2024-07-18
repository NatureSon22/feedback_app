import PropTypes from "prop-types";

const Spinner = ({ size }) => {
  return (
    <div className={`lds-ellipsis`}>
      <div className={`${size} bg-gray-darker`}></div>
      <div className={`${size} bg-gray-darker`}></div>
      <div className={`${size} bg-gray-darker`}></div>
      <div className={`${size} bg-gray-darker`}></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string.isRequired,
};

export default Spinner;
