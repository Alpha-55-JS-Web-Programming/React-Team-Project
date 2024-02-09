import PropTypes from "prop-types";
/**
 * @param {{children:any, onClick:function}} props
 */
export function Button({ children = null, onClick = () => {} }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.any,
};
